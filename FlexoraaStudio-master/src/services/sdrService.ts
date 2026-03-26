import { apiClient } from './apiClient';

export const sdrService = {
  getLeadOsSdrKpis: async (): Promise<any | null> => {
    return await apiClient.get<any>('/sdr/leados/kpis');
  },
  getLeadOsSdrPerformance: async (): Promise<any[]> => {
    return (await apiClient.get<any[]>('/sdr/leados/performance')) || [];
  },
  getLeadOsSdrCalls: async (): Promise<any[]> => {
    return (await apiClient.get<any[]>('/sdr/leados/calls')) || [];
  },
  getLeadOsSdrMessages: async (): Promise<any[]> => {
    return (await apiClient.get<any[]>('/sdr/leados/messages')) || [];
  },
  
  getAgentOsSdrKpis: async (): Promise<any | null> => {
     return await apiClient.get<any>('/sdr/agentos/kpis');
  },
  getAgentOsSdrConversations: async (): Promise<any[]> => {
      return (await apiClient.get<any[]>('/sdr/agentos/conversations')) || [];
  },
  getAgentOsSdrAppointments: async (): Promise<any[]> => {
      return (await apiClient.get<any[]>('/sdr/agentos/appointments')) || [];
  }
};
