---
name: social-write
description: Write social post copy natively for each network and language from a package's project data and research claims, following the project's brand voice and the toolkit's Czech and English language packs. Use after social-research, or to rewrite a post after review.
---

# Social write

Fill `posts[].copy` in the package. Write from the package only: its source items, its claims, the owner's notes and the project's approved texts. Close every research page first.

## Method

1. **Read, in this order:** the project's `docs/social/brand-voice.md` and `pillars.md`; the language pack for each language the post uses (`../../references/language/cs.md`, `../../references/language/en.md`); `../../references/channels.md`; the project's `config.json` (form of address, variant, networks, hashtags, links). Where the project and the toolkit differ, the project wins, unless it would loosen a principle in `../../references/method.md`.
2. **Write the most practical network first** (usually Facebook or LinkedIn), then write each other network for how people read it there. Never cut one variant from another (W6).
3. **Each language natively.** A post has one `language`. In a bilingual project, each language is its own post (linked by `siblingOf`), written from the same facts and claims in that language, never from the other post's text.
4. **Every statement has a source** in the package. A fact that is not in a claim or in project data does not go in (F1). Rewording never strengthens a claim. A `conflicting` claim is left out or told as told (F2). Quotations carry attribution (F5).
5. **Per network:** stay within the limit, put the link where the network takes one, use hashtags only from the project's list within the preferred range, and write alt text for every media item from the package.
6. **Self-review before handing over.** Read each text aloud in your head against the language pack: robotic openings, gender slashes, wrong form of address, calques, empty praise, engagement-bait questions, forced jokes, more than one emoji or exclamation mark. Fix what you can; for any phrase you are unsure about, add a W8 warning with the phrase and your doubt instead of guessing.
7. Set `copy.author` (`claude`) and `copy.humour` (from the brand voice's humour-by-topic table).

## Output

`posts[].copy` for every planned post, and a list of W8 doubts for the owner.
