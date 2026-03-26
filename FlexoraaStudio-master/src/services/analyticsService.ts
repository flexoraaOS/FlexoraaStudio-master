import { apiClient } from './apiClient';

export interface CampaignSummary {
  uploaded: number;
  verified: number;
  engaged: number;
  hotLeads: number;
  qualifiedLeads: number;
  uploadedTrends?: string;
  engagedTrends?: string;
}

export interface ChartDataPoint {
  date: string;
  name: string;
  uploaded: number;
  verified: number;
  hotLeads: number;
  qualifiedLeads: number;
  verificationRate: number;
}

export interface RevenueMetrics {
  earnedRevenue: number;
  potentialRevenue: number;
  totalGoal: number;
}

export interface LeadStageData {
  stage: string;
  count: number;
  fill: string;
}

export const analyticsService = {
  // LeadOS endpoints
  getCampaignSummary: async (): Promise<CampaignSummary | null> => {
    return await apiClient.get<CampaignSummary>('/analytics/summary');
  },
  getCampaignChartData: async (fromDate: string, toDate: string): Promise<ChartDataPoint[]> => {
    return (await apiClient.get<ChartDataPoint[]>('/analytics/chart', { fromDate, toDate })) || [];
  },
  getRevenueMetrics: async (): Promise<RevenueMetrics | null> => {
    return await apiClient.get<RevenueMetrics>('/analytics/revenue');
  },
  getLeadStageDistribution: async (): Promise<LeadStageData[]> => {
    return (await apiClient.get<LeadStageData[]>('/analytics/lead-stages')) || [];
  },

  // AgentOS endpoints
  getAgentOsKpis: async (): Promise<any | null> => {
    return await apiClient.get<any>('/analytics/agentos-kpi');
  },
  getChannelVolume: async (): Promise<any[]> => {
    return (await apiClient.get<any[]>('/analytics/channel-volume')) || [];
  },
  getRoiData: async (): Promise<any[]> => {
    return (await apiClient.get<any[]>('/analytics/roi-data')) || [];
  }
};
