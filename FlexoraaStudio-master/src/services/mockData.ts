import { subDays, format } from 'date-fns';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfter = new Date(today);
dayAfter.setDate(dayAfter.getDate() + 2);

const generateCampaignData = () => {
    return Array.from({ length: 30 }, (_, i) => {
        const date = subDays(new Date(), 29 - i);
        let uploaded = i < 10 ? 10000 + (1000 * i) : i < 20 ? 20000 + (1000 * (i - 10)) : 30000 + Math.floor(Math.random() * 2000 - 1000);
        const verified = Math.floor(uploaded * (0.35 + Math.random() * 0.1));
        const hotLeads = Math.floor(verified * (0.1 + Math.random() * 0.05));
        const qualifiedLeads = Math.floor(verified * (0.2 + Math.random() * 0.1));
        return {
            name: format(date, 'MMM d'),
            date: format(date, 'yyyy-MM-dd'),
            uploaded,
            verified,
            hotLeads,
            qualifiedLeads,
            verificationRate: parseFloat(((verified / uploaded) * 100).toFixed(1)),
        };
    });
};

const generateRoiData = () => {
    return Array.from({ length: 30 }, (_, i) => {
        const revenue = 8000 + Math.random() * 8000;
        const ad_spend = 2000 + Math.random() * 4000;
        return {
            date: format(subDays(new Date(), 29-i), 'MMM d'),
            revenue,
            ad_spend,
            roi: revenue / ad_spend,
        }
    });
}

export const mockDataStore = {
  // LeadOS
  campaignSummary: {
    uploaded: 50000,
    verified: 20000,
    engaged: 16500,
    hotLeads: 2550,
    qualifiedLeads: 7200,
  },
  campaignChartData: generateCampaignData(),
  revenueMetrics: {
    earnedRevenue: 55000,
    potentialRevenue: 75000,
    totalGoal: 150000,
  },
  leadStages: [
    { stage: 'Verified', count: 20000, fill: "url(#gradient-verified)" },
    { stage: 'Engaged', count: 16500, fill: "url(#gradient-engaged)" },
    { stage: 'Hot', count: 2550, fill: "url(#gradient-hot)" },
    { stage: 'Warm', count: 7200, fill: "url(#gradient-warm)" },
    { stage: 'Cold', count: 6750, fill: "url(#gradient-cold)" },
    { stage: 'Failed', count: 30000, fill: "hsl(var(--muted-foreground) / 0.5)" },
  ],
  sdrLeaderboard: [
    {
        name: 'Samantha Ray',
        avatar: 'https://placehold.co/40x40.png',
        avatarHint: 'female person',
        assigned: 167,
        contacted: 160,
        closed: 35,
        followUps: 410,
        closeRate: (35/160) * 100,
        revenueAdded: 15750,
    },
    {
        name: 'Alex Green',
        avatar: 'https://placehold.co/40x40.png',
        avatarHint: 'male person',
        assigned: 167,
        contacted: 150,
        closed: 25,
        followUps: 350,
        closeRate: (25/150) * 100,
        revenueAdded: 11250,
    },
     {
        name: 'Ben Carter',
        avatar: 'https://placehold.co/40x40.png',
        avatarHint: 'man face',
        assigned: 166,
        contacted: 140,
        closed: 20,
        followUps: 300,
        closeRate: (20/140) * 100,
        revenueAdded: 9000,
    },
  ],
  appointments: [
    { date: today.toISOString(), time: '10:00 AM', leadId: 'LD004', with: 'Sales Rep A', conversation: "Lead highly interested in enterprise plan." },
    { date: today.toISOString(), time: '02:00 PM', leadId: 'LD021', with: 'Sales Rep B', conversation: "Evaluating options, early stages." },
    { date: tomorrow.toISOString(), time: '11:30 AM', leadId: 'LD008', with: 'Sales Rep A', conversation: "Referral, positive about automation." },
    { date: dayAfter.toISOString(), time: '09:00 AM', leadId: 'LD025', with: 'Sales Rep C', conversation: "Existing customer looking to upgrade." },
  ],

  // AgentOS
  agentOsKpis: {
    totalRevenue: { title: "Total Revenue Generated", value: "₹4,52,310", change: "12.5%", changeType: "increase" },
    roi: { title: "₹ Earned / ₹ Spent", value: "3.8x", change: "0.5x", changeType: "increase", tooltipText: "Overall return on ad spend across all campaigns." },
    dealsClosed: { title: "Deals Closed", value: "88", change: "8", changeType: "increase" },
    hotLeadRatio: { title: "Hot Lead Ratio", value: "18.2%", change: "2.1%", changeType: "increase", tooltipText: "Percentage of conversations tagged with high buyer-intent." },
    revenueAtRisk: { title: "Revenue at Risk", value: "₹25,000", change: "₹5k", changeType: "decrease", tooltipText: "Estimated revenue from high-value leads that have stalled or are unassigned." },
  },
  channelVolumeData: [
    { channel: 'WhatsApp', count: 450, fill: "#25D366" },
    { channel: 'Instagram', count: 250, fill: "#E4405F" },
    { channel: 'Facebook', count: 150, fill: "#1877F2" },
    { channel: 'Gmail', count: 150, fill: "#D93025" },
  ],
  roiData: generateRoiData()
};
