"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Shield, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  getDemoDelegates,
  demoDelegateToMockUser,
  validateDemoCredentials,
} from "@/services/demoAuth";
import type { DemoDelegate } from "@/types/auth";
import { getCountryByName } from "@/services/countries";

export default function DelegateLoginForm() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const demoDelegates = getDemoDelegates();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/portal/dashboard");
    }
  }, [isAuthenticated, router]);

  const handlePrefill = (delegate: DemoDelegate) => {
    setSelectedDemo(delegate.id);
    setEmail(delegate.email);
    setPassword(delegate.password);
    setError("");
  };

  const handleLogin = async (delegate?: DemoDelegate) => {
    setError("");
    setLoading(true);

    const match = delegate ?? validateDemoCredentials(email, password);
    if (!match) {
      setError("Invalid email or password. Select a demo delegate or use the provided credentials.");
      setLoading(false);
      return;
    }

    login(demoDelegateToMockUser(match));
    await new Promise((r) => setTimeout(r, 600));
    router.push("/portal/dashboard");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleLogin();
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Brand panel */}
          <div
            className="relative flex flex-col justify-between bg-navy p-8 text-white lg:col-span-2 lg:p-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,168,76,0.065) 40px, rgba(201,168,76,0.065) 41px)",
            }}
          >
            <div>
              <div className="mb-6 flex items-center gap-3">
                <Image
                  src="/logos/5h_cggs_summit_logo.png"
                  alt="CGGS 2027"
                  width={56}
                  height={56}
                  className="h-14 w-14 object-contain"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">CGGS 2027</p>
                  <p className="text-sm text-white/60">Delegate Portal</p>
                </div>
              </div>
              <h1 className="text-2xl font-light tracking-wide sm:text-3xl">
                Secure <span className="font-bold text-gold">Delegate Access</span>
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Sign in to manage your summit schedule, travel, registration, and official credentials.
              </p>
            </div>

            <div className="mt-8 hidden rounded-xl border border-white/10 bg-white/6 p-4 lg:block">
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-white">Prototype Login</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/50">
                    Phase 1 uses demo delegate accounts. Select a profile below or enter the prefilled credentials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form panel */}
          <div className="p-6 sm:p-8 lg:col-span-3 lg:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              Delegate Sign In
            </p>
            <h2 className="mt-1 text-xl font-bold text-navy">Welcome back</h2>

            {/* Demo delegate selection */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate/50">
                Quick Demo Access
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {demoDelegates.map((delegate) => {
                  const country = getCountryByName(delegate.country);
                  const isSelected = selectedDemo === delegate.id;
                  return (
                    <button
                      key={delegate.id}
                      type="button"
                      onClick={() => handlePrefill(delegate)}
                      className={`group flex items-center gap-3 rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${
                        isSelected
                          ? "border-gold bg-gold/5 shadow-sm ring-1 ring-gold/30"
                          : "border-gray-100 bg-gray-50/50 hover:border-gold/25"
                      }`}
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white">
                        <Image
                          src={delegate.profilePhotoUrl}
                          alt={delegate.demoLabel}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-navy">
                          {delegate.title} {delegate.lastName}
                        </p>
                        <p className="truncate text-xs text-slate/60">{delegate.organization}</p>
                        <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-gold">
                          {country?.flag} {delegate.demoLabel}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate/60">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate/40" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="delegate@organization.gov"
                    autoComplete="email"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-navy outline-none transition-colors focus:border-gold/50 focus:ring-2 focus:ring-gold/15"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate/60">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate/40" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-navy outline-none transition-colors focus:border-gold/50 focus:ring-2 focus:ring-gold/15"
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In to Portal
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {selectedDemo && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    const delegate = demoDelegates.find((d) => d.id === selectedDemo);
                    if (delegate) void handleLogin(delegate);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-4 py-2.5 text-xs font-semibold text-gold-dark transition-colors hover:bg-gold/20 disabled:opacity-60"
                >
                  Sign in as selected delegate
                </button>
              )}
            </form>

            <p className="mt-6 text-center text-xs text-slate/50">
              Demo password for both accounts: <span className="font-mono font-semibold text-navy">cggs2027</span>
            </p>

            <p className="mt-4 text-center text-xs text-slate/45">
              New delegate?{" "}
              <Link href="/register" className="font-semibold text-gold hover:underline">
                Register for CGGS 2027
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
