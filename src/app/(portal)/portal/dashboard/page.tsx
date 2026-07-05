export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
        <p className="text-sm text-slate mt-1">
          Welcome to the CGGS 2027 Delegate Portal
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {["My Schedule", "QR Pass", "Today's Events", "Notifications", "Accommodation", "Transport"].map(
          (item) => (
            <div
              key={item}
              className="p-5 bg-white rounded-sm border border-gray-100 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">
                {item}
              </p>
              <p className="text-sm text-slate">Coming soon — content will appear here.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
