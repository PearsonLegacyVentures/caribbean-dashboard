
# PLV Site Starter — Architecture Plan

## Design Philosophy
Premium, restrained, editorial. Inspired by top agency sites (Ramotion, Pentagram, Linear) — not generic SaaS templates. Warm neutral palette that feels expensive. Clean whitespace. Strong typographic hierarchy. Conversion-aware without being pushy.

---

## 1. Design System

### Color Palette (Warm Neutral + Accent)
- **Background**: Warm off-white `40 20% 98%` (not pure white)
- **Foreground**: Deep charcoal `220 20% 10%`
- **Primary**: Rich warm black `220 15% 12%` (buttons, headlines)
- **Accent**: Warm amber `38 92% 50%` (highlights, CTAs, badges)
- **Muted**: Soft warm gray `220 10% 94%` (cards, sections)
- **Border**: Subtle warm gray `220 10% 88%`
- Custom tokens: `--section-spacing`, `--content-width`, `--narrow-width`

### Typography
- **Headings**: Inter (tight tracking, strong weight hierarchy)
- **Body**: Inter (clean, professional)
- Display: 4xl-7xl with tight leading
- Body: base-lg with relaxed leading
- Micro: xs-sm for labels, badges

### Spacing System
- Section padding: `py-20 md:py-28 lg:py-32`
- Container: max-w-7xl (1280px)
- Narrow content: max-w-3xl (768px) for readability
- Component gaps: consistent 6/8/12/16 scale

### Component Variants Needed
- Button: `default`, `outline`, `ghost`, `accent`, `hero` (large)
- Badge: `default`, `outline`, `accent`
- Card: elevation variants

---

## 2. Component Architecture

### Layout (`src/components/layout/`)
- `Navbar.tsx` — Sticky, minimal, mobile drawer, CTA button
- `Footer.tsx` — Multi-column links, newsletter, legal
- `PageLayout.tsx` — Wraps pages with Navbar + Footer
- `Section.tsx` — Reusable section wrapper with spacing variants
- `Container.tsx` — Max-width container

### Blocks (`src/components/blocks/`)
- `HeroSection.tsx` — Props: headline, subheadline, cta, variant (centered/left-aligned)
- `SectionHeading.tsx` — Eyebrow + heading + description
- `TrustStrip.tsx` — Logo/brand bar
- `FeatureGrid.tsx` — 2-4 column feature cards
- `ProcessSteps.tsx` — Numbered steps with icons
- `TestimonialSection.tsx` — Quote cards
- `FAQSection.tsx` — Accordion-based
- `CTABlock.tsx` — Full-width conversion block
- `StatsRow.tsx` — Key metrics display
- `CaseStudyCard.tsx` — Work portfolio card
- `ServiceCard.tsx` — Service overview card
- `ContactForm.tsx` — Lead capture form
- `NewsletterForm.tsx` — Email capture
- `ComparisonTable.tsx` — Feature comparison

---

## 3. Pages

| Page | Route | Key Sections |
|------|-------|-------------|
| Home | `/` | Hero → Trust → Services → Benefits → Work → Process → Testimonials → FAQ → CTA |
| About | `/about` | Story hero → Values → Team → Timeline → CTA |
| Services | `/services` | Hero → Service details → Comparison → CTA |
| Work | `/work` | Hero → Case study grid → CTA |
| Contact | `/contact` | Split form + info layout |
| 404 | `*` | Branded error page |

---

## 4. Copy Strategy
- Industry-neutral but commercially sharp
- Placeholder brand: "Studio" (generic enough)
- Headlines that demonstrate hierarchy, not specific claims
- Easy to find-and-replace

---

## 5. SEO Structure
- Semantic HTML (single H1 per page, proper heading cascade)
- Default meta title/description per page
- OG image placeholder
- JSON-LD Organization schema on home
- Lazy-loaded images
- Responsive viewport meta

---

## 6. File Structure
```
src/
├── components/
│   ├── layout/      (Navbar, Footer, PageLayout, Section, Container)
│   ├── blocks/      (All reusable content blocks)
│   └── ui/          (shadcn primitives)
├── pages/           (Home, About, Services, Work, Contact, 404)
├── lib/             (utils, site config/content)
├── assets/          (generated images)
└── hooks/
```

---

## Implementation Order
1. Design system (CSS + Tailwind config)
2. Layout components (Navbar, Footer, Section, Container, PageLayout)
3. All reusable blocks
4. Home page (assembled from blocks)
5. Remaining pages
6. SEO + meta
7. Final polish
