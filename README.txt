HSE FieldLog 1.8.0 - GitHub Pages demo package
Copyright 2026 Ehsan Benvari

1. Create a separate PUBLIC repository named HSE-FieldLog-Demo on the Trex2021 account.
2. Extract this archive and upload its CONTENTS (including the assets directory) to the repository root on main. Do not upload only the ZIP.
3. In Settings > Pages, select Deploy from a branch, branch main, folder / (root), then Save.
4. Wait for the Pages deployment to succeed. Expected location after publication:
   https://trex2021.github.io/HSE-FieldLog-Demo/
This URL is not live until GitHub Pages is enabled and deployed.

The application source repository Projekt-HSE remains private. This package contains compiled browser assets, which will be publicly readable, with no operational project records or source maps.
Data and personal checklists are stored in the visitor's browser. Export a JSON backup before changing site address; the new address uses separate storage.
The relative asset URLs and scoped service worker work under a repository subdirectory or at the site root.

Local preview of the same project path:
  mkdir preview
  Copy this package's contents to preview/HSE-FieldLog-Demo/
  From preview, run python3 -m http.server 8080
  Open http://localhost:8080/HSE-FieldLog-Demo/
