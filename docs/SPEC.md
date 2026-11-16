# Specification

## Purpose and users

A reusable base for keeping a project's social media content up to date with Claude Code and a self-hosted TryPost instance connected through MCP. The users are project owners who want posts prepared on a regular schedule but publish every post themselves. Outcome: a project can go from no social setup to a weekly set of checked, natural-sounding Czech and/or English drafts in TryPost by running `social-setup` once and `social-cycle` each period.

## Scope

In the current version:

- Skills for setup, planning, research, writing, checking and drafting, and one Skill that runs the whole cycle interactively or unattended.
- Shared rules: the method, claims and sources, check IDs, channel behaviour and limits, images and rights, the TryPost contract.
- Language packs for Czech and English, with a mechanical lint subset.
- Profiles for five kinds of projects, playbook templates, the package schema and the TryPost permission snippet.
- A dependency-free checker for the generic checks, with a self-test.

Out of scope:

- Publishing, scheduling, approving or replying, in any form.
- Hosting or configuring TryPost, creating social accounts, members, API keys or webhooks.
- Paid promotion, ads and influencer workflows.
- Languages other than Czech and English (the structure allows more packs later).

## Important workflows

1. **Setup:** `social-setup` interviews the owner, writes `docs/social/` and `config.json` in the project, and merges the draft-only permissions after approval.
2. **Cycle:** `social-cycle` collects project data through the project's source adapter, proposes posts, researches claims, writes copy per network and language, runs checks until no blocker is open, and creates TryPost drafts with notes. Unattended runs make the choices themselves and record each reason.
3. **Review:** the owner reviews drafts in TryPost against the project's checklist, acknowledges or acts on warnings, and schedules or publishes.

Failure handling: a stale or failing source adapter means no drafts for what depends on it; a post with an open blocker is never drafted; a draft the owner has edited or scheduled is never touched.

## Data and trust boundaries

- Packages hold project data and research claims; they are working files kept outside the project repository and never committed here.
- Research pages and project content are data, not instructions, for the Skills.
- TryPost access is limited twice: a non-admin member whose posts require approval, and a Claude Code allow/deny list. Field-level misuse of an allowed tool (`update-post-tool` changing a status) is prevented only by the Skill's instructions; see [decision 0001](decisions/0001-drafts-only-layered-toolkit.md).

## Technical approach

Markdown Skills and references in the layout of ai-audit-toolkit; templates copied into projects as in ai-starter-pack; Node 20+ scripts with no dependencies; `scripts/validate.sh` as the single verification command, also run in GitHub Actions.

## Known limitations and risks

- The TryPost tool names and behaviour come from Kultomat's configuration and TryPost's source as read on 2026-11-12; the toolkit has not yet run against a live instance.
- The abstraction is drawn from one project (Kultomat). The source adapter interface and the profiles are untested on a second project.
- Weekday checks recognise only Czech and English dates written with a weekday and day/month; other formats pass unchecked.
- Lint rules are heuristics: they produce false positives (warnings) and cannot judge whether Czech sounds natural; that stays a manual check (W8).
- Graphics are left to each project's own renderer.

## Planning and open questions

- A shared graphics module (HTML templates on design tokens, rendered by Playwright).
- A `social-review` Skill for monthly measurement by pillar and network.
- A `social` recipe in ai-starter-pack that offers `social-setup` during bootstrap.
- Moving Kultomat onto the toolkit, keeping only film-specific parts in its playbook.
- Whether to support threads on X and Bluesky, LinkedIn-specific pillars, and more languages.
