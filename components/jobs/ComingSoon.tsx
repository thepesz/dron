import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Clock } from "lucide-react";

/**
 * Displayed on all /jobs routes when NEXT_PUBLIC_JOBS_ENABLED !== 'true'.
 * Replace with full jobs board once ready.
 */
export function ComingSoon() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 pt-[88px] lg:pt-[96px]">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-600/10">
            <Clock className="h-10 w-10 text-brand-500" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white">
            Dostępne wkrótce
          </h1>
          <p className="mb-8 text-slate-400">
            Tablica zleceń dronowych jest w przygotowaniu.
            Zapraszamy wkrótce!
          </p>
          <a
            href="/"
            className="inline-flex items-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Wróć na stronę główną
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
