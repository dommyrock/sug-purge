#!/usr/bin/env bash
#
# Build a publishable extension package into ./release/suggestions-purge.zip
#
# Usage:
#   ./release.sh            Auto-bump the last version component (1.2 -> 1.3)
#   ./release.sh 2.0        Set an explicit version
#   ./release.sh --no-bump  Repackage with the current manifest version unchanged
#
# After it runs, upload release/suggestions-purge.zip at
# https://addons.mozilla.org/en-US/developers/  (Upload New Version).

set -euo pipefail

# Always operate from the repo root (where this script lives).
cd "$(dirname "$0")"

MANIFEST="manifest.json"
OUT_DIR="release"
ZIP_NAME="suggestions-purge.zip"

# Files that go into the package.
FILES=("$MANIFEST" "main.js")
ICONS=("icons/icon-48.png" "icons/icon-96.png" "icons/icon-128.png")

read_version() {
  grep -E '"version"' "$MANIFEST" | head -1 \
    | sed -E 's/.*"version"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/'
}

bump_version() {
  # Increment the last dot-separated component (e.g. 1.2 -> 1.3, 1.2.3 -> 1.2.4).
  local current="$1"
  IFS='.' read -ra parts <<< "$current"
  local last=$(( ${#parts[@]} - 1 ))
  parts[$last]=$(( ${parts[$last]} + 1 ))
  local IFS='.'
  echo "${parts[*]}"
}

write_version() {
  # Portable in-place edit (avoids GNU/BSD `sed -i` differences).
  local new="$1" tmp
  tmp="$(mktemp)"
  sed -E "s/(\"version\"[[:space:]]*:[[:space:]]*\")[^\"]*(\")/\1${new}\2/" \
    "$MANIFEST" > "$tmp"
  mv "$tmp" "$MANIFEST"
}

CURRENT_VERSION="$(read_version)"

case "${1:-}" in
  --no-bump)
    NEW_VERSION="$CURRENT_VERSION"
    ;;
  "")
    NEW_VERSION="$(bump_version "$CURRENT_VERSION")"
    write_version "$NEW_VERSION"
    ;;
  *)
    NEW_VERSION="$1"
    write_version "$NEW_VERSION"
    ;;
esac

echo "Version: $CURRENT_VERSION -> $NEW_VERSION"

# Stage fresh artifacts into release/.
mkdir -p "$OUT_DIR"
cp "${FILES[@]}" "$OUT_DIR/"
cp "${ICONS[@]}" "$OUT_DIR/"

# Build the zip from the staged files only (no nested release/ path, no junk).
rm -f "$OUT_DIR/$ZIP_NAME"
(
  cd "$OUT_DIR"
  zip -q -r "$ZIP_NAME" \
    manifest.json main.js \
    icon-48.png icon-96.png icon-128.png
)

echo
echo "Built $OUT_DIR/$ZIP_NAME:"
unzip -l "$OUT_DIR/$ZIP_NAME"
echo
echo "Next: upload $OUT_DIR/$ZIP_NAME at https://addons.mozilla.org/en-US/developers/"
