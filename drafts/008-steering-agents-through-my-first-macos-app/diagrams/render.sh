#!/bin/sh
# Render each diagram in a light and a dark variant, with a transparent background.
# The sources hold the light palette (the blog's colors). dark.sed swaps it for the dark one.
# Needs a running Kroki (see the kroki skill), rsvg-convert and ImageMagick.
set -eu
here=$(cd "$(dirname "$0")" && pwd)
out="$here/../../../src/content/post/steering-agents-through-my-first-macos-app"
kroki="$HOME/.pi/agent/skills/kroki/scripts/kroki.py"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

render() { # file type
  name=${1%.*}
  for theme in light dark; do
    src="$here/$1"
    if [ "$theme" = dark ]; then sed -f "$here/dark.sed" "$src" > "$tmp/$1"; src="$tmp/$1"; fi
    "$kroki" "$src" --type "$2" --format svg --out "$tmp/$name.svg" >/dev/null
    rsvg-convert -z 2 "$tmp/$name.svg" | magick - -trim +repage -bordercolor none -border 40 "$out/$name--$theme.png"
  done
}

render layers.dot graphviz
render ladder.vegalite vegalite
