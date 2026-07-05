"use client";

import { motion } from "framer-motion";
import { Anchor, Presentation, Building2, Star, Wine, Utensils, Music, Flag, Award } from "lucide-react";
import { getRegistrationEvents } from "@/services/registration";

const iconMap: Record<string, React.ReactNode> = {
  anchor: <Anchor className="h-5 w-5" />,
  presentation: <Presentation className="h-5 w-5" />,
  building: <Building2 className="h-5 w-5" />,
  star: <Star className="h-5 w-5" />,
  glass: <Wine className="h-5 w-5" />,
  utensils: <Utensils className="h-5 w-5" />,
  music: <Music className="h-5 w-5" />,
  flag: <Flag className="h-5 w-5" />,
  award: <Award className="h-5 w-5" />,
};

const EVENTS = getRegistrationEvents();

interface Step6EventsProps {
  selected: string[];
  onChange: (events: string[]) => void;
}

export default function Step6Events({ selected, onChange }: Step6EventsProps) {
  const toggle = (id: string) => {
    const updated = selected.includes(id)
      ? selected.filter((e) => e !== id)
      : [...selected, id];
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center pb-2">
        <h2 className="text-2xl font-light text-navy tracking-wide">Event Participation</h2>
        <p className="text-slate/70 text-sm mt-1">
          Select the events you plan to attend. You may choose multiple events.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
        <strong>{selected.length}</strong> event{selected.length !== 1 ? "s" : ""} selected
        {selected.length === 0 && " — select at least one event you plan to attend"}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {EVENTS.map((event, index) => {
          const isSelected = selected.includes(event.id);
          return (
            <motion.button
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => toggle(event.id)}
              className={`relative text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? "border-navy bg-navy text-white shadow-md"
                  : "border-gray-200 bg-white text-navy hover:border-navy/40 hover:shadow-sm"
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                  <svg className="w-3 h-3 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${isSelected ? "bg-white/20" : "bg-navy/8"}`}>
                <span className={isSelected ? "text-white" : "text-navy"}>
                  {iconMap[event.icon] ?? <Star className="h-5 w-5" />}
                </span>
              </div>
              <h4 className={`font-semibold text-sm leading-snug mb-1 ${isSelected ? "text-white" : "text-navy"}`}>
                {event.title}
              </h4>
              <p className={`text-xs ${isSelected ? "text-white/70" : "text-slate/70"}`}>
                {event.date}
              </p>
              <p className={`text-xs mt-0.5 ${isSelected ? "text-white/60" : "text-slate/50"}`}>
                {event.location}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
