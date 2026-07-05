"use client";

import { useCallback } from "react";
import { ShieldAlert } from "lucide-react";
import { FormField, Input, Select } from "../FormField";
import type { EmergencyContact } from "@/types/registration";
import countriesData from "../../../../public/mock-data/countries.json";

const COUNTRIES = countriesData.countries.map((c) => c.name).sort();
const RELATIONSHIPS = ["Spouse", "Parent", "Child", "Sibling", "Friend", "Colleague", "Other"];

interface Errors { [key: string]: string }

interface Step7EmergencyProps {
  data: EmergencyContact;
  onChange: (data: EmergencyContact) => void;
  errors: Errors;
}

export default function Step7Emergency({ data, onChange, errors }: Step7EmergencyProps) {
  const update = useCallback(
    (field: keyof EmergencyContact, value: string) => {
      onChange({ ...data, [field]: value });
    },
    [data, onChange]
  );

  return (
    <div className="space-y-6">
      <div className="text-center pb-2">
        <h2 className="text-2xl font-light text-navy tracking-wide">Emergency Contact</h2>
        <p className="text-slate/70 text-sm mt-1">
          Provide an emergency contact for the duration of the summit
        </p>
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 flex gap-3">
        <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
        <p className="text-sm text-rose-700">
          This information will only be used in case of medical or safety emergencies during the summit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Full Name" required error={errors.fullName}>
          <Input
            value={data.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="Contact's full name"
            error={!!errors.fullName}
          />
        </FormField>

        <FormField label="Relationship" required error={errors.relationship}>
          <Select
            value={data.relationship}
            onChange={(e) => update("relationship", e.target.value)}
            error={!!errors.relationship}
          >
            <option value="">Select relationship</option>
            {RELATIONSHIPS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="Phone Number" required error={errors.phoneNumber}>
          <Input
            type="tel"
            value={data.phoneNumber}
            onChange={(e) => update("phoneNumber", e.target.value)}
            placeholder="Include country code, e.g. +91 9876543210"
            error={!!errors.phoneNumber}
          />
        </FormField>

        <FormField label="Country" required error={errors.country}>
          <Select
            value={data.country}
            onChange={(e) => update("country", e.target.value)}
            error={!!errors.country}
          >
            <option value="">Select country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </FormField>
      </div>
    </div>
  );
}
