
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell, Legend, CartesianGrid } from 'recharts';
import { Instagram, Facebook, Bot, UserCheck, MessageSquare, TrendingUp, TrendingDown } from "lucide-react";
import HeatmapMatrix from '@/components/dashboard/agentos-sdr/HeatmapMatrix';

const channelSnapshotData: any[] = [];
const aiVsSdrData: any[] = [];
const sentimentData: any[] = [];


export default function ChannelIntelligencePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-headline">Channel Intelligence</h1>
            <p className="text-muted-foreground -mt-4">A deep dive into the performance and efficiency of each communication channel.</p>
            
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <Card className="lg:col-span-2">
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

                <Card>
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
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <HeatmapMatrix />
                
                <Card className="lg:col-span-2">
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

                 <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Cost-to-Conversion</CardTitle>
                        <CardDescription>Relative efficiency of each channel.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-4 text-center justify-center p-6 bg-secondary rounded-lg text-muted-foreground italic">
                            <p>Awaiting data...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
