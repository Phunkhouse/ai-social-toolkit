# Claims and sources

Research finds **facts**; it never borrows **expression**. A fact is free to state in our own words once it has a source. A description, a review, an interpretation or a memorable phrasing belongs to its author and is never copied or closely paraphrased.

## Two kinds of input

Keep them apart throughout:

- **Project data** (what, when, where, price, the official link) comes **only** from the project's source adapter. Research never adds, moves or confirms an item of project data.
- **Context** (history, who made it, why it matters, a surprising detail) comes from research, the owner or the project's approved texts, each fact with its source.

## Allowed and excluded sources

Each project lists them in `docs/social/sources.md`. Defaults when the project says nothing:

| Allowed by default | Notes |
| --- | --- |
| Wikipedia (any language), Wikidata | Use facts, never sentences: Wikipedia text is CC BY-SA. Record the URL and, where shown, the revision |
| Official and primary sources: the maker's own site, documentation, press releases, interviews, archives, public registers | Short quotations only with attribution and only when the quote itself is the point |
| The project's own approved texts | Reuse wording only when the text has no third-party source |
| The owner's notes | Recorded with status `owner` |

| Excluded by default | Why |
| --- | --- |
| Pages behind a login or paywall; anything robots.txt or the site's terms forbid | Access and terms |
| Review aggregators and user-generated databases | Terms restrict reuse; content is users' own writing |
| Content whose terms restrict use with AI | The project names these domains in `config.json` (`sources.excludedDomains`), and the checker blocks them |
| AI-generated summaries, search snippets | Not a source |

## How a fact is recorded

One claim is one short sentence, in the language of the post that will use it, in our own words:

```jsonc
{
  "id": "release-2019-rewrite",
  "subjectRef": "app-v3",
  "lang": "cs",
  "claim": "Verze 3 vznikla jako úplný přepis původní aplikace z roku 2019.",
  "sources": [
    { "url": "https://example.org/blog/v3", "publisher": "Example blog", "revision": null, "accessedAt": "2026-11-16" }
  ],
  "status": "single-source",
  "note": ""
}
```

| Status | Means | In copy |
| --- | --- | --- |
| `confirmed` | Two independent sources agree, or one primary source states it | Plain fact |
| `single-source` | One reliable secondary source | Allowed; the reviewer sees it marked (warning W3) |
| `conflicting` | Sources disagree, or a source says it is disputed | Left out, or told as told ("traduje se, že…", "the story goes that…"); never a plain fact (blocker F2, manual) |
| `owner` | The owner's own statement | Plain fact, attributed to the owner where it matters |

Two language editions of Wikipedia count as one source.

## Writing from claims

1. Pick the angle first: why would someone care this week? One or two facts are enough.
2. Look things up in allowed sources only.
3. Write claims, not excerpts.
4. Close the pages, then write the copy from the claims.
5. Facts stay exact while the wording changes: rewriting never strengthens a claim ("possibly" stays "possibly"; "adviser" does not become "scientist").

A third-party text is never stored in the package: only claims, references and, rarely, a short attributed quotation.
