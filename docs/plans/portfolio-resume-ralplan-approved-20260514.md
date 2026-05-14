# Approved Ralplan: Portfolio and Resume Alignment

Date: 2026-05-14
Status: APPROVED by Planner, Architect, and Critic consensus
Implementation status: not started

## Decision
Use an evidence-first staged rollout.

Canonicalize the public resume first, then add `/about`, then add dependency-light `/notes`, with route-manifest ownership, proof-backed claims, confidentiality validation, and responsive nav acceptance.

## RALPLAN-DR summary

### Principles
1. Canonical artifacts first: public portfolio links point to one stable resume filename.
2. Evidence-first claims: routes and notes use typed content with proof-backed public claims.
3. Validators fail missing or unsafe assets, not merely string shape.
4. Nav expansion requires responsive acceptance.
5. Keep implementation reversible, with no new dependencies unless unavoidable.

### Decision drivers
1. Avoid stale resume links and proof drift.
2. Keep `/about` and `/notes` public, searchable, and route-manifest controlled.
3. Prevent confidentiality regressions in notes content.

### Options
- Chosen: canonicalize resume to `public/resume/Himadri_Mishra_Resume.pdf`, keep old docs PDF archival only, update proof locators.
- Rejected: keep `Himadri_Latest_Resume_April_2026.pdf` as public canonical, because the date-bound filename will drift.
- Rejected: link directly to `../resume/main_ats.pdf`, because it is outside the public Next.js asset surface.

## P0: Resume canonicality and verification foundation

Canonical chain:

```text
../resume/main_ats.tex -> ../resume/main_ats.pdf -> public/resume/Himadri_Mishra_Resume.pdf
```

Tasks:
1. Confirm or build `../resume/main_ats.pdf` from `../resume/main_ats.tex`.
2. Copy it to `public/resume/Himadri_Mishra_Resume.pdf`.
3. Verify byte identity with `cmp -s` and checksum with `shasum -a 256`.
4. Update `src/content/profile.ts` to use `/resume/Himadri_Mishra_Resume.pdf`.
5. Treat `public/resume/Himadri_Latest_Resume_April_2026.pdf` as legacy until migration.
6. Treat `docs/Himadri_Latest_Resume_April_2026.pdf` as archival only, not current public resume.
7. Update `src/content/proof.ts` so current resume-backed proof references `public/resume/Himadri_Mishra_Resume.pdf`.
8. Extend `scripts/check-links.ts` or a dedicated validator so missing public resume assets fail validation.

## P1: `/about` route and typed content

Tasks:
1. Add `profile` to `RouteOwnerFeature`.
2. Add a complete manifest-owned `/about` route with public enabled status, sitemap true, nav true, robots allow, proof gate true, and no placeholder state.
3. Add `/about` SEO registry entry in `src/lib/seo.ts`.
4. Add `src/app/about/page.tsx` using typed content, not unsupported hard-coded claims.
5. Use `RouteJsonLd`.
6. Any metric-like, employer-specific, or outcome claim must reference approved proof metadata.

## P2: `/notes` route and validation hardening

Tasks:
1. Add `notes` to `RouteOwnerFeature`.
2. Add a complete manifest-owned `/notes` route with public enabled status, sitemap true, nav true, robots allow, proof gate true, and content-backed implementation.
3. Add `/notes` SEO registry entry in `src/lib/seo.ts`.
4. Add typed `src/content/notes.ts`, no MDX yet.
5. Extend content validation for notes.

Validation rules:
- Fail direct currency or exact cost examples, such as `$42,000`, `USD 0.03/token`, `€1,200`, or `23 dollars`.
- Flag metric-like claims such as `72%`, `4x`, `1M users`, `10k docs`, `250ms`, unless backed by approved proof metadata.
- Require visible labels for synthetic, sanitized, normalized, or representative artifacts.
- Allow related links only to enabled public routes/fragments, `/resume/Himadri_Mishra_Resume.pdf`, and approved profile GitHub/LinkedIn links.
- Explicitly fail `/hiring-packet`, `/api/interview`, private paths, and the legacy dated resume path.
- Add negative validator examples for currency, disabled route links, missing artifact label, and unsupported metric-like claims.

## P3: Nav, external alignment, and future expansion

Nav acceptance:
- `/about` and `/notes` are nav-visible.
- Max visible desktop links: 9.
- Desktop 1280px: one row, no wrapping.
- Laptop 1024px: no overlap or clipped labels.
- Tablet/mobile: no horizontal overflow.
- Disabled/internal routes never appear.

External alignment:
- GitHub and LinkedIn updates are manual or separate workflow tasks unless credentials and exact copy are provided.
- Consider `/projects`, `/labs`, or `/work` only after route clutter review.

## Verification

Minimum targeted checks:

```bash
test -f ../resume/main_ats.tex
test -f ../resume/main_ats.pdf
test -f public/resume/Himadri_Mishra_Resume.pdf
cmp -s ../resume/main_ats.pdf public/resume/Himadri_Mishra_Resume.pdf
shasum -a 256 ../resume/main_ats.pdf public/resume/Himadri_Mishra_Resume.pdf
npm run validate:routes
npm run validate:content
npm run validate:confidentiality
npm run test:links
npm run typecheck
npm run lint
npm run build
```

Full completion check:

```bash
npm run verify
```

## Execution handoff

Recommended path: `$ralph` for P0 sequential implementation.

Use `$team` only after P0 or with strict ownership lanes:
1. P0 resume, proof, validator lane.
2. P1 route and about lane.
3. P2 notes validation lane.
4. P3 verifier and responsive evidence lane.

Suggested goal-mode follow-up: `$ultragoal` if this should become a durable multi-goal delivery ledger.
