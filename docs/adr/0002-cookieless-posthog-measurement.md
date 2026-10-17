---
status: accepted
---

# Cookieless PostHog measurement of page views and Destination clicks

The Bio page measures how many visitors arrive and where they go, using PostHog Cloud in the EU region. Two things are measured and nothing else: the page view, and the Destination click on a Product card, Social link or Extra link. This does not conflict with ADR 0001: no tracking parameter is added to outgoing links.

## Decisions

- **Cookieless.** PostHog keeps its identity in memory only, never calls `identify`, and records no sessions. No consent banner is shown. The cost is that a returning visitor counts as new, so there is no per-person recurrence metric.
- **Explicit events only.** Autocapture is off. The events are the standard page view and one `destination_clicked` event carrying `kind` (product, social or extra), `name` (the Product description, the network, or the Extra link title) and `position` (1-based index within its section). Incoming UTM parameters are kept by the page view on its own.
- **One global click listener.** A single delegated listener on the document reads `data-*` attributes from the clicked link to build the event, so adding a new kind of link needs no tracking code, only the attributes.
- **No reverse proxy.** Events go straight to PostHog. Ad blockers will drop part of them, so the numbers are a floor, not the total.
- **EU region.** Chosen for the stricter data posture; LGPD does not require data to stay in Brazil.
- **Production only.** The project key is configured only in the Production environment. Without a key nothing is sent, so local development, tests and preview deployments stay out of the numbers.

## Considered options

- **Persistent cookies with a consent banner.** Rejected: a link-in-bio page does not need per-person recurrence, and a banner costs the visitor a tap in a mobile in-app browser.
- **Autocapture.** Rejected: it records every click through selectors that break when the markup changes, and clutters the dashboard.
- **Reverse proxy through the app's own domain.** Rejected: more configuration and traffic through the host for a gain (counting blocked visitors) that is not worth it here.
- **Click tracking inside each link component.** Rejected in favour of the global listener, which keeps the rule in one place.

## Consequences

- Numbers undercount: blocked visitors are invisible and returning visitors look new.
- Every measured link must carry its tracking attributes; a link without them is not counted.
- The tracking attributes and the listener are the contract: changing an attribute name changes the event.
