# Workflow

One period (usually a week), from project data to unpublished TryPost drafts. The toolkit's `social-cycle` skill runs steps 1–7.

| When | Who | Step | Output |
| --- | --- | --- | --- |
| <day before the period> | Claude (`social-plan`) | Collect data with the source adapter; propose posts | Package with `sources`, post skeletons |
| Same day | Owner (interactive) or Claude (unattended) | Keep, swap or drop each post; optional notes | Choices |
| Same day | Claude (`social-research`) | Research claims for the chosen posts | `research[]` |
| Same day | Claude (`social-write`) | Copy per network and language | `posts[].copy` |
| Same day | Claude (`social-check`) | Generic and project checks; fix blockers | `checks` |
| Same day, optional | Claude: `<render command>` | Render graphics | `posts[].media` |
| Same day | Claude (`social-draft`) | TryPost drafts, dated with suggested slots; manual export for unconnected networks | `posts[].trypost` |
| Before scheduling | Owner | Revalidate if needed, review against the checklist, edit, schedule or publish | The only publishing step |
| <morning of a post, optional> | <freshness hook> | Recheck project data; alert only when something changed | <email/notification> |

## Unattended runs

<Schedule, e.g. "Fridays 09:00, Claude Code scheduled task: Run social-cycle unattended for next week".> An unattended run makes the choices itself, records each reason in a TryPost note, leaves out conflicting claims, and drafts only.

## Renderer

<None | command, templates folder, output sizes, how hashes are recorded.>

## When something goes wrong after publishing

<Who corrects or removes a post, and how the package is updated.>
