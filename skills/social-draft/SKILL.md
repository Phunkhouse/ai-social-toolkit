---
name: social-draft
description: Create or update TryPost drafts from a checked social package through the TryPost MCP server - drafts only, never scheduled, approved or published - and export manual posting files for networks TryPost does not post to. Use after social-check passes.
---

# Social draft

Hand the period's posts to the owner as TryPost drafts. Follow `../../references/trypost.md` exactly: it is the contract.

## Method

1. **Refuse to start** if any post to be drafted has an open blocker, or if its freshness is older than the project's window (rerun `social-check` first).
2. **Read TryPost:** `get-workspace-tool`, `list-social-accounts-tool`, `list-labels-tool`. Match each network in the package to an account. A network with no account goes to the manual export (step 6).
3. **Find existing drafts** for each post by its package ID (label and note) with `list-posts-tool`. If a draft exists with the same `trypost.contentHash`, skip it. If the owner has edited, approved or scheduled it, leave it untouched and report it.
4. **Create or update drafts:** one per network per post, status `draft` only, dated with the suggested slot (date only places it on the calendar), with the project's label. Never send a queue slot, a schedule, a recurrence or any status other than `draft`. Store the returned IDs and the content hash in `posts[].trypost`.
5. **Media:** upload local files only (`request-media-upload-tool`, `attach-media-from-upload-tool`) with their alt text; never attach from a URL. Check each file's hash against `posts[].media[].sha256` before upload.
6. **Manual export:** for networks without a TryPost account, write `<packageId>.manual.md` beside the package: per post, the network, suggested day and time, text, character count, media file and alt text. Generated, never edited by hand.
7. **Notes:** one `create-post-note-tool` note per draft with the package ID, pillar, reason for the choice, claims with their status, open warnings, and when the project data was last validated.
8. **Preview:** `preview-post-tool` for each draft; report any difference from the package instead of silently fixing it.

## Output

Drafts in TryPost, `posts[].trypost` filled, the manual export if any, and a summary: drafted, skipped (and why), left untouched because the owner changed them, and the warnings the owner should look at first. End by reminding the owner that nothing is scheduled.
