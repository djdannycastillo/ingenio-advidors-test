export interface Advisor {
  id: number;
  name: string;
  avatar: string;
  pricePerMinute: number;
}

export interface AdvisorAvailability {
  advisorId: number;
  callAvailable: boolean;
  chatAvailable: boolean;
}
