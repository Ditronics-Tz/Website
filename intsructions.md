Ultimate Ditronics UI Generation Prompt (expanded)
Goal — high-level

Build a clean, modern enterprise landing site for Ditronics inspired by Zapier’s clarity and human-forward energy. Focus on B2B trust, scalability, and a crisp UX. Site is immersive but minimal — hero → services → studio → laptops → pricing → contact. No ecommerce flows; laptop pages show specs and prices only.

Target stack:

Next.js 14+ (App Router, Server Components, React Server Actions)

Tailwind CSS v3+ (utility-first) + shadcn/ui components

Headless CMS: Sanity.io OR Payload CMS (support both schemas)

Animations: Framer Motion for micro-interactions

Auth for /admin: NextAuth.js (email & org SSO ready)

Images: next/image with lazy loading + optimized sizes

Deploy: Vercel (production-ready)

SEO: next-seo (site-level & per-page)

Tone & UX:

Minimal, generous whitespace, calm efficiency.

12-column CSS grid, responsive breakpoints:

<640px: stacked single column

640–1024px: two-column layouts

1024px: full multi-column grid

Neutral palette with Zapier-inspired accents (use sparingly).

Accessibility: WCAG AA, keyboard navigation, visible focus, reduced-motion support.

Micro-interactions: 200–300ms ease-in-out; subtle hover color shifts.

DESIGN SYSTEM (explicit rules)
Colors (Zapier palette — use sparingly)

Primary (CTA): #FF4A00 (vermillion)

Secondary / badges: #FD7622 (pumpkin)

Callout / success: #FFC43E (sunny yellow)

Body text / neutral: #5F6C72 (neutral gray)

Links / interactive: #499DF3 (trust-blue)

Feature/positive accent: #13D0AB (teal-green)

Backgrounds: #FFFFFF (white) and section fill #FFFDF9 (off-white)

Headings / dark anchor: #201515 (near-black)

Subtle card shadow: 0 1px 3px rgba(0,0,0,0.08)

Typography

Primary: Degular (if licensing unavailable: fallback Inter).

Body: Degular Regular — base 16px, line-height: 1.5

Small/captions: 14px, line-height: 1.4

Subhead: Degular Semibold

Headings: Degular Bold — h1 clamp: clamp(2rem,5vw,3rem)

Use clamp() for fluid typography across breakpoints.

Spacing & Layout

Grid: 12-column CSS grid with consistent gutter.

Spacing scale (multiples of 4px): 4px, 8px, 16px, 24px, 32px, 64px

Component radii: 8px (cards, buttons)

Focus outlines: 2px solid #499DF3 visible on keyboard focus.

Icons

Use line icons (Heroicons or custom Zapier-like set)

Sizes: 24px or 32px

Default color: neutral gray; accent colors only for highlights.

Motion

Duration: 200–300ms, easing cubic-bezier(.2,.9,.2,1) (gentle)

Use prefers-reduced-motion to disable/scale down animations.

Information Architecture (pages)

/ — Landing (hero, trust logos, services, featured laptops, testimonials, CTA)

/services — full service catalog + tiers

/studio — portfolio projects (CMS-driven)

/laptops — filterable laptop showcase (no cart)

/pricing — editable tiers

/about — company story

/contact — contact form (Server Action → email)

/admin — CMS previews & editors (protected)

/sitemap.xml + /robots.txt + Open Graph metadata

CMS MODELS (Sanity + Payload versions)
SANITY (schema examples)

1. globalSettings.js (singleton)

export default {
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    {name: 'siteTitle', type: 'string'},
    {name: 'favicon', type: 'image'},
    {name: 'logo', type: 'image'},
    {name: 'defaultSEO', type: 'object', fields: [
      {name: 'metaTitle', type: 'string'},
      {name: 'metaDescription', type: 'text'},
      {name: 'ogImage', type: 'image'}
    ]},
    {name: 'socialLinks', type: 'array', of: [{type: 'object', fields:[
      {name:'platform',type:'string'},
      {name:'url',type:'url'}
    ]}]}
  ]
}


