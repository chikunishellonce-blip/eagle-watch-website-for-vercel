# Eagle Watch Security — Website

Next.js 14 (App Router) + TypeScript + Tailwind rebuild of the static reference design,
with a working contact form, an interactive map, real image optimization, SEO, and
accessibility built in.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — design tokens live in `tailwind.config.ts`: a monochrome
  black/white/steel-grey palette (`ink`, `charcoal`, `steel`, `panel`, `paper`, etc.),
  with `signal` (dark grey, `#4A4A4A`) as the single accent used for CTAs, links,
  focus rings and active states. Type uses the system font stack
  (`font-display`/`font-body`/`font-mono` all resolve to `ui-sans-serif` /
  `ui-monospace` system fonts) — no external font files are loaded, so there's
  nothing to fetch and no font-swap flash.
- **Framer Motion** — nav menu transitions, hero entrance.
- **GSAP + ScrollTrigger** — scroll-driven section reveals (`components/ScrollReveal.tsx`),
  disabled automatically when the user has `prefers-reduced-motion` set.
- **Three.js** — a very light drifting-particle backdrop in the hero only
  (`components/HeroParticles.tsx`); capped particle count, pauses when the tab is
  hidden, skipped entirely under reduced motion.
- **React Hook Form + Zod** — contact form validation, shared between client and the
  API route (`lib/validations/contact.ts`).
- **Resend** — transactional email for the contact form (`lib/email.ts`,
  `app/api/contact/route.ts`).
- **Leaflet / OpenStreetMap** via `react-leaflet` — real interactive map, no API key
  required.

## Getting started

```bash
npm install
cp .env.example .env.local
# fill in RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL at minimum
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  layout.tsx        Fonts, global <head> metadata, Open Graph, skip-link
  page.tsx           Assembles all sections in order
  globals.css        Tailwind layers, focus states, reduced-motion overrides
  sitemap.ts         Dynamic sitemap.xml
  robots.ts          robots.txt
  api/contact/route.ts   Validates + emails contact submissions (rate-limited)
components/
  Nav.tsx, Hero.tsx, HeroParticles.tsx, TrustBar.tsx, About.tsx, Services.tsx,
  FieldLog.tsx, Industries.tsx, Technology.tsx, WhyUs.tsx, Contact.tsx,
  ContactForm.tsx, SiteMap.tsx, Footer.tsx, ScrollReveal.tsx
lib/
  data/             Typed content: services.ts, values.ts, content.ts
  validations/      contact.ts (Zod schema, shared client + server)
  email.ts          Resend send helper
```

## Content model (point 6 — CMS-ready)

All copy — services, EAGLE values, industries, technology, testimonials-equivalent
content, contact details — lives in typed data files under `lib/data/`, not hardcoded
in components. This means:

- A non-technical editor handoff today just means editing those `.ts` files (they're
  plain objects/arrays, no JSX).
- If you later want to edit content **without touching code**, the same shape maps
  cleanly onto:
  - **Sanity** — model `Service`, `EagleValue`, `FieldLogEntry` etc. as document
    types matching the `type` definitions already in `lib/data/*.ts`, then swap each
    data file's static export for a `sanityFetch()` call (Next.js `fetch` cache works
    out of the box with the App Router).
  - **WordPress (headless)** — expose the same fields via ACF + the REST or GraphQL
    API, and fetch them in the same spot.
  Either path is a data-layer swap only — no component changes required, since
  components only ever import from `lib/data/`.

## Contact form → email

The form posts JSON to `app/api/contact/route.ts`, which:
1. Applies a small in-memory rate limit (5 requests / 10 minutes / IP).
2. Re-validates with the same Zod schema used client-side.
3. Rejects (silently, for bots) if the honeypot field is filled.
4. Sends the enquiry via Resend to `CONTACT_TO_EMAIL`, replying-to the visitor's
   address.

The WhatsApp button next to "Send message" remains as a **secondary**, no-JS-required
path — it's no longer the only way to reach the company.

### Required environment variables

