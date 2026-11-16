# AI Social Toolkit

A base layer for keeping a project's social media content up to date with Claude Code and a self-hosted [TryPost](https://github.com/trypost-it/trypost) instance connected through MCP. Claude plans, researches, writes and checks each period's posts, then leaves them in TryPost as **drafts only**. The owner reviews, schedules and publishes every post.

The toolkit holds what all projects share: the method, natural-language rules for Czech and English, channel limits, generic checks and the TryPost contract. Each project keeps its own playbook in `docs/social/`, made from the templates here, for everything specific to it: audience, voice, pillars, sources, cadence and its own checks.

It was extracted from Kultomat's `docs/marketing/` playbook and decision 0051.

## Contents

```text
skills/
  social-setup/SKILL.md      interview, write docs/social/, connect TryPost (draft-only permissions)
  social-plan/SKILL.md       collect project data, propose the period's posts, create the package
  social-research/SKILL.md   facts as sourced claims
  social-write/SKILL.md      native copy per network and language
  social-check/SKILL.md      generic + project checks; fix blockers, list warnings
  social-draft/SKILL.md      TryPost drafts, manual export for unconnected networks
  social-cycle/SKILL.md      the whole cycle, interactive or unattended (scheduled)
references/
  method.md                  principles, the cycle, packages, source adapters
  claims-and-sources.md
  checks.md                  blocker and warning IDs
  channels.md                per-network behaviour, limits, hashtags, alt text
  trypost.md                 allowed and denied MCP tools, draft flow
  images-and-rights.md
  language/cs.md             Czech that sounds like a person + typography
  language/en.md             English that does not read as generated
  language/*.lint.json       mechanical language rules used by the checker
profiles/
  events-programme.md  product-saas.md  open-source.md  content-publisher.md  local-business.md
templates/
  playbook/                  copied into a project's docs/social/
  package.schema.json        contract social-package/1
  trypost-permissions.json   .claude/settings.json snippet
  examples/                  a filled package and config
scripts/
  install.sh                 link the skills into Claude Code and Codex
  validate.sh                validate skills, links, JSON, lint rules and the checker
  check-package.mjs          generic package checker (Node 20+, no dependencies)
  check-package.selftest.mjs
```

## Layers

| Layer | Lives in | Changes |
| --- | --- | --- |
| Method, checks, TryPost contract | `references/`, `skills/`, `scripts/` | Rarely; versioned here |
| Language packs (cs, en) | `references/language/` | When a review finds a new pattern of unnatural copy |
| Project playbook and config | the project's `docs/social/` | Per project, owned by the project |

The project's playbook wins where the two differ, except that it can never loosen the drafts-only rule.

## Install

```sh
./scripts/install.sh
```

The script links each skill into `~/.claude/skills` and `~/.agents/skills`; `--dry-run`, `--claude-only`, `--codex-only` and `--uninstall` work as in the audit toolkit. Run `./scripts/validate.sh` after changing anything.

## Use it in a project

1. In TryPost, create a non-admin member for Claude whose posts require approval, connect the networks, and add the TryPost MCP server to the project as `trypost`.
2. In the project, run `social-setup`. It interviews the owner, writes `docs/social/` and `config.json`, and merges the draft-only TryPost permissions into `.claude/settings.json` after you approve them.
3. Run `social-cycle` interactively for the first period and review the drafts in TryPost.
4. When a period or two has gone well, schedule `social-cycle` unattended (for example every Friday for the next week). It still only prepares drafts.

## The checker

```sh
node scripts/check-package.mjs --config docs/social/config.json --history <package folder> --write <package.json>
```

It runs the checks marked *auto* in [references/checks.md](references/checks.md), applies the language lint for each post's language and the project's settings (form of address, English variant, disabled rules, avoid list), and writes the findings into the package. Findings from the project's own checker (`source: "project"`) and manual findings are kept. It exits 1 while a blocker is open. `--hash` prints the content hashes `social-draft` stores.

## More

- [Specification](docs/SPEC.md): scope, limitations and what is not built yet.
- [Decision records](docs/decisions/README.md).
- [Contributor and agent instructions](AGENTS.md).
