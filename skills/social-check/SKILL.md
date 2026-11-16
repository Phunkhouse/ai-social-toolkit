---
name: social-check
description: Check a social package before drafting - run the toolkit's mechanical checks and the project's own checks, apply the manual blockers, fix every blocker and list warnings with reasons for the owner. Use after social-write, before social-draft, and before the owner schedules a post.
---

# Social check

Make the package safe to draft. Blockers are fixed, never overridden; warnings go to the owner with their reasons.

## Method

1. **Read** `../../references/checks.md` and the project's `docs/social/review-checklist.md`.
2. **Run the generic checker** with the project's config and its package history:

   ```sh
   node <toolkit>/scripts/check-package.mjs --config docs/social/config.json --history <package folder> --write <package.json>
   ```

   `<toolkit>` is this skill folder's physical path resolved through any symlink, two levels up. It writes `checks` into the package and exits 1 while a blocker is open.
3. **Run the project's own check** if `config.json` names `projectCheck` (it may need `--revalidate` for fresh project data). Its findings are merged into the same `checks` objects.
4. **Apply the manual checks** the scripts cannot: F1 (every statement in the copy has a source), F2, F4 (no third-party wording or close paraphrase), F5, F7, P2, W8 and W9. Record each finding on its post.
5. **Fix blockers** by changing the copy, the media or the plan, never by editing a check result or the project data. Rerun until no blocker is open. A post whose blocker cannot be fixed (a stale item, a missing source) is dropped from this period and the reason recorded.
6. **Do not acknowledge warnings yourself.** Only the owner writes `checks.acknowledged`. List each open warning with its reason.

## Output

The package with up-to-date `checks`, zero open blockers on every post that will be drafted, and a short table of open warnings per post.
