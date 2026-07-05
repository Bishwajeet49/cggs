# Task: Build the Complete "Travel & Stay" Module

## Objective

Build a premium "Travel & Stay" module for the CGGS 2027 Delegate Portal.

This module should become the delegate's travel companion throughout the summit.

The experience should feel comparable to premium airline, hotel and international summit applications.

Examples of inspiration:

- Airline companion apps
- Olympic Games delegate portals
- World Economic Forum delegate portal
- World Governments Summit
- G20 Delegate Portal

The module consists of three pages.

- Arrival & Departure
- Accommodation
- Transport

All pages should share the same design language and work together.

Maintain the existing portal layout, sidebar and branding.

Use Navy, White and Gold design system.

Use mock JSON data.

---

# Module Flow

Travel & Stay

├── Arrival & Departure

├── Accommodation

└── Transport

Each page should link to the others using "Next Step" cards.

Example

Arrival Complete

↓

Accommodation Details

↓

Transport Assignment

---

# PAGE 1

# Arrival & Departure

Purpose

Everything related to arriving in Chennai and departing after the summit.

---

## Hero

Display

Arrival & Departure

Flight Information

Travel Status

Delegate Name

Current Status

---

## Arrival Status Card

Show

Arrival Status

Examples

Flight Confirmed

Arrived

Delayed

Pending

Pickup Assigned

Completed

Display beautiful status badges.

---

## Flight Details

Display

Airline

Flight Number

Arrival Date

Arrival Time

Terminal

Airport

Seat

Booking Reference

Example

AI-302

15 Feb 2027

08:15 AM

Terminal 3

Chennai International Airport

---

## Pickup Arrangement

Beautiful information card.

Display

Pickup Status

Assigned Vehicle

Pickup Time

Meeting Point

Estimated Travel Time

Driver Name

Driver Mobile Number

Vehicle Number

Vehicle Type

Example

Toyota Innova

TN09AB1234

---

## Liaison Officer

Display

Officer Photo

Officer Name

Rank

Contact Number

WhatsApp Button

Email

Assigned Country

Call and Message buttons should appear.

---

## Arrival Instructions

Display

Airport instructions

Security procedures

Required documents

Emergency contact

Useful notes

---

## Quick Actions

Buttons

Call Driver

Call Liaison Officer

Open Airport Map

Download Arrival Guide

Emergency Contact

---

## Airport Map

Mock interactive airport map.

Show

Arrival Gate

Meeting Point

Pickup Zone

---

# PAGE 2

# Accommodation

Purpose

Everything related to delegate hotel stay.

---

## Hero

Accommodation

Hotel Information

Stay Details

---

## Hotel Card

Display

Hotel Image

Hotel Name

Hotel Rating

Hotel Address

Check-in

Check-out

Room Number

Room Type

Status

Example

Confirmed

Pending

Allocated

---

## Hotel Location

Interactive map.

Display

Hotel

Summit Venue

Distance

Travel Time

Open in Google Maps button

---

## Hotel POC

Display

Hotel Manager

Photo

Name

Phone Number

Email

Reception Number

24x7 Help Desk

Call buttons

---

## Room Details

Display

Room Number

Floor

Room Type

Wi-Fi

Breakfast Included

Check-in Time

Check-out Time

Special Requests

---

## Meal Information

This should be a dedicated premium section.

Display

Breakfast

Lunch

Dinner

High Tea

Welcome Dinner

Gala Dinner

Each card should display

Time

Location

Menu

Dress Code (if applicable)

Example

Breakfast

07:00–09:30

Grand Restaurant

Continental + Indian Buffet

---

## Hotel Amenities

Show

Wi-Fi

Gym

Swimming Pool

Business Centre

Laundry

Medical Assistance

---

## Quick Actions

Hotel Map

Call Reception

Room Service

Navigate to Venue

Download Hotel Guide

---

# PAGE 3

# Transport

Purpose

Everything related to delegate transportation.

---

## Hero

Transport

Vehicle Assignment

Travel Assistance

---

## Vehicle Assignment

Large premium card.

Display

Vehicle Photo

Vehicle Type

Vehicle Number

Driver Name

Driver Photo

Driver Contact

Vehicle Status

Capacity

---

## Live Tracking

Mock live tracking interface.

Show

Current Location

Vehicle Status

ETA

Distance

Map

Moving indicator

This is frontend only.

Use mock GPS updates.

---

## Today's Pickup

Display

Pickup Time

Pickup Location

Drop Location

Estimated Arrival

Current Status

Examples

Driver En Route

Vehicle Arrived

Completed

Delayed

---

## Driver Information

Photo

Name

Phone

Experience

Languages

Emergency Contact

Buttons

Call

Message

---

## Vehicle Timeline

Today's Trips

Hotel

↓

Venue

↓

Lunch

↓

Fleet Review

↓

Hotel

Visual timeline.

---

## Emergency Transport

Display

Emergency Vehicle

Medical Transport

Transport Helpdesk

24x7 Contact

---

## Quick Actions

Track Vehicle

Call Driver

Share Location

Download Route

Transport Helpdesk

---

# Common Components

Use reusable components.

Status Card

Timeline

Information Card

Contact Card

Map Card

Hero

Action Buttons

Alert Banner

Section Header

---

# Mock Data

Create

arrival.json

accommodation.json

transport.json

Include realistic CGGS data.

---

# Animations

Use elegant animations.

Examples

Page transitions

Card hover

Map loading

Vehicle pulse animation

Timeline reveal

Status updates

Counters

Loading skeletons

Avoid excessive animation.

---

# Empty States

If accommodation is not yet assigned

Display

Accommodation is being allocated by the Secretariat.

You will be notified once confirmed.

---

If transport is pending

Display

Vehicle assignment is in progress.

Check back closer to your arrival date.

---

# UI Expectations

The Travel & Stay module should feel like a premium delegate concierge application.

Delegates should immediately find

- Flight Details
- Driver Information
- Liaison Officer
- Hotel Details
- Hotel Manager Contact
- Food Schedule
- Meal Menu
- Live Vehicle Tracking
- Pickup Arrangements
- Maps
- Emergency Contacts

Every page should contain meaningful actions rather than static information.

The final experience should feel comparable to a premium airline or luxury hotel companion application while maintaining the professional identity of the Indian Coast Guard and the Ministry of Defence.

Avoid generic dashboard cards.

Focus on clarity, usability, premium design, and a seamless delegate experience.