# Search Console and indexing runbook

This runbook covers deployment checks that cannot be completed inside the codebase. It keeps indexing work truthful, manual, and tied to the canonical public site.

## Canonical property

1. Use the canonical host `https://himadri.dev` unless the deployment owner intentionally changes `siteConfig.url`.
2. Verify the matching Search Console property for `https://himadri.dev`.
3. Do not submit alternate preview, localhost, branch, or staging hosts as canonical properties.

## Sitemap submission

1. Deploy the verified build.
2. Open `https://himadri.dev/robots.txt` and confirm it lists `https://himadri.dev/sitemap.xml`.
3. Submit `https://himadri.dev/sitemap.xml` in Search Console.
4. Treat sitemap submission as discovery help, not as a ranking guarantee.

## Priority URL inspection

Inspect only priority changed URLs after deploy:

- `https://himadri.dev/`
- `https://himadri.dev/case-studies`
- `https://himadri.dev/case-studies/agentic-market-research-platform`
- `https://himadri.dev/resume`
- `https://himadri.dev/contact`
- `https://himadri.dev/interview-me`
- `https://himadri.dev/principles`
- `https://himadri.dev/challenges`

For each priority URL:

1. Run URL Inspection.
2. Run a live test after deploy.
3. Confirm the Google selected canonical matches the canonical URL emitted by the page.
4. Request indexing only when the page changed materially and the live test passes.

## Structured data checks

1. Run the Rich Results Test for the homepage and representative nested pages.
2. Confirm JSON-LD describes only visible public content.
3. Do not add schema types that are unsupported by visible page content.
4. Keep customer names, private routes, internal traces, exact costs, secrets, env names, and private implementation details out of structured data.

## Off-site profile hygiene

1. Update GitHub and LinkedIn profiles to point to `https://himadri.dev`.
2. Treat social posts as distribution for people, not indexing signals.
3. Do not use spam guest posts, low quality profile backlinks, link exchanges, directory blasts, or listing threads.

## Recheck cadence

After a production deploy, check Search Console again after Google has had time to crawl. Capture only material issues that require code or content changes.
