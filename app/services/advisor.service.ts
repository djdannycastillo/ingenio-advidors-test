
import { Advisor, AdvisorAvailability } from '@/app/types/advisor';
import { ADVISORS_MOCK } from '../data/advisor.mock';

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomBoolean(): boolean {
  return Math.random() >= 0.5;
}

export async function getAdvisors(): Promise<Advisor[]> {
  await delay(500);
  return ADVISORS_MOCK;
}

export async function getAdvisorAvailability(
  advisorId: number
): Promise<AdvisorAvailability> {
  await delay(Math.floor(Math.random() * 500));

  return {
    advisorId,
    callAvailable: randomBoolean(),
    chatAvailable: randomBoolean(),
  };
}