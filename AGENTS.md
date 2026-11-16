# Project instructions

Project overview: `README.md`. Scope, limitations and open questions: `docs/SPEC.md`. Decision records: `docs/decisions/`.

This repository is a toolkit, not an application: Skills, references, templates and a dependency-free Node checker that other projects install and copy from. Changes here reach every project that uses it, so keep them general and deliberate.

## Commands

- `./scripts/validate.sh` — validates Skill frontmatter and references, local Markdown links, installer syntax, every JSON file, the lint rule patterns, and runs the checker self-test. Run it before finishing any change.
- `node scripts/check-package.selftest.mjs` — the checker self-test alone.
- `node scripts/check-package.mjs --config <config.json> [--history <dir>] [--write] [--json] [--hash] [--now <ISO>] <package.json>` — the generic package checker; exits 1 while a blocker is open, 2 on a read or usage error.
- `./scripts/install.sh [--dry-run] [--claude-only | --codex-only] [--uninstall]` — links the Skills into `~/.claude/skills` and `~/.agents/skills`. Do not run it without `--dry-run` unless the user asks.

When adding or changing a script, update this section with its exact command and purpose. Node 20 or later; no npm dependencies.

## Validation strategy

- CI strategy: Standard (default). `.github/workflows/validate.yml` runs `./scripts/validate.sh` on pull requests and on pushes to `main`. Change to Budget-conscious only when the user chooses it and the workflow implements it.
- Run `./scripts/validate.sh` locally before handing off work, and report its result and any check that could not run.
- Before any authorized merge, confirm successful CI for the current revision. Local results and earlier commits' CI do not replace it. Do not bypass checks or change the strategy to avoid a failure.

## Toolkit rules

- **Drafts only is not negotiable.** No Skill, template or script may schedule, approve, queue or publish a post, or widen the TryPost allow list in `templates/trypost-permissions.json` beyond read, draft, media, preview and notes. A change that touches this needs a decision record.
- **General here, specific in the project.** Anything that only makes sense for one project (Kultomat's screenings, film sources, its renderer) stays in that project's `docs/social/`. Add a profile in `profiles/` when a pattern fits a kind of project.
- **Language packs:** `references/language/<lang>.md` holds the rules for people; `<lang>.lint.json` holds the mechanical subset. When adding or changing a lint rule, add a case to `scripts/check-package.selftest.mjs` that it catches and one natural sentence it must spare. Prefer a warning over a missed nuance: lint rules never become blockers.
- **Check IDs are stable.** Never renumber or reuse an ID in `references/checks.md`; projects reference them. Keep `references/checks.md`, `scripts/check-package.mjs` and the schema in step.
- **The package contract** (`templates/package.schema.json`, `social-package/1`) only grows: add optional fields; removing or renaming a field needs a new contract version and a decision record.
- **Skills** reference shared files with `../../references/…`, `../../templates/…`, `../../profiles/…` or `../../scripts/…`, so `validate.sh` can check them. Keep each `name` equal to its folder and the `description` a single sentence saying when to use it.
- Write in plain English; Czech only in `references/language/cs.*` and in Czech examples.

## Changes

- Keep diffs focused. Record lasting trade-offs in `docs/decisions/` (copy `template.md`, next free number).
- Name commits `type: short imperative summary`, using lowercase `feat`, `fix`, `docs`, `refactor`, `test` or `chore` as appropriate.
- Before finishing, run `./scripts/validate.sh`, update affected documentation and commands, and mention unrelated changes without folding them into the task.
- **This repository is public.** Do not commit secrets, `.env` files, real week packages, TryPost IDs, account handles that are not public, or personal data. Examples use invented data (`example.org`).

## Pull requests

- Work through multiple PRs sequentially. Keep at most one agent-authored PR awaiting user review at a time, and wait for the user to merge or close it before starting the next, unless they ask for parallel work.
- When a change needs action in projects that use the toolkit (a renamed config key, a new required setting, a changed permission list), put a `> [!IMPORTANT]` block at the top of the PR description listing what each project must do, in order, and how to verify it; repeat it in the chat handoff. Omit the block when no action is needed.
- Leave the final merge to the user unless they explicitly ask you to perform it.
