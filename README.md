# Kilicare Adventure

A Tanzania travel website built with Next.js 16, React 19, TypeScript, GSAP and plain CSS.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
pnpm lint
pnpm build
pnpm start
```

## Project structure

- `src/app/page.tsx` contains the homepage sections.
- `src/data/site.ts` contains sample destinations, package prices, stats, reviews and FAQ copy.
- `src/components/Hero.tsx` contains the GSAP and ScrollTrigger mountain scene.
- `public/img` contains the locally stored landscape photographs used by the site.

Prices, stats and traveller stories are sample content and must be replaced with verified Kilicare information. The enquiry form is a front-end preview; it does not send or store submissions yet.
