# Homepage chat width QA

Date: 2026-04-30

Fix: homepage Interview Me chat preview now uses full container width instead of the narrower 960px wrapper. The Interview Me route remains constrained by its existing narrow route container.

Evidence:

- `home-chat-wide.png`

Verification:

- `npm run typecheck`
- `npm run lint`
- `npm run format:check`
- `curl 200 /`
