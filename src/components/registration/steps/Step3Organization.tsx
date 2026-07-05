"use client";

import { useCallback } from "react";
import { FormField, Input, Select } from "../FormField";
import type { OrganizationInfo } from "@/types/registration";
import { getOrganizationTypes } from "@/services/registration";
import countriesData from "../../../../public/mock-data/countries.json";

const COUNTRIES = countriesData.countries.map((c) => c.name).sort();
const ORG_TYPES = getOrganizationTypes();

interface Errors { [key: string]: string }

interface Step3OrganizationProps {
  data: OrganizationInfo;
  onChange: (data: OrganizationInfo) => void;
  errors: Errors;
}

export default function Step3Organization({ data, onChange, errors }: Step3OrganizationProps) {
  const update = useCallback(
    (field: keyof OrganizationInfo, value: string) => {
      onChange({ ...data, [field]: value });
    },
    [data, onChange]
  );

  return (
    <div className="space-y-6">
      <div className="text-center pb-2">
        <h2 className="text-2xl font-light text-navy tracking-wide">Organization Details</h2>
        <p className="text-slate/70 text-sm mt-1">Provide your official organization information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Organization Name" required error={errors.organizationName} className="md:col-span-2">
          <Input
            value={data.organizationName}
            onChange={(e) => update("organizationName", e.target.value)}
            placeholder="e.g. Indian Coast Guard"
            error={!!errors.organizationName}
          />
        </FormField>

        <FormField label="Organization Type" required error={errors.organizationType}>
          <Select
            value={data.organizationType}
            onChange={(e) => update("organizationType", e.target.value)}
            error={!!errors.organizationType}
          >
            <option value="">Select type</option>
            {ORG_TYPES.map((t) => (
              <option key={t.id} value={t.value}>{t.label}</option>
            ))}
          </Select>
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

        <FormField label="Rank / Designation" required error={errors.rankDesignation}>
          <Input
            value={data.rankDesignation}
            onChange={(e) => update("rankDesignation", e.target.value)}
            placeholder="e.g. Vice Admiral, Director General"
            error={!!errors.rankDesignation}
          />
        </FormField>

        <FormField label="Department">
          <Input
            value={data.department}
            onChange={(e) => update("department", e.target.value)}
            placeholder="e.g. Operations, Policy & Planning"
          />
        </FormField>

        <FormField label="Official Email" hint="Official government / organization email">
          <Input
            type="email"
            value={data.officialEmail}
            onChange={(e) => update("officialEmail", e.target.value)}
            placeholder="official@organization.gov"
          />
        </FormField>

        <FormField label="Official ID Number" hint="Optional — service number, employee ID, etc.">
          <Input
            value={data.officialIdNumber}
            onChange={(e) => update("officialIdNumber", e.target.value)}
            placeholder="Service / Employee ID"
          />
        </FormField>
      </div>
    </div>
  );
}
