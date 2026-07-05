"use client";

export default function RegistrationPageSkeleton() {
  return (
    <div className="animate-pulse space-y-5 sm:space-y-6">
      <div className="h-64 rounded-2xl bg-navy/20" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 rounded-xl bg-gray-200" />
        ))}
      </div>
      <div className="h-48 rounded-2xl bg-gray-200" />
      <div className="h-72 rounded-2xl bg-gray-200" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-52 rounded-2xl bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
