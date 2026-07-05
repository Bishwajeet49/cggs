---
name: cggs-page-builder
description: Builds CGGS 2027 website pages, routes, and portal screens following the project sitemap, design system, and data layer. Use when implementing any public page, delegate portal page, home section, layout, route, or Coming Soon placeholder for the CGGS 2027 summit website.
---

# CGGS Page Builder

## Before You Start

1. Read the target page in `00_CGGS_2027_Project_Knowledge_Base.md` (§5 Public or §6 Delegate inventory)
2. Check `current_task.md` for active sprint scope — do not implement pages outside current task unless explicitly asked
3. Confirm route exists in [reference.md](reference.md) route map

## Build Workflow

### Step 1 — Route & Layout

- Public pages → `src/app/(public)/` with `PublicLayout`
- Portal pages → `src/app/(portal)/portal/` with `DelegateLayout`
- Use Next.js App Router file-based routing matching KB §4

### Step 2 — Data Layer

1. Identify data models from page inventory (KB §5/§6)
2. Add/update types in `src/types/`
3. Add/update mock JSON in `public/mock-data/`
4. Create or extend service in `src/services/`
5. Page component calls service — never imports JSON

### Step 3 — UI Components

- Hero section on major pages (title, subtitle, breadcrumb, background)
- Reuse `src/components/ui/` (Button, Card, Badge, Form)
- Page-specific sections in `src/components/sections/`
- Follow Navy/White/Gold palette — see `02_DESIGN_SYSTEM.md`

### Step 4 — Coming Soon Placeholder

When page is out of current task scope:

- Render within correct layout (header/footer/sidebar intact)
- Show page title, brief description, and "Coming Soon" message
- Match premium government aesthetic — not a bare text stub

### Step 5 — Verify

- [ ] Responsive: mobile, tablet, desktop
- [ ] WCAG AA: keyboard nav, focus states, contrast
- [ ] No hardcoded business data in components
- [ ] Official logos from `public/logos/` where required
- [ ] Subtle Framer Motion animations only

## Home Page Sections

When building home page sections, follow `current_task.md` section list. Each section is a separate component in `src/components/sections/`.

## Schedule Pages

Schedule is shared data — one `events.json` powers public schedule, event detail, delegate schedule, and dashboard widgets. Use day tabs + timeline card pattern from design system.

## Delegate Portal

Sidebar uses grouped navigation:

- **Travel & Stay** → arrival, accommodation, transport
- **Event Hub** → fleet review, seminar, official events, village

## Additional Resources

- Route map & component checklist: [reference.md](reference.md)
- Full design spec: `02_DESIGN_SYSTEM.md`
- Data models: `03_DATA_MODELS.md`
