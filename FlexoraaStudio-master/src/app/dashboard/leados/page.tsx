'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Zap, CheckCircle, Flame, DollarSign, Target, Trophy, AlertTriangle, Calendar as CalendarIcon, TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, BarChart as RechartsBarChart, Bar, Cell, ReferenceLine, Line, LabelList } from "recharts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, startOfDay } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRange } from "react-day-picker";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ManagerCopilot } from '@/components/dashboard/leados/ManagerCopilot';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton';

// -- NEW: Application Architecture Layers --
import { useDataFetch } from '@/hooks/useDataFetch';
import { analyticsService } from '@/services/analyticsService';
import { agentService } from '@/services/agentService';
import { EmptyState, ErrorState } from '@/components/ui/empty-state';
import { ComponentLoader } from '@/components/ui/loading-state';

// Tooltip Helper
const CustomTooltip = ({ active, payload, label, yAxisKey, yAxisLabel }: any) => {
    if (active && payload && payload.length > 0) {
        const rate = payload[0].value > 0 ? ((payload[1]?.value / payload[0].value) * 100).toFixed(1) : '0.0';
        return (
            <div className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-lg">
                <p className="label font-bold">{`${label}`}</p>
                <p className="intro text-chart-2">{`Uploaded: ${payload[0].value.toLocaleString()}`}</p>
                <p className="intro text-chart-1">{`${yAxisLabel}: ${payload[1]?.value.toLocaleString()}`}</p>
                <p className="intro text-chart-4">{`Conversion Rate: ${rate}%`}</p>
            </div>
        );
    }
    return null;
};

type ViewMode = "verified" | "hotLeads" | "qualifiedLeads";

