"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import StepIndicator from "./StepIndicator";
import Step1Category from "./steps/Step1Category";
import Step2Personal from "./steps/Step2Personal";
import Step3Organization from "./steps/Step3Organization";
import Step4Travel from "./steps/Step4Travel";
import Step5Accommodation from "./steps/Step5Accommodation";
import Step6Events from "./steps/Step6Events";
import Step7Emergency from "./steps/Step7Emergency";
import Step8Review from "./steps/Step8Review";
import { EMPTY_REGISTRATION, type RegistrationFormData, type DelegateCategory } from "@/types/registration";
import { submitRegistration } from "@/services/registration";

type ValidationErrors = Record<string, string>;

function validateStep(step: number, data: RegistrationFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (step === 0) {
    if (!data.category) errors.category = "Please select a delegate category";
  }

  if (step === 1) {
    const p = data.personal;
    if (!p.firstName.trim()) errors.firstName = "First name is required";
    if (!p.lastName.trim()) errors.lastName = "Last name is required";
    if (!p.gender) errors.gender = "Please select gender";
    if (!p.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    if (!p.nationality) errors.nationality = "Nationality is required";
    if (!p.passportNumber.trim()) errors.passportNumber = "Passport number is required";
    if (!p.passportExpiry) errors.passportExpiry = "Passport expiry is required";
    if (!p.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!p.mobileNumber.trim()) {
      errors.mobileNumber = "Mobile number is required";
    } else if (p.mobileNumber.length < 7) {
      errors.mobileNumber = "Please enter a valid mobile number";
    }
  }

  if (step === 2) {
    const o = data.organization;
    if (!o.organizationName.trim()) errors.organizationName = "Organization name is required";
    if (!o.organizationType) errors.organizationType = "Organization type is required";
    if (!o.country) errors.country = "Country is required";
    if (!o.rankDesignation.trim()) errors.rankDesignation = "Rank / Designation is required";
  }

  if (step === 6) {
    const e = data.emergency;
    if (!e.fullName.trim()) errors.fullName = "Emergency contact name is required";
    if (!e.relationship) errors.relationship = "Relationship is required";
    if (!e.phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
    if (!e.country) errors.country = "Country is required";
  }

  if (step === 7) {
    const d = data.declaration;
    if (!d.infoCorrect || !d.privacyPolicy || !d.termsConditions) {
      errors.declaration = "Please accept all declarations to submit";
    }
  }

  return errors;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
  }),
};

export default function RegistrationWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<RegistrationFormData>(EMPTY_REGISTRATION);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goNext = useCallback(() => {
    const errs = validateStep(step, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setDirection(1);
    setStep((s) => Math.min(s + 1, 7));
  }, [step, data]);

  const goPrev = useCallback(() => {
    setErrors({});
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const handleCategorySelect = useCallback((category: DelegateCategory) => {
    setData((prev) => ({ ...prev, category }));
    setErrors({});
    setDirection(1);
    setTimeout(() => setStep(1), 200);
  }, []);

  const handleSubmit = useCallback(async () => {
    const errs = validateStep(7, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    const registered = submitRegistration(data);
    router.push(`/register/success?id=${registered.delegateId}&reg=${registered.registrationNumber}`);
  }, [data, router]);

  const updatePersonal = useCallback(
    (personal: RegistrationFormData["personal"]) => setData((d) => ({ ...d, personal })),
    []
  );
  const updateOrg = useCallback(
    (organization: RegistrationFormData["organization"]) => setData((d) => ({ ...d, organization })),
    []
  );
  const updateTravel = useCallback(
    (travel: RegistrationFormData["travel"]) => setData((d) => ({ ...d, travel })),
    []
  );
  const updateAccommodation = useCallback(
    (accommodation: RegistrationFormData["accommodation"]) => setData((d) => ({ ...d, accommodation })),
    []
  );
  const updateEvents = useCallback(
    (selectedEvents: string[]) => setData((d) => ({ ...d, selectedEvents })),
    []
  );
  const updateEmergency = useCallback(
    (emergency: RegistrationFormData["emergency"]) => setData((d) => ({ ...d, emergency })),
    []
  );
  const updateDeclaration = useCallback(
    (field: keyof RegistrationFormData["declaration"], value: boolean) =>
      setData((d) => ({ ...d, declaration: { ...d.declaration, [field]: value } })),
    []
  );

  const isLastStep = step === 7;
  const isFirstStep = step === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F4F8] to-white pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-gold uppercase mb-3">
            5th Coast Guard Global Summit
          </span>
          <h1 className="text-3xl md:text-4xl font-light text-navy tracking-wide">
            Delegate Registration
          </h1>
          <p className="text-slate/60 text-sm mt-2">
            Chennai, India · February 2027
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={step} />

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Step content */}
          <div className="p-6 md:p-10 min-h-[480px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {step === 0 && (
                  <Step1Category
                    selected={data.category}
                    onSelect={handleCategorySelect}
                  />
                )}
                {step === 1 && (
                  <Step2Personal
                    data={data.personal}
                    onChange={updatePersonal}
                    errors={errors}
                  />
                )}
                {step === 2 && (
                  <Step3Organization
                    data={data.organization}
                    onChange={updateOrg}
                    errors={errors}
                  />
                )}
                {step === 3 && (
                  <Step6Events
                    selected={data.selectedEvents}
                    onChange={updateEvents}
                  />
                )}
                {step === 4 && (
                  <Step4Travel
                    data={data.travel}
                    onChange={updateTravel}
                    errors={errors}
                  />
                )}
                {step === 5 && (
                  <Step5Accommodation
                    data={data.accommodation}
                    onChange={updateAccommodation}
                    errors={errors}
                  />
                )}
                {step === 6 && (
                  <Step7Emergency
                    data={data.emergency}
                    onChange={updateEmergency}
                    errors={errors}
                  />
                )}
                {step === 7 && (
                  <Step8Review
                    data={data}
                    errors={errors}
                    onDeclarationChange={updateDeclaration}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {step > 0 && (
            <div className="px-6 md:px-10 py-5 border-t border-gray-50 flex items-center justify-between bg-gray-50/50">
              <button
                onClick={goPrev}
                disabled={isSubmitting}
                className="flex items-center gap-2 text-sm font-medium text-slate hover:text-navy transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div>
                {isLastStep ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-3 bg-navy text-white text-sm font-semibold rounded-sm hover:bg-navy-mid transition-colors disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Registration"
                    )}
                  </button>
                ) : (
                  <button
                    onClick={goNext}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-3 bg-navy text-white text-sm font-semibold rounded-sm hover:bg-navy-mid transition-colors"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate/40 mt-6">
          Your data is protected by the CGGS 2027 Privacy Policy · All fields marked * are mandatory
        </p>
      </div>
    </div>
  );
}
