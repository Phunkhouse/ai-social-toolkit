# Channels

Each network gets its own version of a post, written for how people use it. The facts are shared; the shape, length and opening are not. Two variants that differ only in length raise W6.

## How networks differ

| Network | How people read | What works | Avoid |
| --- | --- | --- | --- |
| **Instagram** | Visual first; the caption is read by those the image stopped | The image carries the message; a strong first line (about 125 characters show before "more"), two or three sentences, "link in bio" | Repeating the image's text in full; long captions |
| **Facebook** | Planners, often older; clicks links | Practical: every detail a person needs to act, one link at the end | Hashtag piles, cryptic hooks |
| **Threads** | Conversational, opinionated | One angle, an opinion or a genuine question, the link last | Catalogue lists, announcements |
| **Bluesky** | Conversational, often expert | Like Threads, a little drier; context people can reply to; the link card does the rest | Hashtags, marketing tone |
| **X** | Fast, information first | Short and direct: what, when, where, link | Filler threads, jokes that need setup |
| **LinkedIn** | Professional, reads on a phone between meetings | A concrete lesson, result or story in the first two lines; plain paragraphs | Broetry, "I'm humbled to announce", engagement bait |
| **Mastodon** | Community norms, content warnings, plain text | Alt text always, CamelCase hashtags, no marketing tone | Cross-posted X formatting |

Draft the most practical version first (usually Facebook or LinkedIn), then write the others for their network rather than cutting them from it.

## Limits

TryPost's `list-social-accounts-tool` reports each connected account's real `max_content_length`; that number wins over this table. `social-setup` writes it into `config.json`. The checker uses the table only when the config has no number.

| Network | Default limit | Links | Hashtags (preferred) | Image |
| --- | --- | --- | --- | --- |
| Instagram (feed) | 2 200 | Not clickable in captions | 3–5; TryPost refuses more than 5 | 1080 × 1350 (4:5); carousel up to 10 |
| Facebook (page) | 10 000 | One, at the end | 0–2 | 1080 × 1350 |
| Threads | 500 | One, at the end | 0–1 | 1080 × 1350 |
| Bluesky | 300 | One; its card is the preview | 0 | 1080 × 1350 |
| X | 280 | One, counted as 23 characters | 0–1 | 1080 × 1350; check the crop |
| LinkedIn | 3 000 | One; the first lines matter more than the link | 0–3 | 1200 × 1500 or 1080 × 1350 |
| Mastodon | 500 (instance-dependent) | One; counted as 23 characters | 0–3, CamelCase | 1080 × 1350 |

Threads of replies on X and Bluesky are off by default until the project wants them.

## Hashtags

- Chosen from the project's list (`config.json` → `hashtags.allowed`), never invented per post.
- Never trending tags, unrelated tags or people's names.
- Without diacritics where networks normalise them badly (`#filmovaklasika`, not `#filmováklasika`); CamelCase on Mastodon for screen readers.

## Alt text

Every image has alt text in the post's language, written from the package (what the image says or shows, in reading order), not guessed from the picture. TryPost takes it per image (`meta.alt_text`, up to 2 000 characters, shortened per network on publishing).

## Replies and comments

People answer as the project, in the same voice. Claude may suggest replies in a review note; it never posts them.
