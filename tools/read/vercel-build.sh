#!/bin/sh
# Deployment build: compose the static site and the generated reading pages
# into _site/ at the repository root. The project's vercel.json runs this and
# serves _site/ (../_site when the project's root directory is docs/).
# Adapted from apexSolarKiss/method-ASK@5e3a332 tools/read/vercel-build.sh.
#
# 1. pick a Python 3.10+ interpreter, or stop
# 2. install the exact renderer pin into a temporary virtual environment,
#    by hash, from wheels only
# 3. build into _site/; the build writes nothing there unless every gate passes
set -eu

repo=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
cd "$repo"

py=""
for candidate in python3.14 python3.13 python3.12 python3.11 python3.10 python3; do
  if command -v "$candidate" >/dev/null 2>&1 &&
     "$candidate" -c 'import sys; sys.exit(0 if sys.version_info >= (3, 10) else 1)' 2>/dev/null; then
    py=$candidate
    break
  fi
done
if [ -z "$py" ]; then
  echo "vercel-build.sh: no Python 3.10 or later on PATH; nothing built" >&2
  exit 1
fi
echo "vercel-build.sh: $("$py" --version 2>&1) ($(command -v "$py"))"

venv=$(mktemp -d)
trap 'rm -rf "$venv"' EXIT
"$py" -m venv "$venv"
"$venv/bin/python" -m pip install --quiet --disable-pip-version-check \
  --require-hashes --only-binary=:all: -r tools/read/requirements.txt

"$venv/bin/python" tools/read/read_gen.py build --out _site
