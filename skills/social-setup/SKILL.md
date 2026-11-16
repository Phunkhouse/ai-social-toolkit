---
name: social-setup
description: Set up automated social content maintenance in a project - interview the owner, write the docs/social/ playbook and config.json from the toolkit templates, and connect TryPost through MCP with draft-only permissions. Use when a project wants social posts prepared by Claude for the first time, or to revisit its social playbook.
---

# Social setup

Create the project's social playbook in `docs/social/` and connect TryPost so later runs can prepare drafts. Change nothing outside `docs/social/` and the project's `.claude/settings.json` without asking. Never create social accounts, TryPost members, API keys or webhooks: tell the owner what to create.

## Method

1. **Read the project.** `README.md`, `docs/SPEC.md`, `CLAUDE.md`/`AGENTS.md`, the design source (`docs/design/`) and any existing marketing notes. If `docs/social/` exists, this is a revisit: read it, and change only what the owner asks.
2. **Pick a profile.** Match the project to one or more of `../../profiles/events-programme.md`, `../../profiles/product-saas.md`, `../../profiles/open-source.md`, `../../profiles/content-publisher.md`, `../../profiles/local-business.md`. Use them as starting suggestions for pillars, sources and checks, not as rules.
3. **Interview the owner**, a few questions at a time, proposing defaults from the profile and the project so most answers are "yes":
   - goals and audience (who, where, what they want);
   - languages (`cs`, `en` or both), the Czech form of address (`ty` or `vy`), the English variant (`en-US` or `en-GB`);
   - networks, and which ones TryPost has connected;
   - pillars: three core post types at most to start, optional ones with their skip rule;
   - cadence and suggested posting times, in the project's time zone;
   - project data: where it comes from (the source adapter), how fresh it must be, what must never be posted;
   - research sources: allowed, excluded, and domains whose terms forbid use with AI;
   - graphics: none, templates on the design tokens, screenshots; whether AI-generated images are allowed (default no);
   - who reviews and approves, and whether runs will be unattended (scheduled).
4. **Write the playbook.** Copy `../../templates/playbook/` into `docs/social/` (never overwrite an existing file without asking) and fill every `<…>` placeholder from the answers. Brand voice gets the project's tone, humour by topic and its own avoid list; it points to the toolkit's language packs for language rules instead of repeating them (`../../references/language/cs.md`, `../../references/language/en.md`). Remove sections that do not apply rather than leaving placeholders.
5. **Write `docs/social/config.json`** from `../../templates/playbook/config.json`: languages and their settings, networks with preferred hashtag ranges and `requireLink`, allowed hashtags, allowed link prefixes, excluded source domains, the freshness window, lint rules to disable, the project avoid list, and `projectCheck` if the project has its own checks.
6. **Connect TryPost.** Show the owner the permission snippet from `../../templates/trypost-permissions.json` and the diff against `.claude/settings.json`; merge it only on their yes. Ask the owner to confirm the TryPost member Claude uses is non-admin and requires approval (`../../references/trypost.md`). Then, read-only: `get-workspace-tool`, `list-social-accounts-tool` (write each account's ID and `max_content_length` into `config.json`), `list-labels-tool` (ask the owner to create a label for the project's drafts if none fits).
7. **Validate.** Run `node <toolkit>/scripts/check-package.mjs --config docs/social/config.json --json <toolkit>/templates/examples/package.example.json`, where `<toolkit>` is this skill folder's physical path resolved through any symlink, two levels up. Findings about the example's links, languages and networks are expected; only exit code 2 (a read error) means the config is broken.
8. **Report** what was written, the decisions left as defaults, and the first run to try (`social-cycle`, interactive).

## Output

`docs/social/` with `README.md`, `strategy.md`, `brand-voice.md`, `pillars.md`, `sources.md`, `workflow.md`, `review-checklist.md` and `config.json`; optionally an updated `.claude/settings.json`. Record the toolkit commit in `docs/social/README.md` (`git -C <toolkit> rev-parse HEAD`, or "unknown").
