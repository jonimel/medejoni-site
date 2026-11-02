#!/bin/bash
cd "$(dirname "$0")"
command -v npm >/dev/null || { echo "Node.js is not installed"; open https://nodejs.org; exit 1; }
[ -d node_modules ] || npm install
(sleep 4; open http://localhost:4321) &
npm run dev -- --host
