"use client";

import {
  Hotel,
  Plane,
  Car,
  Utensils,
  User,
  MapPin,
  ExternalLink,
  Navigation,
  Star,
  Coffee,
  Moon,
  Wine,
  Shield,
  Cloud,
  Phone,
  Heart,
  AlertTriangle,
  Shirt,
  FileText,
  Lock,
  Check,
  Mail,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Anchor,
  Building2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  hotel: Hotel,
  plane: Plane,
  car: Car,
  utensils: Utensils,
  user: User,
  coffee: Coffee,
  cup: Coffee,
  moon: Moon,
  wine: Wine,
  star: Star,
  passport: FileText,
  alert: AlertTriangle,
  shield: Shield,
  shirt: Shirt,
  cloud: Cloud,
  phone: Phone,
  heart: Heart,
};

export function getTravelIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? MapPin;
}

export function StarRating({ rating }: { rating: number }) {
  if (rating <= 0) return null;
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} star rating`}>
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
      ))}
    </div>
  );
}
