---
name: social-plan
description: Plan a period of social posts for a project with a docs/social/ playbook - collect the project's data through its source adapter, propose which posts and subjects run on which days, and create the period's package. Use when starting a week of social content or when the owner asks what to post.
---

# Social plan

Create the period's package and its post skeletons. Write no copy yet.

## Method

1. **Read the playbook:** `docs/social/strategy.md`, `pillars.md`, `sources.md`, `config.json`; then `../../references/method.md`. Ask for the package folder if `docs/social/README.md` does not name one.
2. **Collect.** Run the source adapter named in `sources.md` for the period (default: the next ISO week in the project's time zone) and write its items into a new package shaped by `../../templates/package.schema.json`. Never invent, move or "fix" project data; an item that looks wrong is reported, not corrected. Record `sources.producer` and `sources.exportedAt`.
3. **Read history.** Load the last packages from the package folder (as many as the playbook's repetition rules need) for what was featured and when.
4. **Propose.** For each pillar, in the calendar order from `strategy.md`: the subject(s), the suggested date and time, and one sentence on why it is worth posting this period. Apply each pillar's skip rule. Leave optional slots empty when there is no real material. Avoid the repetition the playbook limits (W10).
5. **Decide.**
   - Interactive: show the proposal as a short table; the owner keeps, swaps or drops each post and may add a note or an angle (`ownerNote`).
   - Unattended: keep your proposal, write each reason into the post's `review.notes`.
6. **Write the skeletons** into `posts[]`: `id` (`<packageId>-<pillar>[-<subject>][-<lang>]`, unique for ever; the language suffix only in multilingual projects), `pillar`, `language` (one per post; a bilingual project gets one post per language, the second with `siblingOf` set to the first's ID), `intendedDate`, `intendedTime`, `subjectRefs`, `review.status: "draft"`.

## Output

The package file in the project's package folder, with `sources` and `posts[]` skeletons, and a short summary of the plan and anything skipped.
