Browser bundles for the plain-HTML site, built once and committed to public/site/v13/vendor/.
Rebuild after updating botid or @elevenlabs/client:

    npx -y esbuild@0.25 scripts/vendor/botid-entry.js --bundle --minify --format=iife --target=es2019 --outfile=public/site/v13/vendor/botid.js
    npx -y esbuild@0.25 scripts/vendor/call-entry.js --bundle --minify --format=esm --target=es2020 --outfile=public/site/v13/vendor/call.mjs
