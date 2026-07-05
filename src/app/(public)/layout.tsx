import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/layout/LenisProvider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LenisProvider />
      <Header />
      <main className="min-h-screen overflow-x-clip pt-[var(--header-height)]">{children}</main>
      <Footer />
    </>
  );
}
