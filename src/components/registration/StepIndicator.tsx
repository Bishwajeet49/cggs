"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  label: string;
  short: string;
}

const STEPS: Step[] = [
  { label: "Category", short: "Cat" },
  { label: "Personal", short: "Per" },
  { label: "Organisation", short: "Org" },
];

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full px-2 py-6">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between relative">
        <div className="absolute top-5 left-0 right-0 h-px bg-gray-200 z-0" />
        <motion.div
          className="absolute top-5 left-0 h-px bg-gold z-0"
          initial={{ width: "0%" }}
          animate={{
            width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          return (
            <div key={step.label} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? "bg-gold border-gold text-navy"
                    : isActive
                    ? "bg-navy border-navy text-white shadow-lg shadow-navy/30"
                    : "bg-white border-gray-200 text-gray-400"
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
              </motion.div>
              <span
                className={`mt-2 text-xs font-medium tracking-wide whitespace-nowrap ${
                  isActive ? "text-navy" : isCompleted ? "text-gold" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center gap-3">
        <div className="flex gap-1">
          {STEPS.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index < currentStep
                  ? "bg-gold w-4"
                  : index === currentStep
                  ? "bg-navy w-6"
                  : "bg-gray-200 w-2"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-navy ml-2">
          Step {currentStep + 1} of {STEPS.length} — {STEPS[currentStep].label}
        </span>
      </div>
    </div>
  );
}
