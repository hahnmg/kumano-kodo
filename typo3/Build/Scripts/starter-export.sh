#!/usr/bin/env bash
# Builds the starter and writes it into the extension, where kumano:starter:create reads it, then restores the demo.
set -euo pipefail
cd "$(dirname "$0")/../.."

typo3=vendor/bin/typo3
target=packages/theme_kumano_kodo/Resources/Private/Starter
$typo3 kumano:demo:build --replace --starter
root=$($typo3 site:show kumano-kodo | sed -n 's/.*rootPageId: *\([0-9]*\).*/\1/p')

$typo3 impexp:export data --type=xml --pid="$root" --levels=999 \
    --table=tt_content --table=tx_themekumanokodo_entry --table=sys_file_reference \
    --title="Kumano Kodo starter" --dependency=theme_kumano_kodo

rm -rf "$target/data.xml" "$target/Site"
mv public/fileadmin/user_upload/_temp_/importexport/data.xml "$target/"
mkdir -p "$target/Site" && cp -R config/sites/kumano-kodo "$target/Site/"

# This instance develops the demo; put it back.
$typo3 kumano:demo:build --replace
$typo3 cache:flush
echo "Exported starter root page $root to $target"
