# English: natural language for social posts

Language rules, not brand rules. They apply to every project that posts in English; tone, humour and vocabulary belong to the project's `docs/social/brand-voice.md`. Mechanical rules are in [`en.lint.json`](en.lint.json) (warning W1); the rest is applied by Claude while writing and by the owner in review (W8).

A post can be grammatically correct and still read as a template, a translation or a chatbot. These rules target that.

## Write it, don't generate it

- **Say one specific thing.** A concrete detail beats three adjectives. *The new filter remembers your last search* beats *a seamless, intuitive experience*.
- **Plain verbs, short sentences, contractions where people use them** (*it's*, *you'll*). No stacked clauses.
- **An English version is not a translation.** In a bilingual project each language is written natively from the same facts; order, opening and punchline may differ.
- **Read it aloud.** If you wouldn't say it to a friend, rewrite it. If unsure, flag it for the owner.

## Variant and address

- The project chooses **US or UK spelling** in `config.json` (`languages.en.variant`: `en-US` | `en-GB`) and sticks to it; the lint flags common words from the other variant.
- Address the reader as *you*; no *Hey there!*, *Hi friends*, *Dear followers*.

## Openings and questions

- **No robotic introductions:** *Hi, we're …*, *Welcome to our page*, *We're excited to announce*, *Big news!* Start with the point.
- **Questions only when worth answering:** specific, one clear meaning, something people would like to answer. Never as reach boosters (*Thoughts?*, *Agree?*, *What do you think?*, *Drop a comment below*). One per post at most.
- **No engagement bait** (*Tag a friend who…*, *Share if you agree*, *Like if…*).

## The machine-written tells

Warnings, not bans; context decides. Projects add their own in `lint.avoid.en`.

| Avoid | Why | Instead |
| --- | --- | --- |
| *delve*, *elevate*, *unlock*, *unleash*, *empower*, *supercharge*, *harness* | Generic AI vocabulary | The plain verb: *look at*, *improve*, *let you* |
| *seamless*, *robust*, *cutting-edge*, *game-changer*, *revolutionary*, *next-level* | Empty praise | Say what it does |
| *In today's fast-paced world*, *In the ever-evolving landscape of* | Filler openers | Start with the point |
| *It's not just X, it's Y* | A tell when used as a hook | State Y |
| *Whether you're X or Y, …* | Template structure | Talk to one reader |
| *must-see*, *hidden gem*, *look no further*, *you won't believe* | Hype | A reason |
| *Dive in*, *Let's dive into*, *buckle up* | Filler | Nothing |
| Three adjectives in a row; rule-of-three lists everywhere | Rhythm of generated text | One precise word |
| More than one em dash in a short post | A common generated-text tic | A full stop or a comma |

## Content

- **Explain jargon in passing**, not as a lesson; leave out what everyone knows.
- **Facts stay exact while wording changes.** Rewriting never strengthens a claim: *may have inspired* does not become *inspired*.
- **The reason beats the coincidence.** A neat link is a footnote; the hook is why the reader should care.
- **Humour only when it lands by itself**; none on serious topics. A post without a joke is fine.

## Typography

| What | US | UK |
| --- | --- | --- |
| Date | *Thursday, November 20*; *Nov 20* | *Thursday 20 November*; *20 Nov* |
| Time | *7:30 p.m.* or *7:30pm* per house style; 24-hour if the project prefers | *19:30* or *7.30pm* per house style |
| Numbers | *1,000*, *2.5%* | *1,000*, *2.5%* |
| Quotes | “double”, ‘single’ inside | ‘single’, “double” inside (or the project's choice) |
| Ranges | en dash without spaces: *10–12*, *Nov 16–22* | same |
| Headlines and titles | Sentence case by default; titles of works in title case | same |

- At most one exclamation mark per post, none in headlines.
- At most one emoji per post, never as a bullet or in place of a word.
- Hashtags in CamelCase where networks or screen readers benefit (*#OpenSource*).
- The checker reads dates only when they include a weekday and a month name (*Monday 16 November*, *Mon, Nov 16*).

## Examples

| Instead of | Write |
| --- | --- |
| *We're thrilled to announce our game-changing new feature that will elevate your workflow!* | *You can now save a filter and get back to it next time.* |
| *Hey there! 👋 Big news for all you film lovers out there!* | *Four old films worth seeing on a big screen this week.* |
| *Whether you're a beginner or a pro, this release has something for everyone. Thoughts?* | *Version 3 is out. The biggest change: imports now take seconds instead of minutes.* |
