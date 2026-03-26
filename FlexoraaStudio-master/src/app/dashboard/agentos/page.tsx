'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Target, TrendingUp, ShieldAlert, BarChart, CalendarIcon, HelpCircle } from "lucide-react";
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Cell, ReferenceArea } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';
import { format, subDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { PlatformActivityHeatmap } from '@/components/dashboard/agentos-sdr/PlatformActivityHeatmap';
import { Skeleton } from "@/components/ui/skeleton";

// --- NEW CONFIG --- 
import { useDataFetch } from '@/hooks/useDataFetch';
import { analyticsService } from '@/services/analyticsService';
import { ComponentLoader } from '@/components/ui/loading-state';
import { EmptyState, ErrorState } from '@/components/ui/empty-state';

// --- Reusable Components ---
const KpiCard = ({ title, value, change, changeType, icon, onClick, tooltipText, isLoading, error }: any) => {
    if (error) return <Card><CardContent className="p-6 text-destructive text-sm text-center">Failed to load</CardContent></Card>;
    if (isLoading) return <Card><CardContent className="p-6"><Skeleton className="h-10 w-full mb-2" /><Skeleton className="h-4 w-2/3" /></CardContent></Card>;
    return (
        <Card onClick={onClick} className={cn(onClick && "cursor-pointer", "transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                    {title}
                    {tooltipText && (
                        <Popover>
                            <PopoverTrigger onClick={(e) => e.stopPropagation()}><HelpCircle className="h-3 w-3"/></PopoverTrigger>
                            <PopoverContent className="text-xs w-64">{tooltipText}</PopoverContent>
                        </Popover>
                    )}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change && <p className={cn("text-xs", changeType === 'increase' ? 'text-green-500' : 'text-red-500')}>
                    {changeType === 'increase' ? '↑' : '↓'} {change} vs last period
                </p>}
            </CardContent>
        </Card>
    );
};

const RoiBandChart = () => {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 29),
        to: new Date(),
    });

    const { data: roiData, isLoading, error } = useDataFetch(analyticsService.getRoiData);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            let status = "Break-even";
            if (data.roi < 1.5) status = "Loss";
            if (data.roi >= 3) status = "Profitable";
            
            return (
                <div className="p-3 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-xl">
                    <p className="font-bold text-base mb-2">{label}</p>
                    <p className="text-sm">Revenue: <span className="font-semibold">₹{data.revenue.toLocaleString(undefined, {maximumFractionDigits: 0})}</span></p>
                    <p className="text-sm">Ad Spend: <span className="font-semibold">₹{data.ad_spend.toLocaleString(undefined, {maximumFractionDigits: 0})}</span></p>
                    <p className="font-bold text-lg mt-2">ROI: {data.roi.toFixed(2)}x <Badge variant="outline" className={cn(
                        status === "Loss" && "text-red-400 border-red-500/50",
                        status === "Break-even" && "text-yellow-400 border-yellow-500/50",
                        status === "Profitable" && "text-green-400 border-green-500/50",
                    )}>{status}</Badge></p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <CardTitle>Return on Investment (ROI) Bands</CardTitle>
                     <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            id="roi-date"
                            variant={"outline"}
                            className={cn( "w-full sm:w-[260px] justify-start text-left font-normal", !dateRange && "text-muted-foreground" )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange?.from ? ( dateRange.to ? ( <> {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")} </> ) : ( format(dateRange.from, "LLL dd, y") ) ) : ( <span>Pick a date</span> )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <Calendar initialFocus mode="range" defaultMonth={dateRange?.from} selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
                        </PopoverContent>
                    </Popover>
                </div>
            </CardHeader>
            <CardContent className="h-80">
                {error ? <ErrorState message="Could not load ROI data." /> : 
                 isLoading ? <ComponentLoader height="100%" /> : 
                 (!roiData || roiData.length === 0) ? <EmptyState /> : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={roiData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis tickFormatter={(val) => `${val}x`} domain={[0, 6]} fontSize={12} tickLine={false} axisLine={false}/>
                            <Tooltip content={<CustomTooltip />} />
                            <ReferenceArea y1={0} y2={1.5} fill="hsl(var(--chart-1) / 0.1)" stroke="hsl(var(--chart-1) / 0.2)" strokeDasharray="3 3" />
                            <ReferenceArea y1={1.5} y2={3} fill="hsl(var(--chart-3) / 0.1)" stroke="hsl(var(--chart-3) / 0.2)" strokeDasharray="3 3" />
                            <ReferenceArea y1={3} y2={6} fill="hsl(var(--chart-2) / 0.1)" stroke="hsl(var(--chart-2) / 0.2)" strokeDasharray="3 3" />
                            <Area type="monotone" dataKey="roi" strokeWidth={2} stroke="hsl(var(--primary))" fill="url(#colorRoi)" className="chart-glow-1"/>
                        </AreaChart>
                    </ResponsiveContainer>
                 )}
            </CardContent>
        </Card>
    )
}

export default function AgentOSManagerDashboard() {
  const { data: kpiData, isLoading: isKpiLoading, error: kpiError } = useDataFetch(analyticsService.getAgentOsKpis);
  const { data: channelVolumeData, isLoading: isChannelLoading, error: channelError } = useDataFetch(analyticsService.getChannelVolume);

  return (
    <div className="space-y-8">
      {/* 0. Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold font-headline">AgentOS War Room</h1>
            <p className="text-muted-foreground mt-1">Strategic oversight for your AI sales force.</p>
        </div>
      </div>
      
      {/* 1. Top KPI Strip */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <KpiCard title="Total Revenue Generated" icon={<DollarSign className="text-primary"/>} isLoading={isKpiLoading} error={kpiError} value={kpiData?.totalRevenue?.value || '₹0'} change={kpiData?.totalRevenue?.change} changeType={kpiData?.totalRevenue?.changeType} />
          <KpiCard title="₹ Earned / ₹ Spent" tooltipText="Overall return on ad spend across all campaigns." icon={<TrendingUp className="text-primary"/>} isLoading={isKpiLoading} error={kpiError} value={kpiData?.roi?.value || '0.0x'} change={kpiData?.roi?.change} changeType={kpiData?.roi?.changeType} />
          <KpiCard title="Deals Closed" icon={<Target className="text-primary"/>} isLoading={isKpiLoading} error={kpiError} value={kpiData?.dealsClosed?.value || '0'} change={kpiData?.dealsClosed?.change} changeType={kpiData?.dealsClosed?.changeType} />
          <KpiCard title="Hot Lead Ratio" tooltipText="Percentage of conversations tagged with high buyer-intent." icon={<BarChart className="text-primary"/>} isLoading={isKpiLoading} error={kpiError} value={kpiData?.hotLeadRatio?.value || '0%'} change={kpiData?.hotLeadRatio?.change} changeType={kpiData?.hotLeadRatio?.changeType} />
          <KpiCard title="Revenue at Risk" tooltipText="Estimated revenue from high-value leads that have stalled or are unassigned." icon={<ShieldAlert className="text-destructive"/>} isLoading={isKpiLoading} error={kpiError} value={kpiData?.revenueAtRisk?.value || '₹0'} change={kpiData?.revenueAtRisk?.change} changeType={kpiData?.revenueAtRisk?.changeType} />
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-12">
                <RoiBandChart />
            </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
              <CardHeader>
                  <CardTitle>Conversation Volume</CardTitle>
                  <CardDescription>By channel, last 7 days.</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                 {channelError ? <ErrorState message="Could not load channel volume." /> : 
                  isChannelLoading ? <ComponentLoader height="100%" /> : 
                  (!channelVolumeData || channelVolumeData.length === 0) ? <EmptyState /> : (
                      <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart data={channelVolumeData} layout="vertical">
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis type="number" hide />
                              <YAxis dataKey="channel" type="category" width={80} tickLine={false} axisLine={false} />
                              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)' }} cursor={{ fill: 'hsl(var(--secondary))' }}/>
                              <Bar dataKey="count" name="Conversations" radius={[0, 4, 4, 0]}>
                                {channelVolumeData.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                              </Bar>
                          </RechartsBarChart>
                      </ResponsiveContainer>
                  )}
              </CardContent>
          </Card>
          <div className="lg:col-span-2">
            <PlatformActivityHeatmap />
          </div>
      </div>

    </div>
  );
}