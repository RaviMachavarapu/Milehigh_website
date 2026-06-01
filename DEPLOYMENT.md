# Deployment — AWS S3 + CloudFront

The site is a static Astro build. `npm run build` emits everything to `dist/`,
which is uploaded to an S3 bucket and served through CloudFront. No servers, no
Lambda — true serverless static hosting.

## Build

```bash
npm install
npm run build      # outputs to ./dist
npm run preview    # optional: preview the built site locally
```

`astro.config.mjs` sets `site: 'https://www.milehighlabs.ai'` — this drives the
canonical URLs, sitemap, and absolute OG image URLs. Update it if the domain changes.

## What gets generated

- `dist/index.html`, `dist/services/*/index.html` — the pages
- `dist/sitemap-index.xml` + `dist/sitemap-0.xml` — from `@astrojs/sitemap`
- `dist/robots.txt`, `dist/llms.txt`, `dist/favicon.svg`, `dist/og-default.svg`

## One-time AWS setup

1. **S3 bucket** (e.g. `www.milehighlabs.ai`). Keep it private; CloudFront reads it
   via Origin Access Control (OAC). Do **not** enable public bucket website hosting.
2. **CloudFront distribution** with the S3 bucket as origin (OAC).
   - Default root object: `index.html`
   - Because `trailingSlash: 'never'`, add a CloudFront Function (viewer-request) to
     map directory paths to `index.html` (e.g. `/services/ai-workflows` →
     `/services/ai-workflows/index.html`). Example logic: if the URI has no file
     extension and doesn't end in `/`, append `/index.html`.
3. **ACM certificate** for `www.milehighlabs.ai` (in `us-east-1`) attached to CloudFront.
4. **Route 53 / DNS**: point `www.milehighlabs.ai` at the CloudFront distribution.

## Deploy (each release)

```bash
npm run build

# Sync built assets. Long-cache the hashed assets, short-cache HTML/XML/txt.
aws s3 sync dist/ s3://www.milehighlabs.ai/ --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "*.html" --exclude "*.xml" --exclude "*.txt"

aws s3 sync dist/ s3://www.milehighlabs.ai/ \
  --cache-control "public,max-age=300" \
  --exclude "*" --include "*.html" --include "*.xml" --include "*.txt"

# Invalidate the CDN so visitors get the new HTML immediately.
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"
```

## Notes

- The `_astro/` directory holds content-hashed CSS/JS — safe to cache forever.
- HTML, `sitemap*.xml`, `robots.txt`, and `llms.txt` use a short cache so updates
  appear quickly without a full invalidation.
- After DNS is live, submit `https://www.milehighlabs.ai/sitemap-index.xml` to
  Google Search Console and Bing Webmaster Tools.
