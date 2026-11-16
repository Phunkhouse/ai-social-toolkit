---
name: social-research
description: Research context for planned social posts within a project's allowed sources and record each fact as a sourced claim in the package. Use after social-plan, or when a post needs specific, verifiable context.
---

# Social research

Add `research[]` claims to the package for the planned posts. Research finds facts; it never borrows expression.

## Method

1. **Read the rules:** `../../references/claims-and-sources.md`, then the project's `docs/social/sources.md` and `config.json` → `sources.excludedDomains`. The project's lists win over the defaults.
2. **Angle first.** For each post, decide what would make someone care this period. One or two facts are enough; a post is not an encyclopedia entry. Use the owner's note when there is one.
3. **Look things up** in allowed sources only, reading single pages as a person would. Respect robots.txt and terms; skip anything behind a login. Never use excluded sources, search snippets or AI summaries as a source.
4. **Write claims, not excerpts:** one short sentence each, in the language of the post that will use it, in our own words, with `sources[]` (URL, publisher, revision if shown, access date) and a `status` (`confirmed`, `single-source`, `conflicting`, `owner`). Two language editions of Wikipedia are one source.
5. **Handle uncertainty.** A conflicting claim is recorded with a note on what conflicts. Interactive: ask the owner. Unattended: leave it out of the copy and say so in the summary.
6. **Never** add, move or confirm an item of project data through research, and never store third-party text beyond a short attributed quotation that is itself the point.
7. Link claims to posts through `posts[].claimIds`.

## Output

The package's `research[]` and `posts[].claimIds`, and a short list of conflicting or single-source claims for the reviewer.
