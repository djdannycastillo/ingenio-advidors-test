import { AdvisorsList } from "../components/advisors/AdvisorList";
import { getAdvisors } from "../services/advisor.service";

export default async function AdvisorsPage() {
  const advisors = await getAdvisors();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-600">
            INGENIO
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Advisors
          </h1>
        </header>

        <AdvisorsList advisors={advisors} />
      </div>
    </main>
  );
}