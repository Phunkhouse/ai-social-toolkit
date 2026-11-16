# TryPost contract

How the toolkit uses a self-hosted [TryPost](https://github.com/trypost-it/trypost) instance through its MCP server. The contract is the same in every project: **TryPost receives drafts only.**

## Two guards

1. **In TryPost:** Claude connects as a non-admin workspace member whose posts require approval. Even a mistaken call cannot publish.
2. **In Claude Code:** the project's `.claude/settings.json` allows only the tools below and denies the rest. [`templates/trypost-permissions.json`](../templates/trypost-permissions.json) is the snippet `social-setup` merges in. The MCP server name is assumed to be `trypost`; if a project names it differently, rename the prefix.

Neither guard covers fields inside an allowed call: `update-post-tool` can change a status or a date. The `social-draft` skill therefore never sends a status other than `draft`, never a queue slot, and never changes a post the owner has already scheduled.

## Allowed tools

| Tool | Used for |
| --- | --- |
| `get-workspace-tool` | Confirm the workspace |
| `list-social-accounts-tool` | Account IDs and each account's `max_content_length` |
| `list-content-types-tool` | Accepted media formats (P2) |
| `list-labels-tool` | The project's labels (labels are created by the owner) |
| `list-posts-tool`, `get-post-tool` | Find existing drafts (D1, D2), read the owner's edits back |
| `create-post-tool`, `create-posts-tool` | Create drafts |
| `update-post-tool` | Update an unscheduled draft's text, media or suggested date |
| `request-media-upload-tool`, `attach-media-from-upload-tool` | Upload rendered images with alt text |
| `preview-post-tool` | Read the network preview back before handing over |
| `create-post-note-tool`, `list-post-notes-tool` | Leave the reasoning, warnings and sources for the reviewer |

## Denied tools

Publishing and approval (`publish-post-tool`, `approve-post-tool`, `reject-post-tool`, `delete-post-tool`), queues and schedules (`move-post-to-slot-tool`, `reorder-queue-tool`, `list-free-slots-tool`, `get-posting-schedule-tool`, `update-posting-schedule-tool`, `generate-posting-schedule-tool`, `copy-posting-schedule-tool`, `set-post-recurrence-tool`, `clear-post-recurrence-tool`), repurposing (`*-repurpose-tool`), API keys and webhooks (`*-api-key-tool`, `*-webhook-*`), label management (`create-label-tool`, `update-label-tool`, `delete-label-tool`), editing or deleting notes (`update-post-note-tool`, `delete-post-note-tool`) and `attach-media-from-url-tool` (media must be a local file with a rights record and a hash, not an arbitrary URL).

## Draft flow

1. Read the accounts and labels; match each package network to an account. A network with no connected account gets a manual export instead (see below).
2. For each post without blockers: look it up by its package ID in the label or note (D1). If a draft exists and its `trypost.contentHash` matches, skip it; if the owner has edited or scheduled it, leave it alone and report it.
3. Create one draft per network per post, dated with the suggested slot, with the project label. Store the returned IDs and the content hash in `posts[].trypost`.
4. Upload media from local files only, with alt text.
5. Add one note per draft: the package ID, the pillar, the reason for the choice, the claims with their status, the open warnings, and the freshness time.
6. Read the preview back; a preview that differs from the package is reported, not silently fixed.

## Networks TryPost does not post to

When a network is not connected, `social-draft` writes a Markdown file beside the package with each post's text, suggested day and time, character count, media and alt text, for posting by hand. It is generated, never edited.
