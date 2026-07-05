interface StatusBadgeProps {
  dot: string;
  label: string;
  badge: string;
  pulse?: boolean;
  size?: "sm" | "md";
}

export default function TravelStatusBadge({ dot, label, badge, pulse, size = "md" }: StatusBadgeProps) {
  const textSize = size === "sm" ? "text-[10px]" : "text-xs";
  const dotSize = size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";
  const px = size === "sm" ? "px-2 py-0.5" : "px-3 py-1.5";

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border ${px} ${textSize} font-semibold ${badge}`}>
      <span className={`shrink-0 rounded-full ${dotSize} ${dot} ${pulse ? "animate-pulse" : ""}`} />
      {label}
    </span>
  );
}
