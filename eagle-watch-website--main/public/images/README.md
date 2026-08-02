# /public/images

Real assets are committed here and referenced from `lib/data/content.ts` and
`components/Nav.tsx` / `app/layout.tsx`:

- `field-electric-fence.jpg` — electric fence install
- `field-gate-cabling.jpg` — gate cable routing
- `field-technician-work.jpg` — technician equipment work
- `field-cctv-mount.jpg` — CCTV sensor mount
- `og-cover.jpg` — 1200×630 Open Graph / social share image
- `eagle-watch-logo.svg` — traced vector logo; used in the nav bar and as the
  browser favicon (see `app/layout.tsx`)

Source photos are pre-optimized JPEGs at their native resolution; `next/image`
generates the smaller responsive AVIF/WebP sizes automatically at build/request
time — no manual resizing needed here.

To swap any of these for updated photography, keep the same filenames (or update
the references in `lib/data/content.ts`) and drop the new file in this folder.
