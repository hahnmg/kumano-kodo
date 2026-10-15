#!/usr/bin/env bash
# Runs in the DDEV web container on every start: installs once, then only brings schema and caches up to date.
set -euo pipefail
cd "$(dirname "$0")/../.."

composer install --no-interaction --no-progress

if [ ! -f config/system/settings.php ]; then
    # A reinstall keeps the password of the last one (var/ is outside Git); only a first install generates one.
    password="${TYPO3_SETUP_ADMIN_PASSWORD:-$(cat var/admin-password 2>/dev/null || true)}"
    password="${password:-$(openssl rand -base64 18 | tr -d '/+=')Aa1!}"
    TYPO3_DB_DRIVER=mysqli TYPO3_DB_HOST=db TYPO3_DB_PORT=3306 TYPO3_DB_DBNAME=db \
    TYPO3_DB_USERNAME=db TYPO3_DB_PASSWORD=db \
    TYPO3_SETUP_ADMIN_USERNAME=admin TYPO3_SETUP_ADMIN_PASSWORD="$password" \
    TYPO3_SETUP_ADMIN_EMAIL=admin@kumano-kodo.ddev.site TYPO3_PROJECT_NAME="Kumano Kodo" \
    TYPO3_SERVER_TYPE=other vendor/bin/typo3 setup --no-interaction
    mkdir -p var && printf '%s\n' "$password" > var/admin-password
    # The extension adds no pages; this project develops the demo, so it creates it as the site kumano-kodo on "/".
    # KUMANO_DEMO=starter creates the five placeholder pages to build on instead.
    if [ "${KUMANO_DEMO:-full}" = "starter" ]; then
        vendor/bin/typo3 kumano:starter:create --identifier=kumano-kodo --base=/
    else
        vendor/bin/typo3 kumano:demo:create --identifier=kumano-kodo --base=/
    fi
    echo "Backend: https://kumano-kodo.ddev.site/typo3 · admin / $password (also in typo3/var/admin-password)"
else
    vendor/bin/typo3 extension:setup
fi

vendor/bin/typo3 cache:flush

# indexed_search fills its index from pages as they are rendered. Checked before the first request below, which
# already indexes the home page.
db() { mysql --host=db --user=db --password=db db --batch --skip-column-names -e "$1" 2>/dev/null; }
empty_index="$(db 'SELECT COUNT(*) FROM index_phash' || echo skip)"

# The first page request downloads the web fonts to this server; do it now rather than for the first visitor.
# The demo site answers on the project URL in DDEV (its base variant), so requests go there rather than to localhost.
url="${DDEV_PRIMARY_URL:-http://localhost}"
curl -sk -o /dev/null "$url/" || true

# With an empty index, render every page once.
if [ "$empty_index" = "0" ]; then
    db "SELECT CONCAT(CASE sys_language_uid WHEN 1 THEN '/de' WHEN 2 THEN '/ja' ELSE '' END, slug) FROM pages WHERE deleted = 0 AND hidden = 0 AND doktype = 1" |
        while read -r path; do curl -sk -o /dev/null "$url$path" || true; done
fi
