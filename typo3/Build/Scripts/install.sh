#!/usr/bin/env bash
# Runs in the DDEV web container on every start: installs once, then only brings schema and caches up to date.
set -euo pipefail
cd "$(dirname "$0")/../.."

composer install --no-interaction --no-progress

if [ ! -f config/system/settings.php ]; then
    password="${TYPO3_SETUP_ADMIN_PASSWORD:-$(openssl rand -base64 18 | tr -d '/+=')Aa1!}"
    TYPO3_DB_DRIVER=mysqli TYPO3_DB_HOST=db TYPO3_DB_PORT=3306 TYPO3_DB_DBNAME=db \
    TYPO3_DB_USERNAME=db TYPO3_DB_PASSWORD=db \
    TYPO3_SETUP_ADMIN_USERNAME=admin TYPO3_SETUP_ADMIN_PASSWORD="$password" \
    TYPO3_SETUP_ADMIN_EMAIL=admin@kumano-kodo.ddev.site TYPO3_PROJECT_NAME="Kumano Kodo" \
    TYPO3_SERVER_TYPE=other vendor/bin/typo3 setup --no-interaction
    mkdir -p var && printf '%s\n' "$password" > var/admin-password
    echo "Backend: https://kumano-kodo.ddev.site/typo3 · admin / $password (also in typo3/var/admin-password)"
else
    vendor/bin/typo3 extension:setup
fi

vendor/bin/typo3 cache:flush
