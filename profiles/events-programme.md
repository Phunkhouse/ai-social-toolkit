# Profile: events and programmes

Projects that list things happening at a time and place: screenings, concerts, talks, markets, sports. Reference implementation: Kultomat (`docs/marketing/` in that repository).

## Typical pillars

| Pillar | Tier | Shape |
| --- | --- | --- |
| Week's picks | Core | 3–5 items worth going to, each with day, time and venue |
| Spotlight | Core | One item with real context (history, why it matters) |
| Weekend picks | Core | Practical picks for Friday evening to Sunday |
| Today | Optional | Tonight's best bet; skipped when nothing qualifies |
| Fun fact / question | Optional | One true detail, or a question worth answering |

## Source adapter

An export of the period's items from the project's database: item, start time with offset, venue, official link, sold-out mark as the venue states it, `lastCheckedAt` per source. `validUntil` is the start time.

## Extra checks worth adding

- Every day, time and venue in copy matches an exported item (Kultomat S2).
- An item has not started at the post's intended time (S3); same-day posts leave a margin of a few hours.
- Freshness: the source was checked within the window; revalidate before scheduling; an optional morning recheck.
- Never claim availability or prices the project does not control.

## Risks

Data that changes after drafting (cancellations, time changes) is the main failure; the freshness recheck matters more than any language rule. Venue texts and posters belong to the venues.
