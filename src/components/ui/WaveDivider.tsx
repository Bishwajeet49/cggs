interface WaveDividerProps {
  /** CSS colour string for the wave shape fill */
  fill: string;
  /** Flip vertically so waves open upward instead of downward */
  flip?: boolean;
  className?: string;
}

/**
 * Full-width SVG wave that bridges two sections.
 * Place directly between two sections; the parent sections must handle their
 * own background colours so the wave blends seamlessly.
 */
export default function WaveDivider({ fill, flip = false, className = "" }: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] pointer-events-none ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-12 sm:h-16"
      >
        <path
          d="M0,0 C180,64 360,0 540,32 C720,64 900,0 1080,32 C1260,64 1380,16 1440,32 L1440,64 L0,64 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
