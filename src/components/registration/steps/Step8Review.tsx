"use client";

import { useCallback } from "react";
import { CheckCircle2, User, Building2, Plane, Hotel, Calendar, Phone, ExternalLink } from "lucide-react";
import type { RegistrationFormData } from "@/types/registration";
import { getHotels, getRegistrationEvents } from "@/services/registration";

const HOTELS = getHotels();
const EVENTS = getRegistrationEvents();
const CATEGORY_LABELS: Record<string, string> = {
  head_of_delegation: "Head of Delegation",
  official_delegate: "Official Delegate",
  observer: "Observer",
  media_representative: "Media Representative",
};

interface ReviewRowProps {
  label: string;
  value: string | undefined | null;
}
function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-xs text-slate/60 font-medium">{label}</span>
      <span className="text-sm text-navy font-medium text-right max-w-[60%]">{value || "—"}</span>
    </div>
  );
}

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}
function Section({ icon, title, children }: SectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-navy/3 border-b border-gray-100">
        <span className="text-navy">{icon}</span>
        <h3 className="text-xs font-semibold text-navy uppercase tracking-wider">{title}</h3>
      </div>
      <div className="px-4 py-2">{children}</div>
    </div>
  );
}

interface Step8ReviewProps {
  data: RegistrationFormData;
  errors: Record<string, string>;
  onDeclarationChange: (field: keyof RegistrationFormData["declaration"], value: boolean) => void;
}

export default function Step8Review({ data, errors, onDeclarationChange }: Step8ReviewProps) {
  const { personal, organization, travel, accommodation, selectedEvents, emergency, declaration } = data;

  const hotelName = HOTELS.find((h) => h.id === accommodation.hotelPreference)?.name;
  const eventNames = EVENTS.filter((e) => selectedEvents.includes(e.id)).map((e) => e.title);

  const toggleDeclaration = useCallback(
    (field: keyof typeof declaration) => {
      onDeclarationChange(field, !declaration[field]);
    },
    [declaration, onDeclarationChange]
  );

  return (
    <div className="space-y-5">
      <div className="text-center pb-2">
        <h2 className="text-2xl font-light text-navy tracking-wide">Review & Declaration</h2>
        <p className="text-slate/70 text-sm mt-1">
          Please review all information carefully before submitting
        </p>
      </div>

      {/* Category badge */}
      {data.category && (
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-sm font-semibold text-navy">
            <CheckCircle2 className="h-4 w-4 text-gold" />
            {CATEGORY_LABELS[data.category]}
          </span>
        </div>
      )}

      <Section icon={<User className="h-4 w-4" />} title="Personal Information">
        <ReviewRow label="Full Name" value={`${personal.firstName} ${personal.lastName}`} />
        <ReviewRow label="Gender" value={personal.gender} />
        <ReviewRow label="Nationality" value={personal.nationality} />
        <ReviewRow label="Date of Birth" value={personal.dateOfBirth} />
        <ReviewRow label="Passport No." value={personal.passportNumber} />
        <ReviewRow label="Passport Expiry" value={personal.passportExpiry} />
        <ReviewRow label="Email" value={personal.email} />
        <ReviewRow label="Mobile" value={`${personal.countryCode} ${personal.mobileNumber}`} />
      </Section>

      <Section icon={<Building2 className="h-4 w-4" />} title="Organization Details">
        <ReviewRow label="Organization" value={organization.organizationName} />
        <ReviewRow label="Type" value={organization.organizationType} />
        <ReviewRow label="Country" value={organization.country} />
        <ReviewRow label="Rank / Designation" value={organization.rankDesignation} />
        <ReviewRow label="Department" value={organization.department} />
        <ReviewRow label="Official Email" value={organization.officialEmail} />
      </Section>

      <Section icon={<Calendar className="h-4 w-4" />} title="Event Participation">
        {eventNames.length > 0 ? (
          <div className="py-2 flex flex-wrap gap-2">
            {eventNames.map((name) => (
              <span
                key={name}
                className="text-xs px-3 py-1 bg-navy/5 text-navy rounded-full border border-navy/10"
              >
                {name}
              </span>
            ))}
          </div>
        ) : (
          <ReviewRow label="Events" value="None selected" />
        )}
      </Section>

      <Section icon={<Plane className="h-4 w-4" />} title="Travel Information">
        <ReviewRow label="Arrival Date" value={travel.arrivalDate} />
        <ReviewRow label="Arrival Time" value={travel.arrivalTime} />
        <ReviewRow label="Arrival Flight" value={travel.arrivalFlightNumber} />
        <ReviewRow label="Departure Date" value={travel.departureDate} />
        <ReviewRow label="Departure Flight" value={travel.departureFlightNumber} />
      </Section>

      <Section icon={<Hotel className="h-4 w-4" />} title="Accommodation">
        <ReviewRow
          label="Requires Accommodation"
          value={accommodation.requireAccommodation === true ? "Yes" : accommodation.requireAccommodation === false ? "No" : "—"}
        />
        {accommodation.requireAccommodation && (
          <>
            <ReviewRow label="Hotel" value={hotelName} />
            <ReviewRow label="Room Type" value={accommodation.roomPreference} />
            <ReviewRow label="Check-in" value={accommodation.checkInDate} />
            <ReviewRow label="Check-out" value={accommodation.checkOutDate} />
          </>
        )}
      </Section>

      <Section icon={<Phone className="h-4 w-4" />} title="Emergency Contact">
        <ReviewRow label="Name" value={emergency.fullName} />
        <ReviewRow label="Relationship" value={emergency.relationship} />
        <ReviewRow label="Phone" value={emergency.phoneNumber} />
        <ReviewRow label="Country" value={emergency.country} />
      </Section>

      {/* Declaration */}
      <div className="bg-navy/3 rounded-lg border border-navy/10 p-5 space-y-4">
        <h3 className="text-sm font-semibold text-navy uppercase tracking-wider">Declaration</h3>

        {errors.declaration && (
          <p className="text-xs text-red-500">{errors.declaration}</p>
        )}

        <div className="space-y-3">
          {([
            { field: "infoCorrect" as const, label: "I confirm that all the information provided is accurate and correct to the best of my knowledge." },
            { field: "privacyPolicy" as const, label: <span>I have read and agree to the <a href="#" className="text-gold underline underline-offset-2" onClick={(e) => e.preventDefault()}>Privacy Policy <ExternalLink className="h-3 w-3 inline" /></a> of the CGGS 2027 Secretariat.</span> },
            { field: "termsConditions" as const, label: <span>I have read and agree to the <a href="#" className="text-gold underline underline-offset-2" onClick={(e) => e.preventDefault()}>Terms & Conditions <ExternalLink className="h-3 w-3 inline" /></a> of participation.</span> },
          ]).map(({ field, label }) => (
            <label key={field} className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  checked={declaration[field]}
                  onChange={() => toggleDeclaration(field)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:bg-navy peer-checked:border-navy transition-all duration-200 flex items-center justify-center group-hover:border-navy/60">
                  {declaration[field] && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-navy/80 leading-relaxed">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
