# CGGS 2027 – Application Structure

> Version: 1.0
> Scope: UI Prototype (Phase 1)

---

# Purpose

This document defines the overall application structure, navigation, and page hierarchy for the CGGS 2027 website.

It serves as the primary reference for understanding:

- Application structure
- User flows
- Public pages
- Delegate portal pages
- Navigation hierarchy
- Relationship between pages

This document intentionally focuses on the **application flow** rather than detailed UI implementation.

---

# Application Overview

The application consists of two primary sections:

```
CGGS 2027 Website
│
├── Public Website
└── Delegate Portal (After Login)
```

---

# Application Sitemap

```
CGGS 2027 Website
│
├── Public Website
│   │
│   ├── Home
│   ├── About CGGS
│   ├── About Indian Coast Guard
│   ├── Event Schedule
│   │      ├── Day 1
│   │      ├── Day 2
│   │      ├── Day 3
│   │      └── Event Details
│   │
│   ├── International Fleet Review
│   ├── World Coast Guard Seminar
│   ├── Exhibition Village
│   ├── Accommodation & Travel
│   ├── Media & Gallery
│   ├── Contact
│   ├── Delegate Registration
│   ├── Registration Success
│   └── Login
│
└── Delegate Portal
    │
    ├── Dashboard
    │
    ├── My Schedule
    │
    ├── My Registration
    │
    ├── Travel & Stay
    │      ├── Arrival & Departure
    │      ├── Accommodation
    │      └── Transport
    │
    ├── Event Hub
    │      ├── Fleet Review
    │      ├── Seminar
    │      ├── Official Events
    │      └── Exhibition Village
    │
    ├── Downloads
    ├── Notifications
    ├── Profile
    └── Logout
```

---

# Public Website

## Home

Landing page introducing CGGS 2027.

Acts as the central entry point to the website.

Provides quick navigation to all major sections.

↓

About

↓

Schedule

↓

Registration

↓

Fleet Review

↓

Seminar

↓

Login

---

## About CGGS

Provides information about the Coast Guard Global Summit including its history, objectives, previous editions, and why India is hosting the 5th edition.

---

## About Indian Coast Guard

Introduces the Indian Coast Guard, its history, mission, responsibilities, and Golden Jubilee celebration.

---

## Event Schedule

Displays the master schedule for the complete 3-day summit.

Users can browse each day and open individual event details.

Flow

```
Schedule

↓

Select Day

↓

View Events

↓

Event Details
```

---

## Event Details

Displays complete information about a selected event.

Includes schedule, venue, speakers, and event description.

---

## International Fleet Review

Dedicated page for the Fleet Review.

Contains overview, participating countries, ships, programme, and related information.

---

## World Coast Guard Seminar

Displays seminar themes, sessions, speakers, and programme.

Users can navigate to session details.

---

## Exhibition Village

Provides information about the delegate village, exhibitions, hospitality areas, and cultural activities.

---

## Accommodation & Travel

Provides travel guidance, hotel information, transportation details, and visitor information.

---

## Media & Gallery

Displays event photos, videos, press releases, and news.

---

## Contact

Displays organizing committee information and contact details.

---

## Delegate Registration

Allows users to complete the delegate registration process.

Flow

```
Registration Form

↓

Submit

↓

Registration Successful

↓

Login
```

---

## Registration Success

Confirmation page displayed after successful registration.

Shows registration summary and QR Pass preview.

---

## Login

Allows registered delegates to access the delegate portal.

Successful login redirects to Dashboard.

---

# Delegate Portal

Accessible only after successful login.

Provides personalized information for registered delegates.

---

## Dashboard

Landing page after login.

Provides a quick overview of the delegate's event participation.

Quick links to:

- My Schedule
- Registration
- Travel & Stay
- Event Hub
- Downloads
- Notifications
- Profile

---

## My Schedule

Displays the delegate's personalized itinerary.

Flow

```
Dashboard

↓

My Schedule

↓

Day 1 / Day 2 / Day 3

↓

Event Details
```

---

## My Registration

Displays registration details including delegate category, status, and QR Pass.

---

## Travel & Stay

Groups all travel-related information.

Contains:

- Arrival & Departure
- Accommodation
- Transport

---

### Arrival & Departure

Displays flight/vessel information, pickup arrangements, and liaison officer details.

---

### Accommodation

Displays hotel allocation, room details, and stay information.

---

### Transport

Displays assigned vehicle, driver details, and transportation schedule.

---

## Event Hub

Central location for all event-specific information available to the delegate.

Contains:

- Fleet Review
- Seminar
- Official Events
- Exhibition Village

---

### Fleet Review

Displays personalized Fleet Review information including programme and participation details.

---

### Seminar

Displays seminar sessions, speakers, and the delegate's registered sessions.

---

### Official Events

Displays invitations and schedules for official dinners, receptions, cultural events, and city parade.

---

### Exhibition Village

Displays exhibition schedule, activities, and delegate information.

---

## Downloads

Provides downloadable resources such as delegate handbook, programme booklet, venue maps, and important documents.

---

## Notifications

Displays announcements, schedule updates, reminders, and emergency notifications.

---

## Profile

Displays delegate profile information and account details.

---

# User Flow

```
Visitor

↓

Home

↓

Explore Website

↓

Registration

↓

Registration Success

↓

Login

↓

Dashboard

↓

My Schedule / Travel / Event Hub

↓

Logout
```

---

# Schedule Flow

```
3-Day Summit

↓

Day

↓

Events

↓

Event Details

↓

Speakers

↓

Venue
```

The same schedule data powers:

- Public Event Schedule
- Event Details
- Delegate Dashboard
- My Schedule

---

# Notes

- Public pages are accessible to all visitors.
- Delegate Portal is accessible only after login.
- All data is currently served from frontend mock JSON files.
- The architecture is designed to support future backend integration without changing the application structure.