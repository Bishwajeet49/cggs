interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${
            light ? "text-gold" : "text-gold"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-2xl font-bold sm:text-3xl lg:text-4xl leading-tight ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed ${
            light ? "text-white/70" : "text-slate"
          } ${center ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-0.5 w-16 bg-gold ${center ? "mx-auto" : ""}`}
      />
    </div>
  );
}
