#!/bin/bash
# Banjara App - Android APK Build Script using Bubblewrap
# Generates app-release-signed.apk for Banjara App

set -e

echo "============================================="
echo "   Banjara App - Android APK Generator"
echo "============================================="

# Ensure Node & npm are present
if ! command -v bubblewrap &> /dev/null
then
    echo "Installing @bubblewrap/cli globally..."
    npm install -g @bubblewrap/cli
fi

APP_URL="https://ais-pre-kvgng7w42wkrvuwdwod33x-454190299902.asia-northeast1.run.app"
MANIFEST_URL="${APP_URL}/manifest.json"

echo "Initializing Bubblewrap project with manifest: ${MANIFEST_URL}"
bubblewrap init --manifest="${MANIFEST_URL}"

echo "Building release APK..."
bubblewrap build

echo "============================================="
echo " SUCCESS: app-release-signed.apk is ready!"
echo "============================================="
