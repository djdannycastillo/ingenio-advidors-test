import { Advisor } from '@/app/types/advisor';
import { AdvisorCard } from './AdvisorCard';

type AdvisorsListProps = {
  advisors: Advisor[];
};

export function AdvisorsList({ advisors }: AdvisorsListProps) {
  if (!advisors.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        No advisors found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {advisors.map((advisor) => (
        <AdvisorCard key={advisor.id} advisor={advisor} />
      ))}
    </div>
  );
}