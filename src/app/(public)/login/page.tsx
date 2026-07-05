import type { Metadata } from "next";
import DelegateLoginForm from "@/components/auth/DelegateLoginForm";

export const metadata: Metadata = {
  title: "Delegate Login",
  description: "Sign in to the CGGS 2027 Delegate Portal.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-var(--header-height))] bg-linear-to-b from-[#F0F4F8] to-white">
      <DelegateLoginForm />
    </div>
  );
}