See `.env.example`. At minimum, set:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | From resend.com/api-keys |
| `CONTACT_FROM_EMAIL` | Verified sender address/domain in Resend |
| `CONTACT_TO_EMAIL` | Inbox that should receive enquiries |
| `NEXT_PUBLIC_SITE_URL` | Used for metadata, sitemap, OG tags |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | International format, no `+` or spaces |

## Map

`components/SiteMap.tsx` renders an interactive Leaflet/OpenStreetMap view centered on
1 Selous Avenue, Malvern Court, Harare. **The coordinates in `lib/data/content.ts`
(`lat`/`lng`) are an approximation** — replace them with the exact pin location before
launch (drop a pin in Google Maps or OpenStreetMap, copy the coordinates).

To switch to Google Maps instead: swap `SiteMap.tsx` for a Google Maps Embed API
`<iframe>` or the `@react-google-maps/api` package, and add
`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (already stubbed in `.env.example`).

## Images

Real field photos and the logo are committed under `public/images/` (see that folder's
README for what each filename is used for): four field-log photos, the Open Graph
share image (`og-cover.jpg`), and a traced vector logo (`eagle-watch-logo.svg`, used
in the nav and as the favicon). All raster images render through `next/image` with
`sizes` set per breakpoint, so Next.js generates and serves properly sized/responsive
AVIF/WebP variants. `next.config.mjs` has `images.dangerouslyAllowSVG` enabled so the
SVG logo can be optimized too.

## Accessibility

- Every interactive element (nav links, form fields, buttons, map) has a visible
  keyboard focus ring (`globals.css`).
- All GSAP/Framer/Three.js motion checks `prefers-reduced-motion` and either skips
  entirely (particles) or renders content already in its final state (scroll reveals).
- All photography has descriptive `alt` text (see `lib/data/content.ts`); decorative
  SVG icons are `aria-hidden`.
- Skip-to-content link at the top of `layout.tsx`.

## SEO

- Per-page `Metadata` in `app/layout.tsx`: title template, description, keywords,
  Open Graph + Twitter card images.
- `app/sitemap.ts` and `app/robots.ts` generate `sitemap.xml` / `robots.txt`
  automatically from `NEXT_PUBLIC_SITE_URL`.
- Semantic landmarks: `<header>`, `<main>`, `<section>` per content block, `<footer>`.

## Fixes applied in this pass

- **Section navigation was broken.** The homepage only ever mounts one section at a
  time (`app/page.tsx` swaps sections based on an "active section" state), but the
  Hero's "Request a Quote" button and the Footer's "Services" / "Industries" /
  "Request a quote" links used plain `href="#id"` anchors — which only work if that
  section happens to already be in the DOM. They're now wired through
  `components/NavigationContext.tsx`, a small shared context that Nav, Hero, and
  Footer all read/write, so every link reliably switches to (and scrolls to) the
  right section from anywhere on the site.
- **Real field photos, OG image, and a traced vector logo** replace the grey
  placeholder images. The old space-containing filename `eagle watch badge.png` was
  replaced by `eagle-watch-logo.svg` (also now used for the browser favicon, since no
  `favicon.ico` existed in the repo).
- **Stale SEO artifacts removed.** `public/sitemap.xml`, `public/sitemap-0.xml`, and
  `public/robots.txt` were committed build output from `next-sitemap` and hardcoded
  `http://localhost:3000`. Since `app/sitemap.ts` and `app/robots.ts` already generate
  these dynamically and correctly from `NEXT_PUBLIC_SITE_URL`, the static files, the
  `next-sitemap` dependency, its config file, and its `postbuild` script were removed
  as redundant.
- An unreferenced stray logo PNG at the project root was removed.
- Run `npm install` once after pulling this to let it prune `next-sitemap` from
  `package-lock.json`.

## Deployment (Vercel)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel: **New Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add the environment variables from `.env.example` under
   **Project Settings → Environment Variables** (Production + Preview).
5. Deploy. Vercel builds with `next build` and serves the App Router output,
   including the `/api/contact` route as a serverless function.
6. Point your domain's DNS at Vercel (Project Settings → Domains), then update
   `NEXT_PUBLIC_SITE_URL` to match and redeploy so metadata/sitemap URLs are correct.

No other infrastructure is required — Resend and OpenStreetMap tiles are called
directly from the deployed app.
