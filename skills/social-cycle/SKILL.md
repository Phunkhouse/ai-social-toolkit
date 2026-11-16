---
name: social-cycle
description: Run a full social content cycle for a project with a docs/social/ playbook - plan, research, write, check, render and draft into TryPost - interactively with the owner or unattended as a scheduled run. Use for the weekly social run or when the owner asks to prepare next week's posts.
---

# Social cycle

Run the whole cycle from `../../references/method.md` for one period. Everything ends as TryPost drafts; nothing is published.

## Method

1. **Mode.** Interactive when the owner is in the session; unattended when this runs on a schedule or the owner says so. In unattended mode, never wait for an answer: decide, record the reason, and report it at the end.
2. **Preflight.** `docs/social/config.json` exists and parses; the TryPost MCP server answers `get-workspace-tool`; the package folder is writable. If any fails, stop and report what the owner needs to fix.
3. **Run the steps** in order, each by following its skill:
   1. `social-plan` (the owner's choice gate in interactive mode);
   2. `social-research` (conflicting claims to the owner, or left out);
   3. `social-write`;
   4. `social-check` (fix blockers, loop until clean);
   5. render media with the project's renderer if `docs/social/workflow.md` names one, then `social-check` again for M2, F6 and P1;
   6. `social-draft`.
4. **Stop early** rather than force: if the source adapter fails or returns stale data, draft nothing that depends on it and report it. A period with only some posts drafted is a valid result.
5. **Report** in a few lines: what was drafted (post, network, suggested date), what was skipped and why, conflicting claims left out, warnings to look at first, and what the owner must do next (review, schedule). In unattended mode, also leave this summary as a note on the first draft of the period.

## Scheduling

To run weekly, schedule this skill as a recurring Claude Code task or cloud routine in the project, with a prompt such as "Run social-cycle unattended for next week". The schedule only prepares drafts; the owner still reviews, schedules and publishes each post in TryPost.
