# CGGS Page Builder — Reference

## Public Routes

| Route | Page | Layout |
|-------|------|--------|
| `/` | Home | Public |
| `/about-cggs` | About CGGS | Public |
| `/about-icg` | About Indian Coast Guard | Public |
| `/schedule` | Event Schedule | Public |
| `/schedule/[eventId]` | Event Detail | Public |
| `/fleet-review` | International Fleet Review | Public |
| `/seminar` | World Coast Guard Seminar | Public |
| `/village` | Exhibition Village | Public |
| `/accommodation` | Accommodation & Travel | Public |
| `/media` | Media & Gallery | Public |
| `/contact` | Contact | Public |
| `/register` | Delegate Registration | Public |
| `/register/success` | Registration Success | Public |
| `/login` | Delegate Login | Public |

## Delegate Portal Routes

| Route | Page | Nav Group |
|-------|------|-----------|
| `/portal/dashboard` | Dashboard | — |
| `/portal/schedule` | My Schedule | — |
| `/portal/registration` | My Registration | — |
| `/portal/travel/arrival` | Arrival & Departure | Travel & Stay |
| `/portal/travel/accommodation` | Accommodation | Travel & Stay |
| `/portal/travel/transport` | Transport | Travel & Stay |
| `/portal/events/fleet-review` | Fleet Review | Event Hub |
| `/portal/events/seminar` | Seminar | Event Hub |
| `/portal/events/official` | Official Events | Event Hub |
| `/portal/events/village` | Exhibition Village | Event Hub |
| `/portal/downloads` | Downloads | — |
| `/portal/notifications` | Notifications | — |
| `/portal/profile` | Profile | — |

## Page → Data Model Mapping

| Page | JSON Files |
|------|------------|
| Home | events, speakers, countries, news, gallery, fleet-review |
| Schedule / Event Detail | events, speakers |
| Fleet Review | fleet-review, countries |
| Seminar | speakers, events |
| Registration | registration |
| Dashboard | delegates, events, notifications, registration |
| My Schedule | events, delegates |
| Travel & Stay | accommodation, transport, delegates |
| Event Hub | fleet-review, speakers, events |
| Downloads | downloads |
| Notifications | notifications |
| Profile | delegates |
| Media | gallery, news |

## Component Checklist (New Page)

```
- [ ] Route file in correct app/ group
- [ ] Uses PublicLayout or DelegateLayout
- [ ] Hero section (if major page)
- [ ] Types defined in src/types/
- [ ] Mock JSON in public/mock-data/
- [ ] Service function in src/services/
- [ ] Page fetches via service, not direct JSON import
- [ ] Responsive layout tested
- [ ] Accessibility: focus, contrast, keyboard nav
- [ ] Design tokens: navy/white/gold (no dev palette)
```

## Folder Structure

```
src/app/(public)/          → public routes
src/app/(portal)/portal/   → delegate routes
src/components/layout/     → Header, Footer, Sidebar, MobileNav
src/components/ui/         → Button, Card, Form, Badge
src/components/sections/   → Home page sections
src/services/              → Data access layer
src/types/                 → TypeScript interfaces
src/lib/                   → Design tokens, utilities
public/mock-data/          → JSON mock APIs
public/logos/              → Official logos
public/banners/            → Hero carousel banners
```

## Coming Soon Template Pattern

```tsx
// Minimal pattern — enhance with design system styling
export default function ComingSoonPage({ title, description }: Props) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold text-[var(--color-navy)]">{title}</h1>
      <p className="mt-4 max-w-md text-[var(--color-gray-dark)]">{description}</p>
      <p className="mt-8 text-sm uppercase tracking-wider text-[var(--color-gold)]">
        Coming Soon
      </p>
    </section>
  );
}
```

## Home Page Section Components

Each section is an independent component in `src/components/sections/`:

1. `HeroCarousel` — official banners, Register + Explore Schedule CTAs
2. `Countdown` — countdown to CGGS 2027
3. `GoldenJubilee` — 50 years ICG celebration
4. `WelcomeSection` — CGGS, ICG, global cooperation intro
5. `SummitStatistics` — animated counters (countries, delegates, ships, sessions)
6. `KeyEvents` — fleet review, seminar, village, official events cards
7. `ThreeDayOverview` — day themes + major events
8. `FeaturedSpeakers` — speaker cards from mock data
9. `ParticipatingNations` — country flags grid
10. `FleetReviewHighlight` — fleet review intro + CTA
11. `SeminarHighlight` — seminar intro + CTA
12. `ExhibitionVillage` — village intro
13. `LatestNews` — news cards
14. `GalleryPreview` — photo grid preview
15. `VenueSection` — Chennai venue info
16. `RegistrationCTA` — large registration call-to-action
17. `Partners` — government/ministry logos placeholder
18. `ContactPreview` — short contact + CTA

Compose all sections in `src/app/(public)/page.tsx`.