export default function LeadOSDashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [viewMode, setViewMode] = useState<ViewMode>("verified");

  useEffect(() => {
    const today = new Date();
    setDateRange({ from: subDays(today, 29), to: today });
  }, []);

  // -- NEW: Standardized Data Fetching Hooks --
  const { data: summary, isLoading: isSummaryLoading, error: summaryErr } = useDataFetch(analyticsService.getCampaignSummary);
  const { data: chartData, isLoading: isChartLoading, error: chartErr } = useDataFetch(() => analyticsService.getCampaignChartData('', ''));
  const { data: leadStages, isLoading: isStagesLoading, error: stagesErr } = useDataFetch(analyticsService.getLeadStageDistribution);
  const { data: revenue, isLoading: isRevenueLoading, error: revErr } = useDataFetch(analyticsService.getRevenueMetrics);
  const { data: sdrBoard, isLoading: isSdrLoading, error: sdrErr } = useDataFetch(agentService.getSdrLeaderboard);

  // Dynamic Filtering for Charts
  const campaignData = useMemo(() => {
    if (!chartData) return [];
    if (!dateRange?.from || !dateRange?.to) return chartData.slice(-7);
    const fromDate = startOfDay(dateRange.from);
    const toDate = startOfDay(dateRange.to);

    return chartData.filter(d => {
        const dDate = startOfDay(new Date(d.date));
        return dDate >= fromDate && dDate <= toDate;
    })
  }, [chartData, dateRange]);
  
  const viewConfig = {
      verified: { key: "verified", label: "Verified", color: "hsl(var(--chart-1))" },
      hotLeads: { key: "hotLeads", label: "Hot Leads", color: "hsl(var(--chart-4))" },
      qualifiedLeads: { key: "qualifiedLeads", label: "Qualified", color: "hsl(var(--chart-5))" },
  };
  const currentView = viewConfig[viewMode];

  return (
    <div className="space-y-8">
       {/* Setup Alert */}
       <Alert variant="destructive" className="border-yellow-500/50 text-yellow-400 [&>svg]:text-yellow-400 bg-yellow-500/10">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="text-yellow-300 font-bold">Setup incomplete</AlertTitle>
        <AlertDescription className="flex justify-between items-center text-yellow-400/80">
          Some integrations are not connected. Complete the setup to unlock the full potential of LeadOS.
          <Button variant="outline" asChild className="border-yellow-400/50 hover:bg-yellow-400/10 text-yellow-300 hover:text-yellow-200">
            <Link href="/onboarding?product=leados">Resume Setup</Link>
          </Button>
        </AlertDescription>
      </Alert>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">LeadOS Dashboard</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Uploaded Leads */}
        <Link href="/dashboard/uploaded-leads" className="lg:col-span-1">
          <Card className="transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Uploaded</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {summaryErr ? <p className="text-sm text-destructive">Error</p> : isSummaryLoading ? <Skeleton className="h-8 w-1/2" /> : (
                  <>
                    <div className="text-2xl font-bold">{summary?.uploaded?.toLocaleString() || '0'}</div>
                    {summary?.uploadedTrends && <p className="text-xs text-muted-foreground"><span className="text-green-400">{summary.uploadedTrends}</span> from last month</p>}
                  </>
              )}
            </CardContent>
          </Card>
        </Link>
        {/* Verified Leads */}
        <Link href="/dashboard/verified-leads" className="lg:col-span-1">
            <Card className="transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads Verified</CardTitle>
                <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
               {summaryErr ? <p className="text-sm text-destructive">Error</p> : isSummaryLoading ? <Skeleton className="h-8 w-1/2" /> : (
                  <>
                    <div className="text-2xl font-bold">{summary?.verified?.toLocaleString() || '0'}</div>
                    {(summary?.uploaded ?? 0) > 0 && <p className="text-xs text-muted-foreground"><span className="text-green-400">{(((summary?.verified ?? 0)/(summary?.uploaded ?? 1))*100).toFixed(0)}%</span> verification rate</p>}
                  </>
              )}
            </CardContent>
            </Card>
        </Link>
        {/* Engaged Leads */}
        <Link href="/dashboard/engaged-leads" className="lg:col-span-1">
            <Card className="transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads Engaged</CardTitle>
                <Zap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
               {summaryErr ? <p className="text-sm text-destructive">Error</p> : isSummaryLoading ? <Skeleton className="h-8 w-1/2" /> : (
                  <>
                    <div className="text-2xl font-bold">{summary?.engaged?.toLocaleString() || '0'}</div>
                    {summary?.engagedTrends && <p className="text-xs text-muted-foreground"><span className="text-green-400">{summary.engagedTrends}</span> from last week</p>}
                  </>
              )}
            </CardContent>
            </Card>
        </Link>
        {/* Qualified Leads */}
        <Link href="/dashboard/qualified-leads" className="lg:col-span-1">
            <Card className="transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Qualified (HOT)</CardTitle>
                <Flame className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
               {summaryErr ? <p className="text-sm text-destructive">Error</p> : isSummaryLoading ? <Skeleton className="h-8 w-1/2" /> : (
                  <>
                    <div className="text-2xl font-bold">{summary?.hotLeads?.toLocaleString() || '0'}</div>
                    {(summary?.uploaded ?? 0) > 0 && <p className="text-xs text-muted-foreground"><span className="text-green-400">{(((summary?.hotLeads ?? 0)/(summary?.uploaded ?? 1))*100).toFixed(1)}%</span> of uploaded</p>}
                  </>
              )}
              </CardContent>
            </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <Card className="lg:col-span-5 xl:col-span-3">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <CardTitle>Campaign Summary</CardTitle>
                    <CardDescription>Uploaded leads vs. outcomes.</CardDescription>
                </div>
                 <div className="flex items-center gap-2 w-full md:w-auto flex-col sm:flex-row">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={"outline"} size="sm" className={cn("w-full sm:w-[240px] justify-start text-left font-normal h-9", !dateRange && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange?.from ? (
                                    dateRange.to ? <>{format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}</> : format(dateRange.from, "LLL dd, y")
                                ) : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <Calendar initialFocus mode="range" defaultMonth={dateRange?.from} selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
                        </PopoverContent>
                    </Popover>
                    <Select value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
                        <SelectTrigger className="w-full sm:w-[130px] h-9">
                            <SelectValue placeholder="Select view" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="verified">Vs. Verified</SelectItem>
                            <SelectItem value="hotLeads">Vs. Hot Leads</SelectItem>
                            <SelectItem value="qualifiedLeads">Vs. Qualified</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </CardHeader>
          <CardContent className="pl-2 h-[350px]">
            {chartErr ? <ErrorState message="Could not load campaign chart." /> : 
             isChartLoading ? <ComponentLoader height="100%" /> : 
             campaignData.length === 0 ? <EmptyState /> : (
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={campaignData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorComparison" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={currentView.color} stopOpacity={0.4}/>
                            <stop offset="95%" stopColor={currentView.color} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorUploaded" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                    <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-4))" fontSize={12} tickLine={false} axisLine={false} hide />
                    <Tooltip content={<CustomTooltip yAxisKey={currentView.key} yAxisLabel={currentView.label} />} />
                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                    <ReferenceLine yAxisId="right" y={40} label={{ value: "Benchmark", position: "insideTopLeft", fill: "hsl(var(--muted-foreground))" }} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                    <Area yAxisId="left" type="monotone" name="Uploaded" dataKey="uploaded" stroke="hsl(var(--chart-2))" strokeWidth={2} fillOpacity={1} fill="url(#colorUploaded)" className="chart-glow-2" dot={false} />
                    <Area yAxisId="left" type="monotone" name={currentView.label} dataKey={currentView.key} stroke={currentView.color} strokeWidth={2} fillOpacity={1} fill="url(#colorComparison)" className="chart-glow-1" dot={false} />
                    <Line yAxisId="right" type="monotone" name="Verification Rate" dataKey="verificationRate" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={false} className="chart-glow-4"/>
                </AreaChart>
                </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Lead Stage Distribution */}
        <Card className="lg:col-span-5 xl:col-span-2">
            <CardHeader>
                <CardTitle>Lead Stage Distribution</CardTitle>
                <CardDescription>Number of leads in each stage.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] pl-2">
                {stagesErr ? <ErrorState message="Could not load stages." /> : 
                 isStagesLoading ? <ComponentLoader height="100%" /> :
                 (!leadStages || leadStages.length === 0) ? <EmptyState /> : (
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={leadStages} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                            <defs>
                                <linearGradient id="gradient-verified" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/><stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.2}/></linearGradient>
                                <linearGradient id="gradient-engaged" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/><stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.2}/></linearGradient>
                                <linearGradient id="gradient-hot" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8}/><stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0.2}/></linearGradient>
                                <linearGradient id="gradient-warm" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.8}/><stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0.2}/></linearGradient>
                                <linearGradient id="gradient-cold" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/><stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0.2}/></linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)"/>
                            <XAxis dataKey="stage" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: 'hsl(var(--secondary))' }} contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                            <Bar dataKey="count" name="Leads" radius={[4, 4, 0, 0]}>
                                <LabelList dataKey="count" position="top" formatter={(value: number) => value} style={{ fill: 'hsl(var(--foreground))', fontSize: '12px' }}/>
                                {leadStages.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </RechartsBarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* SDR Leaderboard */}
        <Card className="lg:col-span-3 flex flex-col h-full min-h-[400px] overflow-hidden">
            <CardHeader className="shrink-0 border-b border-border/50">
                <CardTitle>SDR Leaderboard</CardTitle>
                <CardDescription>Gamified performance tracking to motivate your sales team.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 relative p-0 overflow-hidden">
              {sdrErr ? (
                 <div className="absolute inset-0 p-6 flex flex-col">
                    <ErrorState message="Could not load leaderboard." />
                 </div>
              ) : isSdrLoading ? (
                 <div className="absolute inset-0 p-6 flex flex-col">
                     <ComponentLoader lines={4} />
                 </div>
              ) : (!sdrBoard || sdrBoard.length === 0) ? (
                 <div className="absolute inset-0 p-6 flex flex-col bg-background/5">
                    <EmptyState description="No active SDRs." className="flex-1 w-full h-full m-0 opacity-80 backdrop-blur-sm shadow-inner overflow-hidden border-dashed" />
                 </div>
              ) : (
                <div className="space-y-4 p-6 absolute inset-0 overflow-y-auto">
                  {sdrBoard.map((sdr, index) => (
                    <div key={sdr.name} className={cn(
                      "flex flex-col gap-4 p-4 rounded-lg transition-all border",
                      index === 0 && "bg-yellow-400/10 border-yellow-400/20 shadow-lg shadow-yellow-500/10",
                      index === 1 && "bg-gray-400/10 border-gray-400/20",
                      index === 2 && "bg-yellow-600/10 border-yellow-600/20",
                      index > 2 && "bg-secondary/50"
                    )}>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background font-bold text-lg">
                          {index === 0 && <Trophy className="h-5 w-5 text-yellow-400 fill-yellow-400" />}
                          {index === 1 && <Trophy className="h-5 w-5 text-gray-400 fill-gray-400" />}
                          {index === 2 && <Trophy className="h-5 w-5 text-yellow-600 fill-yellow-600" />}
                          {index > 2 && <span className="text-sm">{index + 1}</span>}
                        </div>
                         <Avatar>
                            <AvatarImage src={sdr.avatar} data-ai-hint={sdr.avatarHint} />
                            <AvatarFallback>{sdr.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                         <p className="font-medium text-sm">{sdr.name}</p>
                         <p className="text-xs text-muted-foreground">Revenue Added: <span className="font-bold text-primary">${sdr.revenueAdded.toLocaleString()}</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground">Close Rate</p>
                            <p className="font-bold">{sdr.closeRate.toFixed(1)}%</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs pt-4 border-t border-white/10">
                          <div>
                              <p className="text-muted-foreground">Assigned</p>
                              <p className="font-semibold text-lg">{sdr.assigned}</p>
                          </div>
                           <div>
                              <p className="text-muted-foreground">Contacted</p>
                              <p className="font-semibold text-lg">{sdr.contacted}</p>
                          </div>
                           <div>
                              <p className="text-muted-foreground">Follow-ups</p>
                              <p className="font-semibold text-lg">{sdr.followUps}</p>
                          </div>
                           <div>
                              <p className="text-muted-foreground">Closed</p>
                              <p className="font-semibold text-lg">{sdr.closed}</p>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
        </Card>

        {/* Manager Copilot */}
        <div className="lg:col-span-2 flex flex-col">
            <ManagerCopilot />
        </div>
      </div>

      {/* Revenue Forecast & Components */}
      <Card className="w-full">
          <CardHeader>
              <CardTitle>Revenue Forecast</CardTitle>
              <CardDescription>Visualize sales performance and future revenue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             {revErr ? <ErrorState message="Could not load revenue metrics." /> : 
              isRevenueLoading ? <ComponentLoader lines={3} /> :
              !revenue ? <EmptyState className="my-4 justify-center shadow-inner opacity-80 backdrop-blur-sm border-dashed" /> : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                      <Card className="bg-green-500/10 border-green-500/20">
                          <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium text-green-200 flex items-center gap-2"><DollarSign/>Earned</CardTitle>
                          </CardHeader>
                          <CardContent><p className="text-2xl font-bold font-headline text-green-400">${(revenue.earnedRevenue / 1000).toFixed(0)}k</p></CardContent>
                      </Card>
                       <Card className="bg-blue-500/10 border-blue-500/20">
                          <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium text-blue-200 flex items-center gap-2"><TrendingUp/>Pipeline</CardTitle>
                          </CardHeader>
                          <CardContent><p className="text-2xl font-bold font-headline text-blue-400">${(revenue.potentialRevenue / 1000).toFixed(0)}k</p></CardContent>
                      </Card>
                       <Card>
                          <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Target/>Goal</CardTitle>
                          </CardHeader>
                          <CardContent><p className="text-xl font-bold font-headline">${(revenue.earnedRevenue / 1000).toFixed(0)}k <span className="text-sm text-muted-foreground">/ ${(revenue.totalGoal / 1000).toFixed(0)}k</span></p></CardContent>
                      </Card>
                  </div>
                  <div>
                       <div className="relative w-full h-4 rounded-full bg-secondary overflow-hidden">
                          <div 
                              className="absolute top-0 left-0 h-full bg-green-500" 
                              style={{ width: `${(revenue.earnedRevenue / revenue.totalGoal) * 100}%` }}
                          ></div>
                          <div 
                              className="absolute top-0 h-full bg-blue-500/50" 
                              style={{ 
                                  left: `${(revenue.earnedRevenue / revenue.totalGoal) * 100}%`,
                                  width: `${(revenue.potentialRevenue / revenue.totalGoal) * 100}%`,
                                  backgroundImage: "repeating-linear-gradient(-45deg, hsla(0,0%,100%,.1), hsla(0,0%,100%,.1) 5px, transparent 5px, transparent 10px)"
                              }}
                          ></div>
                      </div>
                       <p className="text-center text-sm text-muted-foreground mt-2">
                          🚀 You’re {((revenue.earnedRevenue / revenue.totalGoal) * 100).toFixed(0)}% to target — keep pushing!
                      </p>
                  </div>
                </>
              )}
          </CardContent>
      </Card>
    </div>
  );
}
