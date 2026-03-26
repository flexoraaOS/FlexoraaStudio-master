import { apiClient } from './apiClient';

export interface SdrPerformance {
  name: string;
  avatar: string;
  avatarHint: string;
  assigned: number;
  contacted: number;
  closed: number;
  followUps: number;
  closeRate: number;
  revenueAdded: number;
}

export interface Appointment {
  id: string;
  date: Date;
  time: string;
  leadId: string;
  with: string;
  conversation: string;
}

export const agentService = {
  getSdrLeaderboard: async (): Promise<SdrPerformance[]> => {
    const data = await apiClient.get<SdrPerformance[]>('/agents/sdr-leaderboard');
    return data || [];
  },

  getAppointments: async (dateString: string): Promise<Appointment[]> => {
    const data = await apiClient.get<any[]>('/agents/appointments', { date: dateString });
    return data ? data.map((app: any) => ({...app, date: new Date(app.date)})) : [];
  }
};
