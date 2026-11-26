#!/usr/bin/env bash
# Rebuilds the demo from Build/Demo/content.json and writes it into the extension, where kumano:demo:create reads it.
set -euo pipefail
cd "$(dirname "$0")/../.."

typo3=vendor/bin/typo3
target=packages/theme_kumano_kodo/Resources/Private/Demo
$typo3 kumano:demo:build --replace
root=$($typo3 site:show kumano-kodo | sed -n 's/.*rootPageId: *\([0-9]*\).*/\1/p')

# Each own table needs its --table; images and alt texts only come along as related sys_file(_metadata).
$typo3 impexp:export data --type=xml --pid="$root" --levels=999 \
    --table=tt_content --table=tx_themekumanokodo_link --table=tx_themekumanokodo_nav_column \
    --table=tx_themekumanokodo_entry --table=tx_themekumanokodo_fact --table=tx_themekumanokodo_question \
    --table=tx_themekumanokodo_station --table=tx_themekumanokodo_day_mark --table=sys_file_reference \
    --table=fe_groups --table=fe_users \
    --table=tx_news_domain_model_news --table=tx_news_domain_model_tag --table=sys_category \
    --include-related=sys_file --include-related=sys_file_metadata \
    --save-files-outside-export-file --title="Kumano Kodo demo" --dependency=theme_kumano_kodo --dependency=news

rm -rf "$target/data.xml" "$target/data.xml.files" "$target/Site"
mv public/fileadmin/user_upload/_temp_/importexport/data.xml public/fileadmin/user_upload/_temp_/importexport/data.xml.files "$target/"
mkdir -p "$target/Site" && cp -R config/sites/kumano-kodo "$target/Site/"

# impexp exports a news record's categories only from the category side (items) and keeps the count in the news row;
# the import reads that count as a uid and adds category 1 to every report. The count goes, the relations stay.
php -r '$f = $argv[1]; file_put_contents($f, preg_replace_callback("#<tablerow index=\"tx_news_domain_model_news:\\d+\".*?</tablerow>#s", fn ($m) => preg_replace("#(<field index=\"categories\"[^>]*>)\\d+(</field>)#", "\${1}0\${2}", $m[0]), file_get_contents($f)));' "$target/data.xml"

grep -q '<files_fal' "$target/data.xml" || { echo "data.xml has no files_fal section: the images are missing" >&2; exit 1; }
echo "Exported root page $root with $(ls "$target/data.xml.files" | wc -l | tr -d ' ') files to $target"
