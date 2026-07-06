"use client";

import Image from "next/image";
import type { MockUser } from "@/types/auth";
import { getInitials } from "@/services/demoAuth";

const SIZE_MAP = {
  xs: { box: "h-6 w-6", text: "text-[9px]", img: 24 },
  sm: { box: "h-8 w-8", text: "text-xs", img: 32 },
  md: { box: "h-10 w-10", text: "text-sm", img: 40 },
  lg: { box: "h-[88px] w-[88px]", text: "text-3xl", img: 88 },
};

interface DelegateAvatarProps {
  user: MockUser | null;
  size?: keyof typeof SIZE_MAP;
  className?: string;
  ring?: boolean;
}

export default function DelegateAvatar({
  user,
  size = "md",
  className = "",
  ring = false,
}: DelegateAvatarProps) {
  const cfg = SIZE_MAP[size];
  const initials = user
    ? getInitials(user.firstName, user.lastName)
    : "DL";

  const ringClass = ring ? "ring-4 ring-gold/10" : "";

  if (user?.profilePhotoUrl) {
    const isDataUrl = user.profilePhotoUrl.startsWith("data:");
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-full border-2 border-gold/45 bg-navy-mid ${cfg.box} ${ringClass} ${className}`}
      >
        <Image
          src={user.profilePhotoUrl}
          alt={initials}
          width={cfg.img}
          height={cfg.img}
          unoptimized={isDataUrl}
          className="h-full w-full object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-gold/45 bg-navy-mid font-bold text-gold ${cfg.box} ${cfg.text} ${ringClass} ${className}`}
    >
      {initials}
    </div>
  );
}
