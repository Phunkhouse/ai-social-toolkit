# Images and rights

The default graphic is the project's own: a template built from its design tokens, a screenshot of its own product, its own photo or illustration. Anything else needs a recorded basis before it is used.

## Rights record

Every item in `posts[].media` has a `rights` object; the checker blocks a media item without one (F6).

| `basis` | Means | Also required |
| --- | --- | --- |
| `own` | Made by the project: templates, screenshots of its own product, its own photos and illustrations | — |
| `permission` | The holder allowed this use | `holder`, `permission` (what was allowed, where it is recorded), `recordedAt` |
| `licence` | An open licence that allows the use (e.g. CC BY, CC0 from a shown rights holder) | `holder`, `licence`, `sourceUrl`, `recordedAt`; the credit in every caption the licence requires |
| `public-domain` | A named author's work whose term has expired, checked outside the hosting site | `holder` (the author), `sourceUrl`, `recordedAt`, a note on how it was checked |

Never acceptable as a basis: "author unknown", a bare Public Domain Mark, "found on Google", a press kit without terms, a poster or still because it is "promotional".

## Approval

Only the owner approves a non-`own` image, for a specific file and crop. Claude may propose a candidate with its evidence; it never approves one. The approved file is stored locally with its SHA-256 hash, so a later swap is detectable.

## Generated images

AI-generated images count as `own` only when the project's playbook allows them and they are not made to resemble a specific poster, still, artwork, person or brand. Projects decide this in `docs/social/brand-voice.md`; the default is not to use them.

## Alt text

Written from the package, in the post's language, saying what the image shows or says. When an image carries a credit, the credit also appears in the caption.
