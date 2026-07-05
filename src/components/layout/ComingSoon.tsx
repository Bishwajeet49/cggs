import Link from "next/link";
import { Clock } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
        <Clock className="h-8 w-8 text-gold" strokeWidth={1.5} />
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Coming Soon
      </p>

      <h1 className="text-3xl font-bold text-navy sm:text-4xl">{title}</h1>

      {description && (
        <p className="mt-4 max-w-md text-base text-slate">{description}</p>
      )}

      <p className="mt-6 max-w-sm text-sm text-slate-light">
        This section is currently being prepared for the 5th Coast Guard Global
        Summit 2027. Check back soon.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-sm bg-navy px-6 py-3 text-sm font-medium text-white hover:bg-navy-mid transition-colors"
        >
          ← Back to Home
        </Link>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-sm border border-navy px-6 py-3 text-sm font-medium text-navy hover:bg-cream transition-colors"
        >
          Register as Delegate
        </Link>
      </div>
    </section>
  );
}
