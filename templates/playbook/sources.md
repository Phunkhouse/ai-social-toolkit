# Sources

Two kinds of input, kept apart: **project data** comes only from the source adapter; **context** comes from research claims, the owner or approved project texts, each with its source.

## Source adapter

| | |
| --- | --- |
| **Command** | `<command that writes sources.items into a package, or "manual">` |
| **Item kinds** | <event, release, article, offer, …> |
| **Project-specific fields** | <what goes into items[].data> |
| **Freshness** | <items older than N hours are stale; `config.json` → `freshness.maxAgeHours`> |
| **Revalidation** | <how a post's data is rechecked before scheduling, or "not needed"> |

Research never adds, moves or confirms an item of project data.

## Research: allowed

| Source | Use for | Notes |
| --- | --- | --- |
| Wikipedia, Wikidata | <…> | Facts, never sentences |
| <official/primary sources> | <…> | |
| Owner's notes | Anything | Status `owner` |

## Research: excluded

- <Sources whose terms forbid use with AI: also in `config.json` → `sources.excludedDomains`>
- Review aggregators and user-generated databases, unless allowed here by name.
- Pages behind a login or paywall; anything robots.txt or terms forbid.
- <The project's own pages, if they show third-party data>

## What never goes in

- <Third-party data the project may not republish>
- Personal data about users, even aggregated, and admin-only data.
- Third-party text beyond facts in our words and short attributed quotations.
- Images without a rights record.
