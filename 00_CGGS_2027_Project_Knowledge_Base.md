# CGGS 2027 Website – Global Knowledge Base

**Project:** 5th Coast Guard Global Summit (CGGS 2027)
**Event:** International Coast Guard Fleet Review & World Coast Guard Seminar
**Host:** Indian Coast Guard, Ministry of Defence, Government of India
**Venue:** Chennai, India
**Timeline:** 3-Day International Summit (Feb 2027)
**Current Phase:** UI Prototype (Frontend Only — Phase 1)

> **Start here.** This document is the master reference for agents and developers. Detailed specs live in linked docs below.

---

# 0. Quick Reference

| Item | Value |
|------|-------|
| **Active task** | [`current_task.md`](current_task.md) — Layout, routing, home page |
| **Stack** | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion |
| **Data pattern** | Components → `services/` → `public/mock-data/*.json` |
| **Route prefix (delegate)** | `/portal/*` |
| **Design palette** | Navy Blue, White, Gold |
| **Path alias** | `@/*` → `src/*` |

### Documentation Index

| Doc | Purpose |
|-----|---------|
| `00_CGGS_2027_Project_Knowledge_Base.md` | Master reference (this file) |
| `01_PROJECT_OVERVIEW.md` | Project goals & principles |
| `02_DESIGN_SYSTEM.md` | Full visual design spec |
| `03_DATA_MODELS.md` | JSON schemas & service layer |
| `04_APPLICATION_STRUCTURE.md` | Sitemap & user flows |
| `about_cggs.md` | Domain & historical context |
| `current_task.md` | Active sprint task |
| `AGENTS.md` | Agent orientation pointer |

---

# 1. Domain Context

The **Coast Guard Global Summit (CGGS)** is the premier international multilateral forum for cooperation among the world's coast guards and maritime law enforcement agencies. Originally conceived in 2017 by the Japan Coast Guard, it addresses global maritime challenges through collective diplomacy.

### Mission

Safeguard the global ocean environment, improve international maritime governance, and ensure safer, cleaner, and more secure seas.

### Participating Members

- **115+ countries and international organisations**
- **Secretariat:** Japan Coast Guard (permanent)
- Global footprint across Asia, Europe, the Americas, and Africa

### Core Agenda Pillars

- Maritime Safety & Emergency Response (M-SAR)
- Marine Environment Protection
- Law Enforcement (piracy, trafficking, IUU fishing)
- Interoperability & Capacity Building (MDA, training)

### CGGS 2027 — 5th Edition

| Attribute | Details |
|-----------|---------|
| **Location** | Chennai, India (ICG Eastern Regional HQ) |
| **Duration** | 3-day comprehensive event |
| **Significance** | ICG Golden Jubilee (50 years, est. Feb 1, 1977) |
| **Presidency** | India assumes CGGS Presidency from Italy/Japan |

### Why Chennai

Chennai houses the strategic Eastern Regional Headquarters of the Indian Coast Guard — an ideal hub demonstrating India's **SAGAR** (*Security and Growth for All in the Region*) initiative.

### Three-Day Pillars

1. **World Coast Guard Seminar** — Strategic roundtables, policy frameworks, bilateral action plans
2. **International Coast Guard Fleet Review** — Ships, aircraft, and vessels from participating nations off the Chennai coast
3. **Golden Jubilee Celebrations** — 50 years of the Indian Coast Guard

### Historical Timeline

| Year | Host | Notes |
|------|------|-------|
| 2017 | Tokyo, Japan | Inaugural summit |
| 2025 | Rome, Italy | First hosted outside Japan; co-chaired by Italy & Japan |
| 2027 | Chennai, India | 5th CGGS; South Asia expansion |

---

# 2. Tech Stack & Repo Conventions

### Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS 4, Framer Motion
- **Language:** TypeScript (strict mode)
- **Data:** JSON mock files via service layer (future REST API swap)

### Recommended Folder Structure

```
src/
├── app/
│   ├── (public)/              # Public layout group
│   ├── (portal)/              # Delegate portal layout group
│   └── layout.tsx
├── components/
│   ├── layout/                # Header, Footer, Sidebar, MobileNav
│   ├── ui/                    # Button, Card, Form, Badge
│   └── sections/              # Home page sections
├── services/                  # Data access — never import JSON in components
├── types/                     # TypeScript interfaces matching data models
└── lib/                       # Utilities, constants, design tokens

public/
├── mock-data/                 # All JSON mock API responses
├── logos/                     # Official summit, ICG, MoD logos
└── banners/                   # Official hero carousel banners
```

### Development Principles

