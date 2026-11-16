# Profile: local business

Cafés, shops, studios, services: one or a few places with opening hours and offers.

## Typical pillars

| Pillar | Tier | Shape |
| --- | --- | --- |
| This week | Core | What is new or on: a product, a menu, an event, changed hours |
| Behind the counter | Optional | The people or the craft, with consent of anyone shown |
| Offer | Optional | A limited offer, with its exact terms and end date |

## Source adapter

Usually manual: the owner's weekly note in a small JSON or Markdown file (items, prices, dates, hours), or the booking or POS system's export. `validUntil` is the offer's or event's end.

## Extra checks worth adding

- Prices, hours and offer terms match the owner's note exactly.
- An offer post states its end date and is not dated after it.
- People shown in photos gave consent (rights record with `permission`).
- Consumer-law wording for offers and discounts (see the audit toolkit's legal readiness skill for CZ/EU).

## Risks

Wrong prices or hours cause real complaints. Keep the adapter simple enough that the owner actually fills it in.