2. hero.js

export default {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    {name:'tagline', type:'string', description:'Optimize Your Tech with Ditronics'},
    {name:'subtext', type:'text'},
    {name:'ctaPrimary', type:'object', fields:[{name:'label',type:'string'},{name:'href',type:'string'}]},
    {name:'ctaSecondary', type:'object', fields:[{name:'label',type:'string'},{name:'href',type:'string'}]},
    {name:'bgImage', type:'image'}
  ]
}


3. service.js

export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {name:'title', type:'string'},
    {name:'slug', type:'slug'},
    {name:'description', type:'text'},
    {name:'icon', type:'image'},
    {name:'priceTier', type:'string', options:{list:['Starter','Pro','Enterprise']}},
    {name:'features', type:'array', of:[{type:'string'}]},
    {name:'ctaLabel', type:'string'}
  ]
}


4. project.js (studio)

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {name:'title', type:'string'},
    {name:'slug', type:'slug'},
    {name:'client', type:'string'},
    {name:'date', type:'datetime'},
    {name:'coverImage', type:'image'},
    {name:'gallery', type:'array', of:[{type:'image'}]},
    {name:'specs', type:'object', fields:[
      {name:'stack', type:'array', of:[{type:'string'}]},
      {name:'outcome', type:'text'}
    ]},
    {name:'excerpt', type:'text'}
  ]
}


5. laptop.js

export default {
  name: 'laptop',
  title: 'Laptop',
  type: 'document',
  fields: [
    {name:'name', type:'string'},
    {name:'slug', type:'slug'},
    {name:'price', type:'number'},
    {name:'currency', type:'string', initialValue:'USD'},
    {name:'specs', type:'object', fields:[
      {name:'cpu', type:'string'},
      {name:'ram', type:'string'},
      {name:'storage', type:'string'},
      {name:'gpu', type:'string'},
      {name:'os', type:'string'}
    ]},
    {name:'images', type:'array', of:[{type:'image'}]},
    {name:'stockStatus', type:'string', options:{list:['In Stock','Limited','Out of Stock']}},
    {name:'notes', type:'text'}
  ]
}


6. testimonial.js

export default {
  name:'testimonial',
  title:'Testimonial',
  type:'document',
  fields:[
    {name:'quote', type:'text'},
    {name:'author', type:'string'},
    {name:'title', type:'string'},
    {name:'companyLogo', type:'image'},
    {name:'metrics', type:'string'}
  ]
}


7. pricingTier.js (for /pricing)

export default {
  name:'pricingTier',
  title:'Pricing Tier',
  type:'document',
  fields:[
    {name:'name', type:'string'},
    {name:'price', type:'string'},
    {name:'features', type:'array', of:[{type:'string'}]},
    {name:'cta', type:'object', fields:[{name:'label',type:'string'},{name:'href',type:'string'}]},
  ]
}

PAYLOAD CMS (schema summaries)

(Provide JSON-like schema objects; naming equivalent to Sanity)

collections: globalSettings, hero, services, projects, laptops, testimonials, pricingTiers

enable rich text fields in about collection

add admin UI customizations: reorderable arrays for services & laptops

Project File Structure (suggested)
ditronics/
├─ app/
│  ├─ layout.tsx
│  ├─ globals.css
│  ├─ page.tsx           // Home
│  ├─ services/
│  │  └─ page.tsx
│  ├─ studio/
│  │  └─ page.tsx
│  ├─ laptops/
│  │  └─ page.tsx
│  ├─ pricing/
│  │  └─ page.tsx
│  ├─ contact/
│  │  └─ page.tsx
│  └─ admin/
│     └─ layout.tsx
├─ components/
│  ├─ ui/                // shadcn/ui components overrides
│  ├─ Hero.tsx
│  ├─ ServicesGrid.tsx
│  ├─ ServiceCard.tsx
│  ├─ LaptopCard.tsx
│  ├─ ProjectCard.tsx
│  ├─ Testimonials.tsx
│  ├─ Footer.tsx
│  ├─ Navbar.tsx
│  └─ ContactForm.server.tsx  // Server Action
├─ lib/
│  ├─ sanity.ts
│  ├─ payload.ts
│  └─ fetcher.ts
├─ public/
│  └─ images/
├─ prisma/ (optional if you want local DB for admin preview)
├─ scripts/
│  └─ seed.ts
├─ tailwind.config.cjs
├─ postcss.config.js
├─ next.config.js
├─ package.json
├─ README.md

