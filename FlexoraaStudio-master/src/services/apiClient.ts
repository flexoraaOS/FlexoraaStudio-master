import { env } from '@/config/env';
import { mockDataStore } from './mockData';

// Feature flag allowing seamless transition from mocked data to real API endpoints
export const USE_MOCK_API = false; 

/**
 * Base API Client definition.
 * All service layer requests route through this wrapper.
 */
export const apiClient = {
  get: async <T>(url: string, params?: Record<string, string>): Promise<T | null> => {
    try {
      if (USE_MOCK_API) {
        // Simulate network latency (400ms)
        await new Promise(resolve => setTimeout(resolve, 400));
        
        switch(url) {
            case '/analytics/summary': return mockDataStore.campaignSummary as T;
            case '/analytics/chart': return mockDataStore.campaignChartData as T;
            case '/analytics/revenue': return mockDataStore.revenueMetrics as T;
            case '/analytics/lead-stages': return mockDataStore.leadStages as T;
            case '/agents/sdr-leaderboard': return mockDataStore.sdrLeaderboard as T;
            case '/agents/appointments': return mockDataStore.appointments as T;
            case '/analytics/agentos-kpi': return mockDataStore.agentOsKpis as T;
            case '/analytics/channel-volume': return mockDataStore.channelVolumeData as T;
            case '/analytics/roi-data': return mockDataStore.roiData as T;
            default:
                console.warn(`[Mock API] Endpoint not found: ${url}`);
                return null;
        }
      }

      // --- REAL API FETCH LOGIC BELOW ---
      const queryString = params ? new URLSearchParams(params).toString() : '';
      const fullUrl = `${env.apiUrl}${url}${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(fullUrl, {
          // headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) {
          console.warn(`[API] fetch failed for ${url}, returning null for gracefully empty UI.`)
          return null;
      }
      return await response.json();
      
    } catch (error) {
      console.warn(`[API] request to ${url} failed, returning null:`, error);
      return null; // Swallow error to force graceful "0" and Empty states on the UI
    }
  },

  post: async <T>(url: string, data: any): Promise<T | null> => {
    try {
      if (USE_MOCK_API) {
          await new Promise(resolve => setTimeout(resolve, 600));
          return { success: true, ...data } as T;
      }
        
      const fullUrl = `${env.apiUrl}${url}`;
      const response = await fetch(fullUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });
      if (!response.ok) {
           console.warn(`[API] POST failed to ${url}, returning null.`);
           return null;
      }
      return await response.json();
    } catch (error) {
      console.warn(`[API] POST request to ${url} failed, returning null:`, error);
      return null;
    }
  }
};
