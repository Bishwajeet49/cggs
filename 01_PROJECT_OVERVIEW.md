# CGGS 2027 Website – Project Overview

> **Version:** 1.0
> **Project Phase:** UI Prototype (Phase 1)
> **Project:** 5th Coast Guard Global Summit (CGGS 2027)
> **Venue:** Chennai, India
> **Organization:** Indian Coast Guard

---

# Project Purpose

This repository contains the frontend UI prototype for the **5th Coast Guard Global Summit (CGGS 2027)** website.

The goal of this repository is to create a high-fidelity prototype that demonstrates the complete user experience for the summit before backend development begins.

This prototype will be used for:

- Client demonstrations
- UI/UX validation
- Stakeholder review
- Requirement gathering
- Frontend architecture planning
- Future backend integration

This repository is **not intended to be a production-ready application**.

---

# Project Overview

CGGS 2027 is an international maritime summit hosted by the Indian Coast Guard in Chennai as part of the Golden Jubilee celebrations of the Indian Coast Guard.

The summit consists of multiple international events including:

- Coast Guard Global Summit
- International Coast Guard Fleet Review
- World Coast Guard Seminar
- Delegate Village
- Cultural Events
- City Parade
- Official Dinners
- Networking Sessions

The website should present these events through a modern, premium, government-grade user experience.

---

# Repository Objective

The objective of this repository is to develop only the **frontend UI prototype**.

The application should simulate the complete website experience using frontend mock data.

No backend implementation is included in this phase.

---

# Current Scope (Phase 1)

The current phase includes:

- Public Website
- Delegate Login UI
- Delegate Dashboard
- Registration Flow
- QR Pass Mockup
- Event Schedule
- Fleet Review Pages
- Seminar Pages
- Gallery
- Contact
- Responsive Design

The application should behave like a real system even though all data is mocked.

---

# Out of Scope

The following features are NOT included in this repository:

- Backend APIs
- Authentication
- Authorization
- Database
- Email Services
- SMS
- Payment Gateway
- Admin Portal
- Event Management Portal
- QR Code Generation Service
- Notification Services

These features will be implemented in future phases.

---

# Target Users

The application serves two different user groups.

## Public Visitors

Public visitors can:

- Learn about CGGS
- View event information
- Browse schedules
- View Fleet Review
- Read seminar details
- Register as delegates
- Contact organizers
- Browse media gallery

---

## Registered Delegates

After login delegates can access:

- Personal Dashboard
- Personalized Schedule
- Registration Details
- QR Pass
- Accommodation Information
- Arrival & Departure Details
- Transport Information
- Event Invitations
- Downloads
- Notifications

---

# Data Source

During Phase 1, all application data will be loaded from frontend JSON files.

The JSON files act as mock backend responses.

Examples include:

- Event Schedule
- Speakers
- Fleet Review
- Seminar Sessions
- Countries
- Delegate Profile
- Notifications
- Gallery
- News
- Accommodation
- Registration

The frontend should be developed so these JSON files can later be replaced with REST APIs without changing the UI.

---

# Design Philosophy

The website should represent an international government summit.

The design should feel:

- Premium
- Professional
- Elegant
- Minimal
- Defence-grade
- International
- Maritime

Avoid:

- Flashy animations
- Sports-event styling
- Gaming aesthetics
- Heavy gradients
- Neon colors

---

# Theme

Primary Colors

- Navy Blue
- White
- Gold

Design Principles

- Clean layouts
- Large imagery
- Excellent typography
- Plenty of whitespace
- WCAG compliant
- Mobile first
- Accessible

---

# Website Structure

The application consists of two major sections.

## Public Website

Accessible by everyone.

Contains:

- Home
- About CGGS
- About Indian Coast Guard
- Event Schedule
- Fleet Review
- World Coast Guard Seminar
- Exhibition Village
- Accommodation & Travel
- Media
- Contact
- Registration
- Login

---

## Delegate Portal

Accessible only after login.

Contains:

- Dashboard
- My Schedule
- My Registration
- QR Pass
- Arrival & Departure
- Accommodation
- Transport
- Fleet Review
- Seminar
- Dinners
- Exhibition Village
- Downloads
- Notifications
- Profile

---

# Development Principles

The project should follow these principles:

- Component-driven architecture
- Reusable UI components
- Responsive design
- Modular folder structure
- Mock-data driven development
- API-ready architecture
- Accessibility first

Components should never contain hardcoded business data.

---

# Mock Data Strategy

All UI screens should consume data from JSON files.

Example flow:

UI Component

↓

Service Layer

↓

Mock JSON

↓

Future REST API

This allows the backend to be integrated later with minimal frontend changes.

---

# Future Roadmap

Phase 1

Frontend UI Prototype

↓

Phase 2

Backend API Integration

↓

Phase 3

Delegate Authentication

↓

Phase 4

Complete Event Management System

↓

Phase 5

Production Deployment

---

# Related Documentation

This document provides the overall project context.

Additional documentation:

- `00_CGGS_2027_Project_Knowledge_Base.md` — Master reference (start here)
- `02_DESIGN_SYSTEM.md` — Visual design spec
- `03_DATA_MODELS.md` — JSON schemas & service layer
- `04_APPLICATION_STRUCTURE.md` — Sitemap, navigation & user flows
- Future scope — see §12 in the Knowledge Base

All implementation decisions should align with these documents.

---

# Important Notes

- This repository focuses only on frontend implementation.
- All data is currently mocked using JSON.
- The UI should be designed as if it is connected to a live backend.
- The architecture should support future expansion without requiring major redesign.
- The objective is to create a premium international summit experience suitable for the Indian Coast Guard and CGGS 2027.