Tailwind Config (with Zapier colors & typography)

tailwind.config.cjs (core excerpt)

module.exports = {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        vermilion: '#FF4A00',
        pumpkin: '#FD7622',
        sunny: '#FFC43E',
        neutralText: '#5F6C72',
        trustBlue: '#499DF3',
        tealGreen: '#13D0AB',
        offWhite: '#FFFDF9',
        anchorDark: '#201515'
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08)'
      },
      borderRadius: {
        md: '8px'
      },
      fontFamily: {
        degular: ['Degular', 'Inter', 'system-ui', 'sans-serif']
      },
      transitionTimingFunction: {
        'gentle': 'cubic-bezier(.2,.9,.2,1)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    // shadcn UI plugin if present
  ]
}


Global CSS (app/globals.css) — include prefers-reduced-motion:

:root{
  --base-line: 1.5;
}
html { scroll-behavior: smooth; }
* { box-sizing: border-box; }
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}

Example Next.js Components (short, runnable sketches)
app/layout.tsx
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ditronics — Optimize Your Tech',
  description: 'OS downgrades, custom builds, and enterprise hardware solutions.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-white text-neutralText'}>
        <header>{/* Navbar component */}</header>
        <main>{children}</main>
        <footer>{/* Footer component */}</footer>
        <Analytics />
      </body>
    </html>
  )
}

Hero (component)

Large heading Optimize Your Tech with Ditronics

Subtext: benefits bullets (reduce TCO, custom hardware & OS support)

CTA primary: /services (vermillion button)

CTA secondary: /laptops (outlined)

Accessibility:

aria-label on CTAs

headings h1 in semantic order

Contact Form — Server Action (example)

components/ContactForm.server.tsx

'use server'
import { sendEmail } from '@/lib/email' // implement with nodemailer or external SMTP
export async function contactAction(formData: FormData) {
  "use server"
  const name = formData.get('name')?.toString() ?? ''
  const email = formData.get('email')?.toString() ?? ''
  const message = formData.get('message')?.toString() ?? ''
  // validate server-side: simple checks
  if (!email || !message) throw new Error('Missing fields')

  await sendEmail({
    to: process.env.CONTACT_EMAIL,
    subject: `New contact from ${name || 'Unknown'}`,
    text: `${message}\n\nFrom: ${email}`
  })
  return { success: true }
}


In app/contact/page.tsx:

import { contactAction } from '@/components/ContactForm.server'
export default function ContactPage() {
  return (
    <form action={contactAction} className="max-w-2xl mx-auto p-6">
      <label htmlFor="name">Name</label>
      <input id="name" name="name" />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" required />
      <button type="submit" className="bg-vermilion hover:bg-[#E64100] text-white">Send</button>
    </form>
  )
}

Laptops page — behavior & filters

Filter by CPU, RAM, stock status

Use client-side interactivity (React Server Component for initial data + client component for filtering)

Laptop card includes: hero image (next/image), price, small specs, stock badge, CTA View Details

Laptop detail modal or separate page /laptops/[slug] with full spec sheet.

Studio (portfolio)

Grid with masonry-like behavior (CSS grid with grid-auto-rows)

Project page with gallery carousel (framer-motion + accessible controls)

CMS fields: client, outcome, stack, images

Accessibility Checklist (baked into build)

All images have alt from CMS fields

Buttons and interactive elements have aria-label where label not visible

