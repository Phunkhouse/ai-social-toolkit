# Method

The rules every social skill follows, whatever the project. A project's playbook in `docs/social/` adds to them and may tighten them; it may not loosen the five principles below.

## Five principles

1. **Drafts only.** Claude prepares; a person publishes. Claude never schedules, queues, approves or publishes a post, never sets a status other than `draft`, and never posts replies. A draft may carry a suggested date, which only places it on the calendar. See [trypost.md](trypost.md).
2. **Facts keep their source.** Every statement a post makes comes from the project's own data (a *source adapter*, see below), a research claim with references, an owner note or an approved project text. Copy is written from claims, never from pages. See [claims-and-sources.md](claims-and-sources.md).
3. **Blockers and warnings are different things.** A blocker (wrong, unlawful, irreversible, refused by a network) stops the post until the cause is fixed; there is no override. A warning (tone, repetition, variety, style) is shown to the owner with its reason, and the owner decides. See [checks.md](checks.md).
4. **Each network and each language gets its own version.** The facts are shared; the shape, length, opening and language are not. A second language is written natively, never translated from the first. See [channels.md](channels.md) and [language/](language/).
5. **Fewer, better posts.** A week with only the core posts is a normal week. An optional slot without real material stays empty; a weak post is skipped, not forced.

## The cycle

| Step | Skill | Output in the package | Owner gate |
| --- | --- | --- | --- |
| 1. Collect | `social-plan` (runs the project's source adapter) | `sources` | — |
| 2. Choose | `social-plan` | `posts[]` skeletons with `pillar`, `intendedDate`, `subjectRefs`, a reason | Keep, swap or drop (interactive), or reviewed later in the drafts (unattended) |
| 3. Research | `social-research` | `research[]` claims | Conflicting claims go to the owner |
| 4. Write | `social-write` | `posts[].copy` per network and language | — |
| 5. Check | `social-check` | `checks` on the package and each post | Warnings are listed for the owner |
| 6. Render (optional) | the project's renderer | `posts[].media` with hashes and alt text | — |
| 7. Draft | `social-draft` | `posts[].trypost` | Owner reviews, edits, schedules, publishes |
| 8. Recheck (optional) | the project's freshness hook | an alert only when something changed | Owner fixes or withdraws |

`social-cycle` runs steps 1–7 in order, interactively or unattended (a scheduled run).

## The package

One JSON file per period (usually an ISO week) holds everything the period's posts may say: the source items, the claims, the posts, the checks and the TryPost IDs. Its shape is [`templates/package.schema.json`](../templates/package.schema.json), contract `social-package/1`. A project may add fields under `sources.items[].data`, `posts[].graphic` and `posts[].extra`; it never removes or renames base fields, so the generic checker keeps working.

Packages are working files. They live outside the repository (a private folder) unless the project decides otherwise; only examples are committed.

## Source adapters

The part that differs most between projects is where the material comes from. A source adapter is anything that writes `sources.items[]` into a package: a CLI command, a script, a database export, a changelog parser, a manual JSON file. Its contract is small:

- each item has a stable `ref`, a `kind`, a `title`, an optional `url` and an optional `validUntil` (when the item stops being true: an event date, a sale end);
- `sources.producer` and `sources.exportedAt` say where and when;
- the adapter decides nothing editorial and writes no copy.

The project's `docs/social/sources.md` names its adapter and its freshness rule. Profiles in [`profiles/`](../profiles/) suggest typical adapters.

## Interactive and unattended runs

- **Interactive:** the owner is in the session. Choices (step 2) and conflicting claims (step 3) are asked as they come up.
- **Unattended:** a scheduled run with nobody to ask. Claude makes the choices itself, records each reason in the post's `review.notes` and in a TryPost note on the draft, leaves out conflicting claims, and ends with a short summary of what was drafted, skipped and held. Nothing an unattended run does goes beyond drafts.

## What the toolkit never does

- Create social accounts, TryPost members, API keys or webhooks.
- Publish, schedule, approve, reject, delete or reorder posts; change posting schedules or recurrence.
- Tag or mention third-party accounts automatically.
- Use images without a rights record (see [images-and-rights.md](images-and-rights.md)).
- Put personal data about users or admin-only data in copy.