- Component-driven architecture
- Reusable UI components
- Mock-data driven development
- API-ready architecture (service layer abstraction)
- Accessibility first (WCAG AA)
- Mobile first, responsive on all devices
- **Never hardcode business data in components**

---

# 3. Website Architecture

```
CGGS Website
│
├── Public Website          (route group: (public))
│
└── Delegate Portal         (route group: (portal), after login)
```

### User Flow

```
Visitor → Home → Explore → Registration → Success → Login → Dashboard
                                                              ↓
                                              My Schedule / Travel & Stay / Event Hub
```

---

# 4. Canonical Route Map

**Convention:** Public routes at root. Delegate portal routes under `/portal/*`.

### Public Routes

| Route | Page | Status (Phase 1 Task 1) |
|-------|------|-------------------------|
| `/` | Home | **Implement fully** |
| `/about-cggs` | About CGGS | Coming Soon |
| `/about-icg` | About Indian Coast Guard | Coming Soon |
| `/schedule` | Event Schedule (Day 1/2/3 tabs) | Coming Soon |
| `/schedule/[eventId]` | Event Detail | Coming Soon |
| `/fleet-review` | International Fleet Review | Coming Soon |
| `/seminar` | World Coast Guard Seminar | Coming Soon |
| `/village` | Exhibition Village | Coming Soon |
| `/accommodation` | Accommodation & Travel | Coming Soon |
| `/media` | Media & Gallery | Coming Soon |
| `/contact` | Contact | Coming Soon |
| `/register` | Delegate Registration | Coming Soon |
| `/register/success` | Registration Success + QR preview | Coming Soon |
| `/login` | Delegate Login | Coming Soon |

### Delegate Portal Routes (`/portal/*`)

| Route | Page | Nav Group | Status |
|-------|------|-----------|--------|
| `/portal/dashboard` | Dashboard | — | Coming Soon |
| `/portal/schedule` | My Schedule | — | Coming Soon |
| `/portal/registration` | My Registration | — | Coming Soon |
| `/portal/travel/arrival` | Arrival & Departure | Travel & Stay | Coming Soon |
| `/portal/travel/accommodation` | Accommodation | Travel & Stay | Coming Soon |
| `/portal/travel/transport` | Transport | Travel & Stay | Coming Soon |
| `/portal/events/fleet-review` | Fleet Review | Event Hub | Coming Soon |
| `/portal/events/seminar` | Seminar | Event Hub | Coming Soon |
| `/portal/events/official` | Official Events (dinners, parade, gala) | Event Hub | Coming Soon |
| `/portal/events/village` | Exhibition Village | Event Hub | Coming Soon |
| `/portal/downloads` | Downloads | — | Coming Soon |
| `/portal/notifications` | Notifications | — | Coming Soon |
| `/portal/profile` | Profile | — | Coming Soon |

> **Navigation note:** Delegate sidebar uses grouped nav (*Travel & Stay*, *Event Hub*) per `04_APPLICATION_STRUCTURE.md`. Sub-pages (City Parade, Tours/Spouse Programme) live under *Official Events*.

Non-Home public routes and all portal routes render a polished **Coming Soon** placeholder during Phase 1 Task 1, while preserving layout and routing.

---

# 5. Public Website — Page Inventory

Accessible by everyone. Uses `PublicLayout` (sticky header, footer, mobile sidebar).

| Page | Key Content | Data Models |
|------|-------------|-------------|
| **Home** | Hero carousel, countdown, Golden Jubilee, stats, key events, 3-day overview, speakers, nations, fleet/seminar/village highlights, news, gallery preview, venue, registration CTA, partners, contact | `events`, `speakers`, `countries`, `news`, `gallery`, `fleet-review` |
| **About CGGS** | History, editions, timeline, objectives, why India/Chennai, vision | Static + `about_cggs.md` content |
| **About ICG** | Role, mission, history, Golden Jubilee, DG message | Static content |
| **Event Schedule** | Day tabs, timeline, session cards | `events` |
| **Event Detail** | Title, description, time, venue, speakers, gallery, documents | `events`, `speakers` |
| **Fleet Review** | Overview, nations, ships, gallery, programme | `fleet-review`, `countries` |
| **Seminar** | Themes, sessions, speakers, venue | `speakers`, `events` |
| **Exhibition Village** | Layout, cultural zone, defence exhibition, activities | Static + mock data |
| **Accommodation & Travel** | Hotels, airport, transport, FAQs | `accommodation` |
| **Media & Gallery** | Photos, videos, press releases, news | `gallery`, `news` |
| **Contact** | Secretariat, form, committee details | Static content |
| **Registration** | Multi-step form by category | `registration` |
| **Registration Success** | Confirmation, delegate ID, QR pass preview | `registration` |
| **Login** | Delegate login UI (mock redirect to dashboard) | — |

