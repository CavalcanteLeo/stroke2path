#!/bin/bash

# Get the directory of the script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Run stroke2path.js from the dist directory
node "$DIR/../@leo.cavalcante/dist/stroke2path/stroke2path.js" "$@"