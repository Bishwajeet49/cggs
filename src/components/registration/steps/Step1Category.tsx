"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Shield, Globe, Camera, ChevronRight, List } from "lucide-react";
import type { DelegateCategory } from "@/types/registration";
import { getDelegateCategories } from "@/services/registration";
import CategoryOptionsModal from "../CategoryOptionsModal";

const STYLE_MAP: Record<
  DelegateCategory,
  {
    icon: React.ReactNode;
    gradient: string;
    borderColor: string;
    badgeColor: string;
  }
> = {
  head_of_delegation: {
    icon: <Crown className="h-7 w-7" />,
    gradient: "from-amber-50 to-yellow-50",
    borderColor: "border-gold",
    badgeColor: "bg-gold text-navy",
  },
  official_delegate: {
    icon: <Shield className="h-7 w-7" />,
    gradient: "from-blue-50 to-slate-50",
    borderColor: "border-navy",
    badgeColor: "bg-navy text-white",
  },
  observer: {
    icon: <Globe className="h-7 w-7" />,
    gradient: "from-teal-50 to-cyan-50",
    borderColor: "border-teal-400",
    badgeColor: "bg-teal-600 text-white",
  },
  media_representative: {
    icon: <Camera className="h-7 w-7" />,
    gradient: "from-slate-50 to-gray-50",
    borderColor: "border-slate-400",
    badgeColor: "bg-slate-600 text-white",
  },
};

interface Step1CategoryProps {
  selected: DelegateCategory | null;
  onSelect: (category: DelegateCategory) => void;
}

export default function Step1Category({ selected, onSelect }: Step1CategoryProps) {
  const [modalCategory, setModalCategory] = useState<DelegateCategory | null>(null);

  const categories = useMemo(() => {
    return getDelegateCategories().map((cat) => ({
      ...cat,
      ...STYLE_MAP[cat.id as DelegateCategory],
    }));
  }, []);

  const activeModal = categories.find((c) => c.id === modalCategory);

  return (
    <>
      <div className="space-y-6">
        <div className="text-center space-y-2 pb-2">
          <h2 className="text-2xl font-light text-navy tracking-wide">
            Select Your Delegate Category
          </h2>
          <p className="text-slate/70 text-sm">
            Choose the category that best describes your role at CGGS 2027
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat, index) => {
            const isSelected = selected === cat.id;
            const hiddenCount = Math.max(0, cat.all_roles.length - cat.examples.length);

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
                role="button"
                tabIndex={0}
                onClick={() => onSelect(cat.id as DelegateCategory)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(cat.id as DelegateCategory);
                  }
                }}
                className={`relative cursor-pointer text-left rounded-lg border-2 p-6 transition-all duration-300 group overflow-hidden ${
                  isSelected
                    ? `${cat.borderColor} bg-gradient-to-br ${cat.gradient} shadow-lg`
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-navy flex items-center justify-center"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}

                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 w-14 h-14 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      isSelected ? cat.badgeColor : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}
                  >
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-navy text-base leading-tight">{cat.title}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${cat.badgeColor}`}>
                        {cat.badge}
                      </span>
                    </div>
                    <p className="text-sm text-slate/80 leading-relaxed mb-3">{cat.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.examples.map((ex) => (
                        <span
                          key={ex}
                          className="text-xs px-2 py-0.5 rounded-full bg-navy/5 text-navy/70 border border-navy/10"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>

                    {hiddenCount > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalCategory(cat.id as DelegateCategory);
                        }}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:text-gold-dark transition-colors cursor-pointer"
                      >
                        <List className="h-3.5 w-3.5" />
                        View all {cat.all_roles.length} roles
                      </button>
                    )}
                  </div>
                </div>

                <div
                  className={`absolute bottom-0 right-0 p-2 transition-opacity duration-300 ${
                    isSelected ? "opacity-0" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-xs text-slate/50">
          Selecting a category will automatically advance to the next step
        </p>
      </div>

      {activeModal && (
        <CategoryOptionsModal
          isOpen={modalCategory !== null}
          onClose={() => setModalCategory(null)}
          title={activeModal.title}
          badge={activeModal.badge}
          badgeColor={activeModal.badgeColor}
          roles={activeModal.all_roles}
        />
      )}
    </>
  );
}