### Home Page Sections (Phase 1 Task 1)

Hero carousel · Countdown · Golden Jubilee · Welcome · Summit statistics · Key events · Three-day overview · Featured speakers · Participating nations · Fleet Review highlight · Seminar highlight · Exhibition Village · Latest news · Gallery preview · Venue · Registration CTA · Partners · Contact preview

---

# 6. Delegate Portal — Page Inventory

Accessible after login. Uses `DelegateLayout` (top nav, sidebar, main content).

### Navigation Structure (Grouped)

```
Dashboard
My Schedule
My Registration
Travel & Stay
  ├── Arrival & Departure
  ├── Accommodation
  └── Transport
Event Hub
  ├── Fleet Review
  ├── Seminar
  ├── Official Events (dinners, city parade, gala, tours/spouse programme)
  └── Exhibition Village
Downloads
Notifications
Profile
Logout
```

| Page | Key Content | Data Models |
|------|-------------|-------------|
| **Dashboard** | Welcome, QR pass, today's events, upcoming, notifications, weather, quick links | `delegates`, `events`, `notifications`, `registration` |
| **My Schedule** | Personalized 3-day itinerary with event cards | `events`, `delegates` |
| **My Registration** | Summary, category, approval status, QR pass | `registration`, `delegates` |
| **Arrival & Departure** | Flight, terminal, pickup, liaison officer | `delegates`, `transport` |
| **Accommodation** | Hotel, room, check-in/out, map | `accommodation` |
| **Transport** | Vehicle, driver, pickup timing, meeting point | `transport` |
| **Fleet Review** | Viewing area, programme, ship details, instructions | `fleet-review` |
| **Seminar** | Registered sessions, speakers, seat allocation | `speakers`, `events` |
| **Official Events** | Dinners, gala, city parade, tours/spouse programme | `events` |
| **Exhibition Village** | Map, activities, stalls, timings | Static + mock data |
| **Downloads** | Handbook, programme, maps, emergency contacts | `downloads` |
| **Notifications** | Announcements, schedule changes, alerts | `notifications` |
| **Profile** | Personal details, passport, contact, photo | `delegates` |

---

# 7. Event Schedule Data Structure

The summit is a **3-Day Event**. Same schedule data powers:

- Public Event Schedule
- Event Details
- Delegate Dashboard
- My Schedule

### Day Model

```
Theme, Date, Events[]
```

### Event Model

```
event_id, start_time, end_time, title, description, location/venue,
type/event_type, speakers[], images[]
```

### Example Flow

```
Day 1 → Theme: Global Maritime Diplomacy
  09:30 Opening Ceremony
  11:30 World Coast Guard Seminar
  13:00 Lunch
  14:30 Panel Discussion
  19:00 Welcome Dinner
```

Mock data source: `public/mock-data/events.json` (migrate from root `events_schedule.json` during implementation).

---

# 8. Data Models Index

All data accessed via **service layer** — components never import JSON directly.

| JSON File | Key Fields | Used In |
|-----------|------------|---------|
| `events.json` | summit, days, themes, events, speakers, venue | Schedule, dashboard, event detail |
| `speakers.json` | name, photo, designation, org, country, bio, sessions | Seminar, event detail |
| `fleet-review.json` | ships, images, country, ship type, fleet events | Fleet Review |
| `countries.json` | country, flag, delegation, participants | Fleet Review, nations map |
| `delegates.json` | name, country, org, category, passport, photo, contact | Dashboard, profile |
| `registration.json` | reg number, category, status, QR pass, approval | Registration, dashboard |
| `accommodation.json` | hotel, room, check-in/out, address, contact | Portal travel |
| `transport.json` | vehicle, driver, pickup time/location, contact | Portal travel |
| `notifications.json` | title, message, priority, date, type | Dashboard, notifications |
| `gallery.json` | images, videos, albums, category | Media |
| `news.json` | title, date, thumbnail, summary, content | Home, media |
| `downloads.json` | handbook, brochure, maps, PDFs | Portal downloads |

### Conventions

- IDs: `event_id`, `speaker_id`, `country_id`, `delegate_id`, `hotel_id`, `vehicle_id`, `gallery_id`
- Dates: ISO format (`2027-02-15`)
- Times: 24-hour format (`09:30`)
- Human-readable JSON; avoid duplicated information
- Structure responses like future REST payloads

### Future API Mapping

| Mock JSON | Future API |
|-----------|------------|
| `events.json` | `GET /api/events` |
| `speakers.json` | `GET /api/speakers` |
| `delegates.json` | `GET /api/delegates/me` |