Keyboard navigation: tabbable order, visible focus (2px #499DF3)

Color contrast >= 4.5:1 for text vs background

Landmarks: <header>, <main>, <footer>, <nav>

Semantic headings h1...h6 in order

prefers-reduced-motion support (CSS/JS)

Forms: proper field labels + server-side validation

SEO & Social (next-seo)

next-seo.config.ts with default Open Graph and Twitter card

Per-page metadata from CMS (title + description + ogImage)

Sitemaps via next-sitemap on build

Performance & Rendering strategy

Home: ISR (revalidate: 60) to allow near-real-time CMS updates

Studio pages: SSR or ISR depending on update frequency

Laptops: ISR with short revalidate for inventory changes

Use next/image with sizes & priority for hero image

Lazy load non-critical images; preload fonts for largest text visibility

NextAuth & Admin

/admin route: protect with NextAuth (Email + OAuth)

After login, show CMS preview links; allow admin to open CMS (Sanity/Payload) in separate tab or embedded iframe preview

Add simple role check: isAdmin coerced from provider profile or allow-list of emails in server ENV

Framer Motion: micro-interactions

Hero CTA: slight scale on hover (0.98 → 1)

Section reveal: fade+up on scroll (staggered for lists)

Use whileInView and viewport={{ once: true }} to avoid repeated animations

Respect prefers-reduced-motion

Testing & CI

Unit: Jest + React Testing Library for components

E2E: Playwright tests for main flows (contact form, laptop filter, studio gallery)

CI: GitHub Actions – build, typecheck, run tests, then Vercel deploy on main branch

Sample GitHub Action:

name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run build
      - run: npm test

Sample seed data (small)

Hero:

tagline: "Optimize Your Tech with Ditronics"

subtext: "Reduce downtime, customize OS, and scale hardware with enterprise-grade support."

ctas: Get Services, View Laptops

Service: OS Downgrade

title: "OS Downgrades & Legacy Support"

desc: "Safe, compliant downgrades for legacy apps—zero data loss guaranteed."

priceTier: Enterprise

Laptop: Dell XPS 15 (Custom)

price: 1699

specs: CPU: Intel i7-13700H, RAM: 32GB, Storage: 1TB NVMe, GPU: RTX 4060, OS: Windows 11 Pro / Custom Linux builds

stockStatus: In Stock

Project: Enterprise Migration

client: "FinCo"

excerpt: "Migrated 2000 desktops to a stable custom image reducing incidents by 42%."

README (starter)

README.md should include:

Project overview and design goals

Local dev: pnpm install → pnpm dev

Environment variables: NEXT_PUBLIC_*, SANITY_PROJECT_ID, PAYLOAD_URL, NEXTAUTH_URL, CONTACT_EMAIL, SMTP_CREDENTIALS

CMS setup quickstart: link to Sanity/Payload config + how to seed

Deployment: Vercel instructions (set env vars, build command next build, output next start or Vercel default)

Accessibility & testing notes

Contribution conventions (commitlint, PR reviews)

Security & Ops notes

Don’t store secrets in repo; use Vercel/CICD secrets

Rate-limit contact endpoint; sanitize inputs to avoid injection

CORS only for known admin origins for preview endpoints

Implementation checkpoints (Milestones)

Baseline: nav, hero, footer, globals, tailwind

Services grid & CMS connection

Laptops list + filter (client filtering)

Studio gallery & project pages

Contact server action + email sending

Admin/Auth integration

Accessibility pass + testing, deployment to Vercel

Example tailwind utilities & helper classes

.container centered max-width with padding

.card = rounded-md shadow-card bg-white p-4

.badge-instock = bg-teal-50 text-teal-700 font-semibold px-2 py-1 rounded

Deliverables (what to hand off)

Full Next.js repo (app router) with components, pages, and server actions

Tailwind config and global CSS

Sanity & Payload schema files + seed script

README with setup & deploy steps

Example env file .env.example

Accessibility checklist & test plan