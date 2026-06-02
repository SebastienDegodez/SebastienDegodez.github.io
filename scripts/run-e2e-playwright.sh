#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_IMAGE="jekyll/jekyll:4"
SERVER_CONTAINER="site-e2e"
BASE_URL="${BASE_URL:-http://127.0.0.1:4000}"
USER_ARGS=()

if command -v id >/dev/null 2>&1; then
  USER_ARGS=(--user "$(id -u):$(id -g)")
fi

cleanup() {
  docker rm -f "$SERVER_CONTAINER" >/dev/null 2>&1 || true
}

trap cleanup EXIT

cd "$ROOT_DIR"

echo "[1/5] Install dependencies"
npm install

echo "[2/5] Install Playwright browser"
npx playwright install chromium

echo "[3/5] Build static site in Jekyll container"
# Run as host user (when available) and disable disk cache to avoid permission issues on host-mounted volumes in CI.
docker run --rm \
  "${USER_ARGS[@]}" \
  --entrypoint /usr/gem/bin/jekyll \
  -v "$PWD":/srv/jekyll "$SITE_IMAGE" \
  build --source /srv/jekyll --destination /srv/jekyll/_site --disable-disk-cache

echo "[4/5] Start site container on http://127.0.0.1:4000"
docker run -d --name "$SERVER_CONTAINER" -p 4000:80 \
  -v "$PWD/_site":/usr/share/nginx/html:ro \
  nginx:alpine >/dev/null

echo "[5/5] Run Playwright E2E"
BASE_URL="$BASE_URL" npm run test:e2e

echo "E2E completed successfully"
