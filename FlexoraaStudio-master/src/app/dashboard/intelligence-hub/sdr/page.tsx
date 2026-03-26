
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ScatterChart, Scatter, ZAxis, Cell, Label, ReferenceLine, FunnelChart, Funnel, LabelList, type FunnelProps, Bar } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';


const sdrRevenueData: any[] = [];
const sdrEfficiencyData: any[] = [];
const sdrPerformanceData: any[] = [];

const averageTakeoverTime = sdrEfficiencyData.length > 0 ? sdrEfficiencyData.reduce((acc, sdr) => acc + sdr.takeoverTime, 0) / sdrEfficiencyData.length : 0;
const averageConversionRate = sdrEfficiencyData.length > 0 ? sdrEfficiencyData.reduce((acc, sdr) => acc + sdr.conversionRate, 0) / sdrEfficiencyData.length : 0;

type SdrData = any;

const sdrPerformanceMetrics = {
    showUpRate: { sdr: 0, team: 0, trend: 0 },
    conversionRate: { sdr: 0, team: 0, trend: 0 },
    followUpRate: { sdr: 0, team: 0, trend: 0 },
    fallbackRate: { sdr: 0, team: 0, trend: 0 },
    takeoverTime: { sdr: 0, team: 0, trend: 0 },
};

const sdrFunnelData = {
    sdr: [] as { name: string, value: number }[],
    team: [] as { name: string, value: number }[]
};