See [`03_DATA_MODELS.md`](03_DATA_MODELS.md) for full details.

---

# 9. Design Tokens Quick Reference

Full spec: [`02_DESIGN_SYSTEM.md`](02_DESIGN_SYSTEM.md)

### Color Palette

| Token | Usage | CSS Variable (to define) |
|-------|-------|--------------------------|
| **Navy Blue** | Header, nav, footer, hero overlays, primary buttons | `--color-navy` |
| **White** | Backgrounds, cards, sections, forms | `--color-white` |
| **Gold** | Highlights, Golden Jubilee, active states, accent actions | `--color-gold` |
| Light Gray | Section backgrounds | `--color-gray-light` |
| Dark Gray | Body text | `--color-gray-dark` |
| Success / Warning / Error / Info | Status feedback | `--color-success`, etc. |

### Typography

- Headings: Bold, large, strong hierarchy
- Body: Medium weight, comfortable spacing
- Buttons: Semi-bold

### Grid

- Desktop: 12 columns · Tablet: 8 · Mobile: 4

### Motion

- Subtle fade, slide, scale (Framer Motion)
- Avoid: bounce, elastic, long animations, spinning effects

### Anti-Patterns (Do NOT Use)

- Sports event / gaming UI styling
- Bright neon colors or sky-blue dev palette
- Glassmorphism-heavy interfaces
- Cartoon illustrations, generic stock photos
- Heavy gradients, excessive parallax
- Colorful icon packs

### References

World Governments Summit · COP28 · World Economic Forum · G20 Summit

### Assets

- Official logos in `public/logos/` — **do not recreate or redesign**
- Hero banners in `public/banners/` — use provided official banners only

---

# 10. Current Scope (Phase 1)

### Included

- Complete Public Website UI
- Registration UI + QR Pass mockup
- Delegate Login UI
- Delegate Portal UI
- Event Schedule UI + personalized schedule
- Responsive design, WCAG AA

### Not Included

- Backend, authentication, database, APIs
- Payment, SMS, email, QR generation
- Admin portal, Event Management System modules

---

# 11. Active Implementation Status

**Current sprint:** Phase 1 Task 1 — see [`current_task.md`](current_task.md)

### Task 1 Scope

Implement: Public layout · Delegate layout (structure) · Header · Footer · Mobile sidebar · All routes · **Full Home page**

Do NOT implement other page content yet — use Coming Soon placeholders.

### Implementation Checklist

| Item | Status |
|------|--------|
| Next.js scaffold | Done |
| Basic home page (minimal) | Partial — needs full rebuild per task spec |
| Public layout (header, footer, sidebar) | Pending |
| Delegate layout (nav, sidebar) | Pending |
| Route structure (public + portal) | Pending |
| Design tokens (Navy/White/Gold) | Pending — current CSS uses slate/sky-blue |
| Mock data in `public/mock-data/` | Pending — `events_schedule.json` at repo root |
| Service layer | Pending — page imports JSON directly |
| Official logos/banners wired | Pending |

### Known Deviations to Fix

1. `globals.css` uses dark slate + sky blue — replace with Navy/White/Gold tokens
2. `events_schedule.json` at repo root — migrate to `public/mock-data/events.json`
3. `page.tsx` imports JSON directly — route through `services/events.ts`
4. No layouts, navigation, or route structure yet

---

# 12. Future Scope (Phase 2+)

### Roadmap

```
Phase 1: Frontend UI Prototype
  ↓
Phase 2: Backend API Integration
  ↓
Phase 3: Delegate Authentication
  ↓
Phase 4: Complete Event Management System
  ↓
Phase 5: Production Deployment
```

### EMS Modules (Out of Scope — Design for Reusability)

- User Registration Management
- Arrival & Departure Management
- Vehicle Resource Management
- Accommodation Management
- Organized Dinners
- IONS / Bilateral Meetings
- City Parade Management
- Exhibition Village Management
- Conservancy (Ships at Anchorage)
- Tours Management
- Spouses Programme
- Fleet Review / Exercise Management
- Miscellaneous Events

Design components and navigation to accommodate these modules without requiring a redesign.

---

# 13. Registration Flow

Categories: Head of Delegation · Official Delegate · Observer · Media

```
Registration Form → Submit → Confirmation → QR Pass Preview → Login
```

Form fields: First/Last Name, Country, Organization, Designation, Passport, Email, Mobile, Category, Accommodation Preference, Arrival/Departure Details.

Confirmation: Registration successful, Delegate ID, QR Pass, Download button.

---

*Last updated: consolidated from project docs 01–04, `about_cggs.md`, and `current_task.md`.*
