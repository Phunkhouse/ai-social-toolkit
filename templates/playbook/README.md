# Social playbook

How <project> talks about itself on social networks: who it talks to, how it sounds, what it posts, where the facts come from, how a post is checked, and how drafts reach TryPost. Claude prepares drafts; <owner> reviews, schedules and publishes every post.

Built on the AI social toolkit (commit `<toolkit commit>`), which supplies the method, the Czech and English language rules, the channel limits, the generic checks and the TryPost contract. This folder holds only what is specific to <project>; where it and the toolkit differ, this folder wins, except that it never loosens the toolkit's drafts-only rule.

## Documents

| Document | What it settles |
| --- | --- |
| [Strategy](strategy.md) | Goals, audience, positioning, cadence, measurement, open decisions |
| [Brand voice](brand-voice.md) | Tone, humour by topic, words to use and avoid, examples |
| [Pillars](pillars.md) | The recurring post types, their inputs, structure, length and skip rules |
| [Sources](sources.md) | The source adapter, freshness, allowed and excluded research sources, what never goes in |
| [Workflow](workflow.md) | One period, step by step; the renderer; unattended runs |
| [Review checklist](review-checklist.md) | Project-specific checks and the owner's sign-off |
| [`config.json`](config.json) | Machine-readable settings for the checker and the skills |

## Where things live

- Packages: `<package folder>` (private, outside the repository).
- TryPost: `<TryPost URL>`, workspace `<workspace>`, label `<label>`.
- Design source: `<path to design tokens>`.
