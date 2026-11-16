# 0001. A layered toolkit that only ever prepares drafts

Date: 2026-11-16  
Status: accepted

## Context

Kultomat's marketing playbook (its decision 0051) proved a workflow for weekly social posts prepared by Claude and reviewed by the owner in a self-hosted TryPost. Most of that playbook is not about films: the method, sourced claims, blocker/warning checks, channel limits, the TryPost permission split and the rules for Czech that sounds like a person apply to any project. Other projects should get the same setup without copying and drifting from Kultomat's files.

TryPost's MCP server exposes publishing, approval, queue, webhook and API key tools beside draft creation.

## Decision

- **Three layers:** the toolkit (method, checks, TryPost contract, Skills, checker), language packs for Czech and English, and a per-project playbook in `docs/social/` made from the templates. The project wins where they differ, except on the drafts-only rule.
- **Drafts only:** Claude never schedules, queues, approves or publishes. Enforced by a non-admin TryPost member that requires approval and by a Claude Code allow/deny list; the Skills never send a status other than `draft`.
- **One package per period** (`social-package/1`) holds everything posts may say; the contract only grows.
- **One language per post.** A bilingual project gets one post per language, linked by `siblingOf`, each written natively from the same claims.
- **Generic checks in the toolkit, project checks in the project**, merged in the same package `checks`.

## Alternatives considered

- **Keep Kultomat's playbook and copy it per project:** fastest now, but every fix would have to be repeated and copies would drift.
- **One combined post with both languages:** fewer drafts, but reads badly on every network and pushes towards translation.
- **Rely on the TryPost member role alone:** simpler settings, but a mistaken call would still reach TryPost's approval queue; denying the tools in Claude Code stops it earlier.

## Consequences

- New projects start from a working method and language rules; their effort goes into the playbook and the source adapter.
- Kultomat should later be moved onto the toolkit so there is one source for the shared rules.
- `update-post-tool` remains allowed and can change fields beyond the draft; only the Skill's instructions prevent that. Revisit if TryPost offers a draft-only scope or role.
