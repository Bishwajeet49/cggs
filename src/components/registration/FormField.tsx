"use client";

import { type ReactNode } from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  hint?: string;
  className?: string;
}

export function FormField({ label, required, error, children, hint, className = "" }: FormFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-sm font-medium text-navy">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-slate/70">{hint}</p>}
      {error && <p className="text-xs text-red-500 flex items-center gap-1">{error}</p>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className = "", ...props }: InputProps) {
  const hasWidth = /\b(w-|flex-|min-w-|max-w-)/.test(className);
  return (
    <input
      {...props}
      className={`${hasWidth ? "" : "w-full"} px-4 py-3 rounded-sm border text-sm text-navy bg-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold ${
        error ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
      } ${className}`}
    />
  );
}

interface PhoneInputProps {
  countryCode: string;
  mobileNumber: string;
  onCountryCodeChange: (value: string) => void;
  onMobileNumberChange: (value: string) => void;
  error?: boolean;
  countryCodes: { code: string; country: string; flag: string }[];
}

export function PhoneInput({
  countryCode,
  mobileNumber,
  onCountryCodeChange,
  onMobileNumberChange,
  error = false,
  countryCodes,
}: PhoneInputProps) {
  return (
    <div
      className={`flex items-stretch rounded-sm border bg-white overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-gold/50 focus-within:border-gold ${
        error ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <select
        value={countryCode}
        onChange={(e) => onCountryCodeChange(e.target.value)}
        aria-label="Country code"
        className="shrink-0 w-[7.25rem] px-3 py-3 text-sm text-navy bg-gray-50 border-0 border-r border-gray-200 appearance-none cursor-pointer focus:outline-none focus:ring-0"
      >
        {countryCodes.map((cc) => (
          <option key={cc.code} value={cc.code}>
            {cc.flag} {cc.code}
          </option>
        ))}
      </select>
      <input
        type="tel"
        value={mobileNumber}
        onChange={(e) => onMobileNumberChange(e.target.value.replace(/\D/g, ""))}
        placeholder="Enter mobile number"
        className="flex-1 min-w-0 px-4 py-3 text-sm text-navy bg-transparent border-0 placeholder-gray-400 focus:outline-none focus:ring-0"
      />
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export function Select({ error, className = "", children, ...props }: SelectProps) {
  const hasWidth = /\b(w-|flex-|min-w-|max-w-)/.test(className);
  return (
    <select
      {...props}
      className={`${hasWidth ? "" : "w-full"} px-4 py-3 rounded-sm border text-sm text-navy bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold appearance-none cursor-pointer ${
        error ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
      } ${className}`}
    >
      {children}
    </select>
  );
}

export function Textarea({
  error,
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return (
    <textarea
      {...props}
      className={`w-full px-4 py-3 rounded-sm border text-sm text-navy bg-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none ${
        error ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
      } ${className}`}
    />
  );
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | ReactNode;
}

export function Checkbox({ label, className = "", ...props }: CheckboxProps) {
  return (
    <label className={`flex items-start gap-3 cursor-pointer group ${className}`}>
      <div className="relative mt-0.5">
        <input
          type="checkbox"
          {...props}
          className="sr-only peer"
        />
        <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:bg-navy peer-checked:border-navy transition-all duration-200 flex items-center justify-center group-hover:border-navy/60">
          <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <span className="text-sm text-navy/80 leading-relaxed">{label}</span>
    </label>
  );
}
