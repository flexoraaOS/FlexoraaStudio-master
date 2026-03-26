
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Instagram, Facebook, Bot, Users, Percent, ThumbsUp, ThumbsDown, UserCheck, MessageCircle, AlertTriangle, TrendingUp, TrendingDown, Info, HelpCircle, BrainCircuit } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import HeatmapMatrix from '@/components/dashboard/agentos-sdr/HeatmapMatrix';

const channelSnapshotData = [
    { channel: 'Instagram', icon: <Instagram className="h-5 w-5 text-pink-500" />, leads: 3200, conversations: 2500, conversions: 120, conversionRate: '3.75%' },
    { channel: 'Facebook', icon: <Facebook className="h-5 w-5 text-blue-600" />, leads: 2800, conversations: 2100, conversions: 95, conversionRate: '3.39%' },
    { channel: 'WhatsApp', icon: <MessageCircle className="h-5 w-5 text-green-500" />, leads: 1800, conversations: 1650, conversions: 150, conversionRate: '8.33%' },
];

const aiVsSdrData = [
    { channel: 'Instagram', ai: 70, sdr: 30, aiConversion: 2.5, sdrConversion: 8.5 },
    { channel: 'Facebook', ai: 65, sdr: 35, aiConversion: 2.1, sdrConversion: 7.9 },
    { channel: 'WhatsApp', ai: 85, sdr: 15, aiConversion: 5.0, sdrConversion: 15.2 },
];

const sentimentData = [
    { channel: 'Instagram', Positive: 60, Neutral: 30, Negative: 10 },
    { channel: 'Facebook', Positive: 55, Neutral: 35, Negative: 10 },
    { channel: 'WhatsApp', Positive: 75, Neutral: 20, Negative: 5 },
];

export function ChannelIntelligenceDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Channel Intelligence</CardTitle>
                <BrainCircuit className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">45%</div>
                <p className="text-xs text-muted-foreground"><span className="text-green-500">+10.2%</span> CVR on WhatsApp</p>
            </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-7xl h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">Channel Intelligence</DialogTitle>
          <DialogDescription>A deep dive into the performance and efficiency of each communication channel.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pt-4 h-full overflow-y-auto pr-2">
            
            <Card className="xl:col-span-3">
                <CardHeader>
                    <CardTitle>Omnichannel Snapshot</CardTitle>
                    <CardDescription>Side-by-side comparison of your main acquisition channels.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Channel</TableHead>
                                <TableHead>Leads Exposed</TableHead>
                                <TableHead>Conversations</TableHead>
                                <TableHead>Conversions</TableHead>
                                <TableHead>Conversion Rate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {channelSnapshotData.map(item => (
                                <TableRow key={item.channel}>
                                    <TableCell className="font-medium flex items-center gap-2">{item.icon} {item.channel}</TableCell>
                                    <TableCell>{item.leads.toLocaleString()}</TableCell>
                                    <TableCell>{item.conversations.toLocaleString()}</TableCell>
                                    <TableCell>{item.conversions.toLocaleString()}</TableCell>
                                    <TableCell className="font-semibold text-primary">{item.conversionRate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="xl:col-span-2">
                <CardHeader>
                    <CardTitle>AI vs. SDR Handling by Channel</CardTitle>
                     <CardDescription>Compare automation efficiency and human touch effectiveness.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={aiVsSdrData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" unit="%" />
                            <YAxis dataKey="channel" type="category" width={80} />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                            <Legend />
                            <Bar dataKey="ai" name="AI Handled" stackId="a" fill="hsl(var(--chart-2))" />
                            <Bar dataKey="sdr" name="SDR Handled" stackId="a" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="xl:col-span-1">
                <CardHeader>
                    <CardTitle>AI & SDR Conversion Rates</CardTitle>
                    <CardDescription>Effectiveness of each touchpoint.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     {aiVsSdrData.map(item => (
                        <div key={item.channel} className="text-sm">
                            <p className="font-semibold">{item.channel}</p>
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span><Bot className="h-4 w-4 inline-block mr-1 text-blue-400"/>AI Conversion Rate:</span>
                                <span className="font-medium text-foreground">{item.aiConversion.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span><UserCheck className="h-4 w-4 inline-block mr-1 text-green-400"/>SDR Conversion Rate:</span>
                                 <span className="font-medium text-foreground">{item.sdrConversion.toFixed(1)}%</span>
                            </div>
                        </div>
                     ))}
                </CardContent>
            </Card>

            <HeatmapMatrix />
            
            <Card className="xl:col-span-2">
                <CardHeader>
                    <CardTitle>Message Sentiment Trend</CardTitle>
                    <CardDescription>Track the quality of conversations across channels.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sentimentData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="channel" />
                            <YAxis unit="%" />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                            <Legend />
                            <Bar dataKey="Positive" stackId="a" fill="hsl(var(--chart-2))" />
                            <Bar dataKey="Neutral" stackId="a" fill="hsl(var(--chart-3))" />
                            <Bar dataKey="Negative" stackId="a" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="xl:col-span-1">
                 <CardHeader>
                    <CardTitle>Cost-to-Conversion</CardTitle>
                    <CardDescription>Relative efficiency of each channel.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                        <div>
                            <p className="font-semibold text-green-400">Top Performer: WhatsApp</p>
                            <p className="text-xs text-muted-foreground">40% higher close rate than average.</p>
                        </div>
                        <TrendingUp className="h-6 w-6 text-green-400"/>
                    </div>
                     <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                        <div>
                            <p className="font-semibold text-red-400">Needs Improvement: Facebook</p>
                            <p className="text-xs text-muted-foreground">Highest drop-off after initial contact.</p>
                        </div>
                        <TrendingDown className="h-6 w-6 text-red-400"/>
                    </div>
                </CardContent>
            </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