const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="p-3 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-xl">
                <p className="font-bold text-lg" style={{color: data.color}}>{data.name}</p>
                <p className="text-sm">Conversion Rate: {data.conversionRate}%</p>
                <p className="text-sm">Avg. Takeover Time: {data.takeoverTime} min</p>
                <p className="text-sm">Revenue: ₹{data.revenue.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

const PerformanceMetricCard = ({ title, sdrValue, teamValue, unit = '%', lowerIsBetter = false }: { title: string, sdrValue: number, teamValue: number, unit?: string, lowerIsBetter?: boolean }) => {
    const isAboveAverage = lowerIsBetter ? sdrValue < teamValue : sdrValue > teamValue;
    const diff = sdrValue - teamValue;
    const diffPercentage = teamValue > 0 ? (diff / teamValue) * 100 : 0;
    
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{sdrValue}{unit}</div>
                <p className="text-xs text-muted-foreground">Team Avg: {teamValue}{unit}</p>
                <div className={cn("text-xs font-semibold flex items-center mt-1", isAboveAverage ? 'text-green-500' : 'text-red-500')}>
                    {isAboveAverage ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    {diffPercentage.toFixed(1)}% vs team avg
                </div>
            </CardContent>
        </Card>
    );
};

const SdrDetailDialog = ({ sdr, children }: { sdr: SdrData, children: React.ReactNode }) => {
    const sdrFunnelData = [
        { name: 'Assigned', value: sdr.assigned, fill: "hsl(var(--chart-5))" },
        { name: 'Bookings', value: sdr.bookings, fill: "hsl(var(--chart-3))" },
        { name: 'Closures', value: sdr.closures, fill: "hsl(var(--chart-1))" },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12"><AvatarFallback>{sdr.avatar}</AvatarFallback></Avatar>
                        <div>
                            <DialogTitle className="text-2xl font-headline">{sdr.name}</DialogTitle>
                            <DialogDescription>Performance deep dive for this SDR.</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Rank</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">#{sdr.rank}</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Revenue</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">₹{sdr.revenue.toLocaleString()}</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Conversion Rate</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{sdr.conversionRate}%</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Avg. Takeover</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{sdr.takeoverTime} min</p></CardContent></Card>
                </div>
                <Card>
                    <CardHeader><CardTitle>SDR Funnel</CardTitle></CardHeader>
                    <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <FunnelChart>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)' }} />
                                <Funnel dataKey="value" data={sdrFunnelData} isAnimationActive>
                                    <LabelList position="right" fill="hsl(var(--foreground))" stroke="none" dataKey="name" />
                                    {sdrFunnelData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                </Funnel>
                            </FunnelChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    )
}

export default function SdrIntelligencePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">SDR Intelligence</h1>
      
      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle className="text-sm font-medium">Total SDR Revenue</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">₹0</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm font-medium">Avg. Takeover Time</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">0 min</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm font-medium">Booking Rate</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">0%</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm font-medium">Follow-up Completion</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">0%</p></CardContent></Card>
      </div>

      {/* Human Performance Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>SDR Revenue Contribution</CardTitle></CardHeader>
            <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sdrRevenueData} layout="vertical" margin={{ left: 10 }}>
                         <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={80} tickLine={false} axisLine={false}/>
                        <Tooltip 
                            cursor={{ fill: 'hsl(var(--secondary))' }}
                            contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} 
                        />
                        <Bar dataKey="revenue" name="Revenue" fill="url(#revenueGradient)" radius={[0, 4, 4, 0]}>
                            <LabelList dataKey="revenue" position="right" formatter={(value: number) => `₹${value.toLocaleString()}`} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
          </Card>
           <Card>
            <CardHeader><CardTitle>SDR Efficiency Map</CardTitle></CardHeader>
            <CardContent className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="takeoverTime" name="Avg. Takeover Time" unit=" min" fontSize={12}/>
                        <YAxis type="number" dataKey="conversionRate" name="Conversion Rate" unit="%" fontSize={12}/>
                        <ZAxis type="number" dataKey="revenue" range={[600, 4000]} name="Revenue" unit="₹"/>
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                        <ReferenceLine y={averageConversionRate} stroke="hsl(var(--border))" strokeDasharray="3 3">
                            <Label value="Avg. Conversion" position="insideTopLeft" fontSize={10} fill="hsl(var(--muted-foreground))" />
                        </ReferenceLine>
                        <ReferenceLine x={averageTakeoverTime} stroke="hsl(var(--border))" strokeDasharray="3 3">
                             <Label value="Avg. Takeover" angle={-90} position="insideRight" fontSize={10} fill="hsl(var(--muted-foreground))" />
                        </ReferenceLine>
                        <Scatter name="SDRs" data={sdrEfficiencyData}>
                            <Label content={<div />} dataKey="name" position="top" style={{ textAnchor: 'middle', fontSize: '10px', fill: 'hsl(var(--foreground))' }} />
                            {sdrEfficiencyData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </CardContent>
          </Card>
      </div>

       <Card>
            <CardHeader>
                <CardTitle>Performance Deep Dive</CardTitle>
                <CardDescription>Your performance benchmarked against the team average.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <PerformanceMetricCard title="SDR-Driven Conversion" sdrValue={sdrPerformanceMetrics.conversionRate.sdr} teamValue={sdrPerformanceMetrics.conversionRate.team} />
                    <PerformanceMetricCard title="AI-Booked Show-up Rate" sdrValue={sdrPerformanceMetrics.showUpRate.sdr} teamValue={sdrPerformanceMetrics.showUpRate.team} />
                    <PerformanceMetricCard title="Avg Takeover Time" sdrValue={sdrPerformanceMetrics.takeoverTime.sdr} teamValue={sdrPerformanceMetrics.takeoverTime.team} unit=" mins" lowerIsBetter />
                    <PerformanceMetricCard title="AI Fallback Handling Rate" sdrValue={sdrPerformanceMetrics.fallbackRate.sdr} teamValue={sdrPerformanceMetrics.fallbackRate.team} />
                    <PerformanceMetricCard title="Follow-up Completion" sdrValue={sdrPerformanceMetrics.followUpRate.sdr} teamValue={sdrPerformanceMetrics.followUpRate.team} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Funnel vs. Team Average</CardTitle>
                            <CardDescription>Side-by-side comparison of conversion rates at each stage.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sdrFunnelData.sdr.map((item, index) => ({ name: item.name, you: item.value, team: sdrFunnelData.team[index].value }))} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={80} />
                                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}/>
                                    <Legend />
                                    <Bar dataKey="you" name="You" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                                    <Bar dataKey="team" name="Team Avg" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Ranking</CardTitle>
                            <CardDescription>Your current position on the team leaderboard.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center h-[250px] space-y-4">
                            <div className="relative">
                                <Trophy className="h-20 w-20 text-yellow-400 fill-yellow-400/20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl font-bold text-yellow-600">3</span>
                                </div>
                            </div>
                            <p className="text-lg font-semibold">You are 3rd out of 10 SDRs</p>
                            <p className="text-sm text-muted-foreground">Based on overall performance score.</p>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>

      {/* SDR Table */}
      <Card>
          <CardHeader><CardTitle>SDR Rankings</CardTitle></CardHeader>
          <CardContent>
               <div className="space-y-4">
                {sdrPerformanceData.map((sdr, index) => (
                  <SdrDetailDialog key={sdr.rank} sdr={sdr}>
                     <div className={cn(
                        "flex flex-col gap-4 p-4 rounded-lg transition-all border cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
                        index === 0 && "bg-yellow-400/10 border-yellow-400/20",
                        index === 1 && "bg-gray-400/10 border-gray-400/20",
                        index === 2 && "bg-yellow-600/10 border-yellow-600/20",
                        index > 2 && "bg-secondary/50"
                      )}>
                        <div className="flex items-center gap-4">
                          <div className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-full bg-background font-bold text-lg",
                              index === 0 && "text-yellow-500",
                              index === 1 && "text-gray-500",
                              index === 2 && "text-yellow-700",
                          )}>
                            {index < 3 ? <Trophy className="h-5 w-5 fill-current" /> : sdr.rank}
                          </div>
                           <Avatar><AvatarFallback>{sdr.avatar}</AvatarFallback></Avatar>
                          <div className="flex-1">
                           <p className="font-medium text-sm">{sdr.name}</p>
                           <p className="text-xs text-muted-foreground">Revenue: <span className="font-bold text-primary">₹{sdr.revenue.toLocaleString()}</span></p>
                          </div>
                          <div className="text-right hidden sm:block">
                              <p className="text-xs text-muted-foreground">Conversion Rate</p>
                              <p className="font-bold">{sdr.conversionRate}%</p>
                          </div>
                           <div className="text-right hidden md:block">
                              <p className="text-xs text-muted-foreground">Avg. Takeover Time</p>
                              <p className="font-bold">{sdr.takeoverTime} min</p>
                          </div>
                           <div className="text-right hidden lg:block">
                              <p className="text-xs text-muted-foreground">Follow-up Rate</p>
                               <div className="flex items-center gap-2">
                                <Progress value={sdr.followUp} className="w-20 h-1.5" />
                                <span>{sdr.followUp}%</span>
                               </div>
                          </div>
                        </div>
                      </div>
                  </SdrDetailDialog>
                ))}
              </div>
          </CardContent>
      </Card>

    </div>
  );
}
