# Checks

Two kinds, with different weight (see [method.md](method.md#five-principles)). IDs are stable across projects; a project adds its own with a prefix of its choice (Kultomat uses `S` for screenings, `T` for same-day posts) and lists them in `docs/social/review-checklist.md`.

`scripts/check-package.mjs` runs the checks marked **auto** and writes the results into the package with `--write`. It exits 1 while any blocker is open. Checks marked **manual** are applied by Claude while writing and by the owner in review. A project's own checks run as its `config.json` → `projectCheck` command.

## Blockers

A post with a blocker does not reach TryPost. There is no override; the cause is fixed.

| ID | Blocks when | Run |
| --- | --- | --- |
| C1 | The package or a post lacks a required field, or a value has the wrong type | auto |
| S1 | A post names a `subjectRef` that is not in `sources.items` | auto |
| S2 | A post's `intendedDate` is outside the package period, or after a named item's `validUntil` | auto |
| S3 | A weekday name does not match its date (*čtvrtek 19. 11.* must be a Thursday; *Monday 16 November* a Monday) | auto (cs, en) |
| F1 | A post's `claimIds` names a claim that does not exist; or (manual) a statement in the copy has no source at all | auto + manual |
| F2 | A `conflicting` claim is stated as plain fact | manual (auto raises W4) |
| F3 | A claim's source is on the project's excluded list (`sources.excludedDomains`) | auto |
| F4 | Copy repeats third-party wording: eight or more consecutive words matching a page used in research, ignoring names, titles and marked quotations; or close paraphrase | manual |
| F5 | A quotation has no attribution | manual |
| F6 | A media item has no rights record (`rights.basis`, and `holder` + `recordedAt` unless the basis is `own`) | auto |
| F7 | Personal data about users, or admin-only data, appears in copy | manual |
| M1 | A network variant lacks a link where the project's config requires one (`networks.<n>.requireLink`) | auto |
| M2 | A media item has no alt text | auto |
| L1 | A link does not start with one of `links.allowedPrefixes` | auto |
| P1 | A text exceeds the network's limit (the account's `max_content_length` from TryPost wins over the default), or Instagram has more than 5 hashtags | auto |
| P2 | A media item's format or size is not accepted by its network (TryPost's `list-content-types-tool`) | manual |
| D1 | A post ID is used twice in the package or exists in an earlier package (`--history <dir>`) | auto |
| D2 | A post has a `trypost.contentHash` but no `trypost.posts` IDs, so a new push would create second drafts instead of updating the first | auto |

## Warnings

Shown to the owner with the reason; the owner keeps the post, changes it or drops it. Keeping a post despite a warning needs a one-line reason in `checks.acknowledged` (`{ "id", "reason", "by", "at" }`); it informs next week's choices and is not a gate.

| ID | Warns when | Run |
| --- | --- | --- |
| W1 | A language-pack lint rule matches (the finding names the rule, e.g. `cs.gender-slash`, `en.ai-cliche`) | auto |
| W2 | More than one emoji, or more than one exclamation mark, in a text | auto |
| W3 | A `single-source` claim is used | auto |
| W4 | A `conflicting` claim is used: check it is told as told (F2) | auto |
| W5 | A hashtag is not on the project's allowed list, or the count is outside the network's preferred range | auto |
| W6 | Two network variants of one post are nearly identical | auto |
| W7 | A word from the project's "avoid" list appears (`lint.avoid.<lang>`) | auto |
| W8 | A phrase reads translated, stiff or machine-written; the wrong form of address; a forced joke or idiom; a question added only for engagement | manual (Claude flags its own doubts) |
| W9 | Humour on a topic the brand voice marks as "none" | manual |
| W10 | The same subject dominates the period: in more than two posts, or on consecutive days | auto |
| W11 | A post's `freshness.validatedAt` (or the package's `sources.exportedAt`) is missing or older than the project's freshness window (`freshness.maxAgeHours`) | auto |
| W12 | The copy changed since it was sent to TryPost (`trypost.contentHash` differs): `social-draft` will update the existing drafts | auto |

`node scripts/check-package.mjs --hash <package.json>` prints each post's content hash, the value `social-draft` stores in `trypost.contentHash`.

## Where results go

Findings about one post go on that post (`posts[].checks`); findings about the package go in the package's own `checks`. Each finding is `{ "id", "message", "rule"?, "network"?, "lang"? }`.
