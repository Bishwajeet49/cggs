"use client";

import { useCallback } from "react";
import { Hotel } from "lucide-react";
import { FormField, Select, Input } from "../FormField";
import type { AccommodationInfo } from "@/types/registration";
import { getHotels } from "@/services/registration";

const HOTELS = getHotels();
const ROOM_TYPES = ["Single", "Twin Sharing"];
const SPECIAL_REQUIREMENTS = [
  { id: "wheelchair", label: "Wheelchair Assistance" },
  { id: "medical", label: "Medical Assistance" },
  { id: "vegetarian", label: "Vegetarian Meals" },
  { id: "vegan", label: "Vegan Meals" },
  { id: "halal", label: "Halal Meals" },
  { id: "dietary_other", label: "Other Dietary Restrictions" },
];

interface Errors { [key: string]: string }

interface Step5AccommodationProps {
  data: AccommodationInfo;
  onChange: (data: AccommodationInfo) => void;
  errors: Errors;
}

export default function Step5Accommodation({ data, onChange, errors }: Step5AccommodationProps) {
  const update = useCallback(
    <K extends keyof AccommodationInfo>(field: K, value: AccommodationInfo[K]) => {
      onChange({ ...data, [field]: value });
    },
    [data, onChange]
  );

  const toggleRequirement = useCallback(
    (req: string) => {
      const current = data.specialRequirements;
      const updated = current.includes(req)
        ? current.filter((r) => r !== req)
        : [...current, req];
      onChange({ ...data, specialRequirements: updated });
    },
    [data, onChange]
  );

  return (
    <div className="space-y-6">
      <div className="text-center pb-2">
        <h2 className="text-2xl font-light text-navy tracking-wide">Accommodation</h2>
        <p className="text-slate/70 text-sm mt-1">Select your accommodation preferences for CGGS 2027</p>
      </div>

      {/* Require accommodation */}
      <FormField label="Do you require accommodation arranged by the Secretariat?" required>
        <div className="flex gap-6 pt-1">
          {[
            { value: true, label: "Yes, please arrange accommodation" },
            { value: false, label: "No, I have my own arrangements" },
          ].map((option) => (
            <label
              key={String(option.value)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <input
                  type="radio"
                  checked={data.requireAccommodation === option.value}
                  onChange={() => update("requireAccommodation", option.value)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-navy flex items-center justify-center group-hover:border-navy/60 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-navy scale-0 peer-checked:scale-100 transition-transform" />
                </div>
              </div>
              <span className="text-sm text-navy/80">{option.label}</span>
            </label>
          ))}
        </div>
      </FormField>

      {data.requireAccommodation === true && (
        <div className="space-y-5 p-5 bg-cream/30 rounded-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Hotel className="h-4 w-4 text-navy" />
            <span className="text-sm font-semibold text-navy uppercase tracking-wider">Accommodation Preferences</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField label="Hotel Preference" required error={errors.hotelPreference}>
              <Select
                value={data.hotelPreference}
                onChange={(e) => update("hotelPreference", e.target.value)}
                error={!!errors.hotelPreference}
              >
                <option value="">Select hotel</option>
                {HOTELS.map((h) => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </Select>
            </FormField>

            <FormField label="Room Preference" required error={errors.roomPreference}>
              <Select
                value={data.roomPreference}
                onChange={(e) => update("roomPreference", e.target.value)}
                error={!!errors.roomPreference}
              >
                <option value="">Select room type</option>
                {ROOM_TYPES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </Select>
            </FormField>

            <FormField label="Check-in Date">
              <Input
                type="date"
                value={data.checkInDate}
                onChange={(e) => update("checkInDate", e.target.value)}
              />
            </FormField>

            <FormField label="Check-out Date">
              <Input
                type="date"
                value={data.checkOutDate}
                onChange={(e) => update("checkOutDate", e.target.value)}
              />
            </FormField>
          </div>

          <FormField label="Special Requirements">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {SPECIAL_REQUIREMENTS.map((req) => (
                <label
                  key={req.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={data.specialRequirements.includes(req.id)}
                      onChange={() => toggleRequirement(req.id)}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:bg-navy peer-checked:border-navy transition-all duration-200 flex items-center justify-center group-hover:border-navy/60">
                      <svg className="w-3 h-3 text-white hidden peer-checked:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-navy/80">{req.label}</span>
                </label>
              ))}
            </div>
          </FormField>
        </div>
      )}
    </div>
  );
}
