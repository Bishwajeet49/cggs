"use client";

import { useCallback } from "react";
import { Plane, Calendar, Info } from "lucide-react";
import { FormField, Input, Select, Textarea } from "../FormField";
import type { TravelInfo } from "@/types/registration";

const AIRPORTS = [
  { value: "MAA", label: "Chennai International Airport (MAA)" },
  { value: "PORT", label: "Chennai Port" },
  { value: "OTHER", label: "Other" },
];

interface Errors { [key: string]: string }

interface Step4TravelProps {
  data: TravelInfo;
  onChange: (data: TravelInfo) => void;
  errors: Errors;
}

export default function Step4Travel({ data, onChange, errors }: Step4TravelProps) {
  const update = useCallback(
    (field: keyof TravelInfo, value: string) => {
      onChange({ ...data, [field]: value });
    },
    [data, onChange]
  );

  return (
    <div className="space-y-6">
      <div className="text-center pb-2">
        <h2 className="text-2xl font-light text-navy tracking-wide">Travel Information</h2>
        <p className="text-slate/70 text-sm mt-1">Share your travel plans for logistical support</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Travel information is used to coordinate airport reception, ground transport, and port clearance for official delegates.
        </p>
      </div>

      {/* Arrival */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Plane className="h-4 w-4 text-navy" />
          <h3 className="text-sm font-semibold text-navy uppercase tracking-wider">Arrival</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Arrival Date" error={errors.arrivalDate}>
            <Input
              type="date"
              value={data.arrivalDate}
              onChange={(e) => update("arrivalDate", e.target.value)}
              error={!!errors.arrivalDate}
            />
          </FormField>

          <FormField label="Arrival Time">
            <Input
              type="time"
              value={data.arrivalTime}
              onChange={(e) => update("arrivalTime", e.target.value)}
            />
          </FormField>

          <FormField label="Arrival Airport / Port">
            <Select
              value={data.arrivalAirport}
              onChange={(e) => update("arrivalAirport", e.target.value)}
            >
              <option value="">Select arrival point</option>
              {AIRPORTS.map((a) => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </Select>
          </FormField>

          <FormField label="Arrival Flight Number">
            <Input
              value={data.arrivalFlightNumber}
              onChange={(e) => update("arrivalFlightNumber", e.target.value.toUpperCase())}
              placeholder="e.g. AI202"
            />
          </FormField>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Departure */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Plane className="h-4 w-4 text-navy rotate-180" />
          <h3 className="text-sm font-semibold text-navy uppercase tracking-wider">Departure</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Departure Date" error={errors.departureDate}>
            <Input
              type="date"
              value={data.departureDate}
              onChange={(e) => update("departureDate", e.target.value)}
              error={!!errors.departureDate}
            />
          </FormField>

          <FormField label="Departure Time">
            <Input
              type="time"
              value={data.departureTime}
              onChange={(e) => update("departureTime", e.target.value)}
            />
          </FormField>

          <FormField label="Departure Flight Number">
            <Input
              value={data.departureFlightNumber}
              onChange={(e) => update("departureFlightNumber", e.target.value.toUpperCase())}
              placeholder="e.g. AI203"
            />
          </FormField>
        </div>
      </div>

      <FormField label="Special Travel Notes">
        <Textarea
          value={data.specialTravelNotes}
          onChange={(e) => update("specialTravelNotes", e.target.value)}
          placeholder="Any special requirements, VIP protocols, or travel notes..."
          rows={3}
        />
      </FormField>
    </div>
  );
}
