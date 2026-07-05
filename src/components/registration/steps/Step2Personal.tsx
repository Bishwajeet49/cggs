"use client";

import { useState, useCallback } from "react";
import { Upload, User } from "lucide-react";
import { motion } from "framer-motion";
import { FormField, Input, Select, PhoneInput } from "../FormField";
import type { PersonalInfo } from "@/types/registration";
import { COUNTRY_CODES } from "@/types/registration";
import countriesData from "../../../../public/mock-data/countries.json";

const COUNTRIES = countriesData.countries.map((c) => c.name).sort();

const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];

interface Errors {
  [key: string]: string;
}

interface Step2PersonalProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  errors: Errors;
}

export default function Step2Personal({ data, onChange, errors }: Step2PersonalProps) {
  const [photoPreview, setPhotoPreview] = useState<string>(data.profilePhotoUrl || "");

  const update = useCallback(
    (field: keyof PersonalInfo, value: string) => {
      onChange({ ...data, [field]: value });
    },
    [data, onChange]
  );

  const handlePhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target?.result as string;
        setPhotoPreview(url);
        onChange({ ...data, profilePhotoUrl: url });
      };
      reader.readAsDataURL(file);
    },
    [data, onChange]
  );

  return (
    <div className="space-y-6">
      <div className="text-center pb-2">
        <h2 className="text-2xl font-light text-navy tracking-wide">Personal Information</h2>
        <p className="text-slate/70 text-sm mt-1">Provide your personal details as per your passport</p>
      </div>

      {/* Photo upload */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="w-28 h-28 rounded-full border-4 border-gold/30 overflow-hidden bg-gray-100 flex items-center justify-center">
            {photoPreview ? (
              <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="h-12 w-12 text-gray-300" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-navy flex items-center justify-center cursor-pointer hover:bg-navy-mid transition-colors shadow-md">
            <Upload className="h-3.5 w-3.5 text-white" />
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handlePhotoUpload}
              className="sr-only"
            />
          </label>
        </motion.div>
      </div>
      <p className="text-center text-xs text-slate/50 -mt-2">Upload profile photograph (PNG, JPG, JPEG)</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="First Name" required error={errors.firstName}>
          <Input
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            placeholder="As per passport"
            error={!!errors.firstName}
          />
        </FormField>

        <FormField label="Last Name" required error={errors.lastName}>
          <Input
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            placeholder="As per passport"
            error={!!errors.lastName}
          />
        </FormField>

        <FormField label="Gender" required error={errors.gender}>
          <Select
            value={data.gender}
            onChange={(e) => update("gender", e.target.value)}
            error={!!errors.gender}
          >
            <option value="">Select gender</option>
            {GENDER_OPTIONS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="Date of Birth" required error={errors.dateOfBirth}>
          <Input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => update("dateOfBirth", e.target.value)}
            error={!!errors.dateOfBirth}
          />
        </FormField>

        <FormField label="Nationality" required error={errors.nationality}>
          <Select
            value={data.nationality}
            onChange={(e) => update("nationality", e.target.value)}
            error={!!errors.nationality}
          >
            <option value="">Select nationality</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="Passport Number" required error={errors.passportNumber}>
          <Input
            value={data.passportNumber}
            onChange={(e) => update("passportNumber", e.target.value.toUpperCase())}
            placeholder="e.g. A1234567"
            error={!!errors.passportNumber}
          />
        </FormField>

        <FormField label="Passport Expiry Date" required error={errors.passportExpiry}>
          <Input
            type="date"
            value={data.passportExpiry}
            onChange={(e) => update("passportExpiry", e.target.value)}
            error={!!errors.passportExpiry}
          />
        </FormField>

        <FormField label="Email Address" required error={errors.email}>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="official@organization.gov"
            error={!!errors.email}
          />
        </FormField>

        <FormField label="Mobile Number" required error={errors.mobileNumber}>
          <PhoneInput
            countryCode={data.countryCode}
            mobileNumber={data.mobileNumber}
            onCountryCodeChange={(value) => update("countryCode", value)}
            onMobileNumberChange={(value) => update("mobileNumber", value)}
            error={!!errors.mobileNumber}
            countryCodes={COUNTRY_CODES}
          />
        </FormField>
      </div>
    </div>
  );
}
