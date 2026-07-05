# CGGS 2027 – Data Models

> Version: 1.0
> Project Phase: UI Prototype

---

# Purpose

This document defines the frontend data models used throughout the CGGS 2027 website.

During Phase 1, all application data is stored in local JSON files to simulate backend API responses.

The UI should always consume data from these models rather than hardcoded values.

In future phases, these JSON models will be replaced by REST APIs without changing the UI components.

---

# Data Source

Current

Frontend JSON

↓

Future

REST APIs

↓

Future

Database

---

# Data Architecture

UI Component

↓

Service Layer

↓

Mock JSON

↓

Future REST API

---

# Available Data Models

The application currently uses (or will use) the following data models.

---

## Event Schedule

Contains

- Summit
- Days
- Themes
- Events
- Timings
- Speakers
- Venue

Used In

- Public Schedule
- Delegate Schedule
- Dashboard
- Event Details

---

## Speakers

Contains

- Name
- Photo
- Designation
- Organization
- Country
- Biography
- Sessions

Used In

- Seminar
- Event Detail
- Speaker Profile

---

## Fleet Review

Contains

- Ships
- Ship Images
- Country
- Ship Type
- Fleet Events

Used In

- Fleet Review
- Ships Showcase

---

## Participating Countries

Contains

- Country
- Flag
- Delegation
- Number of Participants

Used In

- Fleet Review
- Interactive Map
- Countries Grid

---

## Delegate Profile

Contains

- Name
- Country
- Organization
- Category
- Passport
- Photo
- Contact

Used In

- Dashboard
- Profile
- Registration

---

## Registration

Contains

- Registration Number
- Category
- Status
- QR Pass
- Approval

Used In

- Registration
- Dashboard

---

## Accommodation

Contains

- Hotel
- Room
- Check-in
- Check-out
- Address
- Contact

Used In

- Delegate Portal

---

## Transport

Contains

- Vehicle
- Driver
- Pickup Time
- Pickup Location
- Driver Contact

Used In

- Delegate Dashboard

---

## Notifications

Contains

- Title
- Message
- Priority
- Date
- Type

Used In

- Dashboard
- Notifications

---

## Gallery

Contains

- Images
- Videos
- Albums
- Category

Used In

- Media

---

## News

Contains

- Title
- Date
- Thumbnail
- Summary
- Content

Used In

- Home
- News
- Media

---

## Downloads

Contains

- Handbook
- Brochure
- Maps
- PDFs

Used In

- Delegate Portal

---

# JSON Folder Structure

```
public/

└── mock-data/

    ├── events.json
    ├── speakers.json
    ├── fleet-review.json
    ├── countries.json
    ├── delegates.json
    ├── registration.json
    ├── accommodation.json
    ├── transport.json
    ├── notifications.json
    ├── gallery.json
    ├── news.json
    └── downloads.json
```

---

# Design Guidelines

Every JSON file should:

- Use consistent IDs
- Be human-readable
- Support future API replacement
- Avoid duplicated information
- Use ISO date formats
- Use 24-hour time format

---

# Naming Convention

Examples

```
event_id

speaker_id

country_id

delegate_id

hotel_id

vehicle_id

gallery_id
```

---

# Future API Mapping

Current

```
events.json
```

Future

```
GET /api/events
```

Current

```
speakers.json
```

Future

```
GET /api/speakers
```

Current

```
delegates.json
```

Future

```
GET /api/delegates/me
```

The UI should never depend on local JSON directly. All data access should happen through a service layer to simplify the transition to backend APIs.