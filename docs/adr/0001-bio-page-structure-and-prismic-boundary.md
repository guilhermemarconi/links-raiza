---
status: accepted
---

# Single-page bio with content in Prismic and visual identity in code

The app becomes a single-page Bio page (`/`) modelled on comunicandometodo.com.br/bio and carrying the visual identity of raizasouto.com.br, presenting three Products (COLUNA, PILAR, Work Session). Content is editable in Prismic; the visual identity (palette, fonts, background image) is fixed in code. This deliberately departs from the original goal that everything be configurable in Prismic: the identity is a brand constant, and keeping it in code avoids shipping an editor-facing way to break it.

## Page

Top to bottom: Profile (photo, name "Raíza Souto", short description, over the `fundacao-01` hero image at 20% opacity fading into the background), Social links, Product cards, Extra links. One route, all destinations external, no per-product pages, no UTM parameters, no contact section, no prices.

Products are ordered by the editor, currently COLUNA → PILAR → Work Session, and all carry equal weight. COLUNA links to `https://raizasouto.com.br`; Work Session links to a WhatsApp URL with a prefilled, URL-encoded message; PILAR has no link yet.

## Boundary

**In Prismic**

- Profile: photo, name, description, and page metadata (title, description, share image), falling back to the current hard-coded text when empty.
- Products: orderable list with internal name, image, description, optional URL.
- Social links: network (Instagram, YouTube, TikTok, LinkedIn) and URL.
- Extra links: unchanged (image, title, URL).
- A Product or Social link without a URL is registered but not rendered.
- The `layout` type is removed; fields that still apply (photo, description, extra links) are kept.

**In code**

- Dark theme only: `#1a110b` background, `#f2dfd4` text, `#e3bfad` accent, `#281e17` surface, `#412b1f` text on accent.
- EB Garamond for the name and headings, Sofia Pro elsewhere, under `app/fonts/`. A free sans stands in until the Sofia Pro files are supplied.
- The background image, under `public/`.

## Considered options

- **Colors, fonts and background editable in Prismic** (the previous `layout` type). Rejected: it lets the brand drift without review, and fonts cannot be swapped from a CMS without a loading cost.
- **Product cards composed in code from text fields.** Rejected in favour of image cards, so the editor controls presentation without code changes. The cost is that the pitch lives inside the image, so each Product requires a mandatory description used as alt text.
- **Per-product pages inside the bio.** Rejected: the bio only routes visitors elsewhere.

## Consequences

- Changing the palette, fonts or background requires a code change and deploy.
- The existing Instagram handle field is replaced by the Social links list, so Instagram must be re-entered as a URL.
- Highlighting one Product over the others is deferred, not decided. Revisit before building any emphasis style.
- The PILAR link is undefined; its card stays hidden until it is filled in.
