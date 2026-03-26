

'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList, CartesianGrid } from 'recharts';
import { Search, Filter, DollarSign, Target, TrendingUp, Lightbulb, ChevronDown, ChevronUp, Instagram, Facebook, Users, MessageSquare, Phone, ChevronRight, ThumbsUp, MousePointerClick, Star, Eye, Calendar as CalendarIcon, Info } from "lucide-react";
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Check } from 'lucide-react';
import { subDays } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AiChatAnalysis } from '@/components/dashboard/AiChatAnalysis';

// --- Reusable Components ---

const KpiCard = ({ title, value, change, changeType, icon, children, tooltipText }: { title: string, value: string, change?: string, changeType?: 'increase' | 'decrease', icon: React.ReactNode, children?: React.ReactNode, tooltipText?: string }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                        {title}
                        {tooltipText && (
                            <Popover>
                                <PopoverTrigger onClick={(e) => e.stopPropagation()}><Info className="h-3 w-3"/></PopoverTrigger>
                                <PopoverContent className="text-xs w-64">{tooltipText}</PopoverContent>
                            </Popover>
                        )}
                    </CardTitle>
                    {icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                    {change && <p className={cn("text-xs", changeType === 'increase' ? 'text-green-500' : 'text-red-500')}>
                        {change} from last month
                    </p>}
                </CardContent>
            </Card>
        </DialogTrigger>
        {children && (
             <DialogContent className="max-w-7xl h-[90vh]">
                {children}
            </DialogContent>
        )}
    </Dialog>
);

const ChartWrapper = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <Card className="col-span-1">
        <CardHeader>
            <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
            {children}
        </CardContent>
    </Card>
);

// --- Dummy Data ---

const kpiData = {
    leadsGenerated: { title: "Leads Generated", value: "7,890", change: "+12.5%", changeType: "increase" as const, icon: <Users className="text-blue-500" /> },
    cpl: { title: "Cost per Lead (CPL)", value: "$4.52", change: "-8.2%", changeType: "decrease" as const, icon: <DollarSign className="text-green-500" /> },
    engagementRate: { title: "Engagement Rate", value: "18.2%", change: "+2.5%", changeType: "increase" as const, icon: <MousePointerClick className="text-purple-500" />, tooltipText: "Percentage of exposed leads who reacted, clicked, or interacted with an ad." },
    leadQualityScore: { title: "Lead Quality Score", value: "88/100", change: "+3 pts", changeType: "increase" as const, icon: <Star className="text-yellow-500" />, tooltipText: "An AI-generated score indicating the potential quality of a lead based on their initial interaction." }
};


const sourceData = [
    { name: 'Instagram', value: 400, fill: 'var(--color-instagram)' },
    { name: 'Facebook', value: 300, fill: 'var(--color-facebook)' },
    { name: 'WhatsApp', value: 200, fill: 'var(--color-whatsapp)' },
    { name: 'Email', value: 100, fill: 'var(--color-email)' },
];

const engagementData = [
    { name: 'Likes', value: 12500, fill: 'hsl(var(--chart-1))' },
    { name: 'Comments', value: 3200, fill: 'hsl(var(--chart-2))' },
    { name: 'Shares', value: 1800, fill: 'hsl(var(--chart-3))' },
    { name: 'Link Clicks', value: 4500, fill: 'hsl(var(--chart-4))' },
];

const funnelData = [
    { name: 'Impressions', value: 150000, fill: "hsl(var(--chart-5))" },
    { name: 'Engagements', value: 20000, fill: "hsl(var(--chart-4))" },
    { name: 'Leads', value: 7890, fill: "hsl(var(--chart-3))" },
    { name: 'Qualified', value: 1578, fill: "hsl(var(--chart-2))" },
    { name: 'Bookings', value: 535, fill: "hsl(var(--chart-1))" },
];

const campaignData = [
    { id: 1, name: "Summer Sale IG Blitz", platform: "Instagram", spend: 1200, leads: 450, cpl: 2.67, roi: 4.5, hook: "Scarcity", status: "Active" },
    { id: 2, name: "FB Lead Gen Form - Q3", platform: "Facebook", spend: 2500, leads: 820, cpl: 3.05, roi: 3.2, hook: "Social Proof", status: "Active" },
    { id: 3, name: "WhatsApp Welcome Offer", platform: "WhatsApp", spend: 500, leads: 310, cpl: 1.61, roi: 6.1, hook: "Reciprocity", status: "Paused" },
    { id: 4, name: "Fall Collection Teaser", platform: "Instagram", spend: 800, leads: 250, cpl: 3.20, roi: 2.8, hook: "Curiosity", status: "Active" },
    { id: 5, name: "End of Season FB Retargeting", platform: "Facebook", spend: 1500, leads: 550, cpl: 2.73, roi: 3.9, hook: "Commitment", status: "Completed" },
];


const detailedLeadsData = Array.from({ length: 50 }, (_, i) => ({
    id: `LEAD-${1000 + i}`,
    name: `Lead Name ${i + 1}`,
    email: `lead${i+1}@example.com`,
    phone: `+1-555-01${String(i).padStart(2, '0')}`,
    source: campaignData[i % campaignData.length].name,
    adSet: `Ad Set ${ (i % 3) + 1 }`,
    ad: `Ad Creative ${ (i % 2) + 1 }`,
    platform: campaignData[i % campaignData.length].platform,
    interaction: ['Viewed Ad', 'Clicked Link', 'Sent Message', 'Commented'][i % 4],
    timestamp: subDays(new Date(), i).toISOString(),
    status: ['New', 'In Progress', 'Qualified'][i % 3],
    sdr: ['Alex Green', 'Jane Smith', 'Unassigned'][i % 3],
    confidence: Math.floor(Math.random() * 40) + 60,
    intent: ['High', 'Medium', 'Low'][i % 3],
    firstMessage: 'Hey, I saw your ad on Instagram and was interested in learning more about the summer collection. Do you have this in a size M?',
    utm: {
        source: campaignData[i % campaignData.length].platform.toLowerCase(),
        medium: 'cpc',
        campaign: campaignData[i % campaignData.length].name.toLowerCase().replace(/ /g, '_'),
    },
}));


const LeadsGeneratedDialog = () => {
    const [selectedLead, setSelectedLead] = useState<typeof detailedLeadsData[0] | null>(detailedLeadsData[0]);

    const platforms = [...new Set(campaignData.map(c => c.platform))];

    return (
        <div className="flex flex-col h-full bg-muted/30">
            <DialogHeader className="p-6 border-b bg-background">
                <DialogTitle className="text-2xl font-headline">Leads Generated Analytics</DialogTitle>
                <DialogDescription>A detailed, drillable view of all leads generated from your campaigns.</DialogDescription>
            </DialogHeader>

            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 bg-background border-b">
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Leads Exposed</CardTitle><Eye className="text-blue-500 h-4 w-4" /></CardHeader><CardContent><div className="text-2xl font-bold">150,000</div></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Engagement Rate</CardTitle><MousePointerClick className="text-purple-500 h-4 w-4" /></CardHeader><CardContent><div className="text-2xl font-bold">18.2%</div></CardContent></Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Platform Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm space-y-1">
                        {sourceData.slice(0,3).map(s => (
                            <div key={s.name} className="flex justify-between">
                                <span>{s.name}</span>
                                <span className="font-semibold">{s.value}</span>
                            </div>
                        ))}
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Highest Engagement</CardTitle>
                        <TrendingUp className="text-primary h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-semibold">Summer Sale IG</div>
                        <p className="text-xs text-muted-foreground">Highest engagement scores</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-12 flex-1 overflow-hidden">
                {/* Main Content */}
                <div className="md:col-span-8 lg:col-span-9 flex flex-col overflow-hidden bg-background">
                    {/* Table */}
                    <div className="p-6 flex-1 overflow-y-auto">
                        <div className="flex items-center gap-2 mb-4">
                             <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search leads by name, email..." className="pl-8" />
                            </div>
                        </div>
                        <div className="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Lead ID</TableHead>
                                        <TableHead>Platform</TableHead>
                                        <TableHead>Interaction Type</TableHead>
                                        <TableHead>Timestamp</TableHead>
                                        <TableHead>AI Score</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {detailedLeadsData.map(lead => (
                                        <TableRow key={lead.id}>
                                            <TableCell className="font-mono text-xs">{lead.id}</TableCell>
                                            <TableCell>{lead.platform}</TableCell>
                                            <TableCell><Badge variant="outline">{lead.interaction}</Badge></TableCell>
                                            <TableCell className="text-muted-foreground">{new Date(lead.timestamp).toLocaleDateString()}</TableCell>
                                            <TableCell><Badge>{lead.confidence}</Badge></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>

                {/* Insights panel */}
                <aside className="md:col-span-4 lg:col-span-3 border-l bg-secondary/30 p-6 overflow-y-auto flex flex-col gap-6">
                   <Card>
                    <CardHeader>
                        <CardTitle>Campaign Leaderboard</CardTitle>
                        <CardDescription>Ranked by engagement</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {campaignData.slice(0, 3).map((campaign, index) => (
                            <div key={campaign.id} className="flex items-center gap-3">
                                <div className="font-bold text-lg">{index + 1}</div>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">{campaign.name}</p>
                                    <p className="text-xs text-muted-foreground">{campaign.leads} leads</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                   </Card>
                </aside>
            </div>
             <DialogFooter className="p-6 border-t bg-background">
                <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                </DialogClose>
            </DialogFooter>
        </div>
    );
};

const CPLBreakdownDialog = () => (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Cost Per Lead (CPL) Breakdown</DialogTitle>
            <DialogDescription>Detailed cost per lead for each campaign.</DialogDescription>
        </DialogHeader>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Spend</TableHead>
                    <TableHead>Leads</TableHead>
                    <TableHead className="text-right">CPL</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {campaignData.map(campaign => (
                    <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>${campaign.spend.toLocaleString()}</TableCell>
                        <TableCell>{campaign.leads.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${campaign.cpl.toFixed(2)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </DialogContent>
);

const ROIBreakdownDialog = () => (
     <DialogContent>
        <DialogHeader>
            <DialogTitle>Return on Investment (ROI) Breakdown</DialogTitle>
            <DialogDescription>Detailed ROI for each campaign.</DialogDescription>
        </DialogHeader>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Spend</TableHead>
                    <TableHead>Revenue (Est.)</TableHead>
                    <TableHead className="text-right">ROI</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {campaignData.map(campaign => {
                    const revenue = campaign.spend * campaign.roi;
                    return (
                        <TableRow key={campaign.id}>
                            <TableCell className="font-medium">{campaign.name}</TableCell>
                            <TableCell>${campaign.spend.toLocaleString()}</TableCell>
                            <TableCell>${revenue.toLocaleString()}</TableCell>
                            <TableCell className="text-right font-semibold text-green-500">{(campaign.roi * 100).toFixed(0)}%</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    </DialogContent>
);


export default function CampaignIntelligencePage() {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const platformIcons: Record<string, JSX.Element> = {
        "Instagram": <Instagram className="h-5 w-5" style={{color: 'var(--color-instagram)'}} />,
        "Facebook": <Facebook className="h-5 w-5" style={{color: 'var(--color-facebook)'}}/>,
        "WhatsApp": <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="var(--color-whatsapp)" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round"><path d="M16.75 13.96c.25.13.43.2.5.25.13.06.18.06.25.06.13 0 .25 0 .38-.06.18-.06.38-.25.56-.5.18-.25.25-.5.25-.75s-.06-.5-.13-.75c-.06-.12-.12-.25-.19-.31-.06-.06-.13-.13-.19-.19-.13-.12-.25-.25-.38-.37-.31-.32-.56-.57-.75-.82-.19-.25-.31-.44-.38-.56-.06-.13-.06-.25-.06-.38s.06-.25.13-.38c.12-.12.25-.25.38-.37.12-.13.25-.25.31-.38.13-.18.25-.37.31-.56.06-.19.06-.37.06-.56s0-.38-.06-.5c-.06-.13-.13-.25-.25-.38-.13-.12-.25-.25-.38-.37a1.6 1.6 0 0 0-.5-.32c-.19-.06-.38-.06-.56-.06-.19 0-.38 0-.5.06-.13.06-.25.13-.38.19-.06.06-.13.13-.19.19-.13.13-.25.25-.32.38-.06.13-.13.25-.19.38-.06.06-.13.13-.13.19-.06.12-.06.25-.06.38s.06.25.13.38c.19.31.44.56.75.82.31.25.56.44.75.56.19.13.31.25.38.31.06.06.13.13.13.19s-.06.19-.06.25c0 .06 0 .13-.06.19-.06.06-.13.13-.19.19zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/></svg>,
    };

    return (
      <div className="space-y-6">
        <style>{`
            :root {
                --color-instagram: #E4405F;
                --color-facebook: #1877F2;
                --color-whatsapp: #25D366;
                --color-email: #EA4335;
            }
        `}</style>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold font-headline">Campaign Intelligence</h1>
            <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:flex-grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search campaigns..." className="pl-8 sm:w-[300px]" />
                </div>
                <Button variant="outline"><Filter className="mr-2 h-4 w-4" />Filters</Button>
            </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <KpiCard {...kpiData.leadsGenerated}><LeadsGeneratedDialog /></KpiCard>
            <KpiCard {...kpiData.cpl}><CPLBreakdownDialog /></KpiCard>
            <KpiCard {...kpiData.engagementRate} />
            <KpiCard {...kpiData.leadQualityScore} />
        </div>


        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <main className="lg:col-span-2 space-y-6">
                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ChartWrapper title="Source Attribution">
                       <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}/>
                                <Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                    {sourceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartWrapper>
                    <ChartWrapper title="Engagement Metrics">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={engagementData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <YAxis dataKey="name" type="category" width={80} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}/>
                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                     {engagementData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartWrapper>
                </div>
                <ChartWrapper title="Conversion Path">
                    <ResponsiveContainer width="100%" height="100%">
                        <FunnelChart>
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}/>
                            <Funnel dataKey="value" data={funnelData} isAnimationActive>
                                <LabelList position="right" fill="hsl(var(--foreground))" stroke="none" dataKey="name" />
                                {funnelData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                            </Funnel>
                        </FunnelChart>
                    </ResponsiveContainer>
                </ChartWrapper>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Campaigns</CardTitle>
                        <CardDescription>Detailed breakdown of all active and past campaigns.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12"></TableHead>
                                    <TableHead>Campaign</TableHead>
                                    <TableHead>Platform</TableHead>
                                    <TableHead>Spend</TableHead>
                                    <TableHead>Leads</TableHead>
                                    <TableHead>CPL</TableHead>
                                    <TableHead>Hook Tag</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {campaignData.map(campaign => (
                                    <React.Fragment key={campaign.id}>
                                        <TableRow className="cursor-pointer" onClick={() => setExpandedRow(expandedRow === campaign.id ? null : campaign.id)}>
                                            <TableCell>
                                                {expandedRow === campaign.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                            </TableCell>
                                            <TableCell className="font-medium">{campaign.name}</TableCell>
                                            <TableCell>{platformIcons[campaign.platform]}</TableCell>
                                            <TableCell>${campaign.spend.toLocaleString()}</TableCell>
                                            <TableCell>{campaign.leads.toLocaleString()}</TableCell>
                                            <TableCell>${campaign.cpl.toFixed(2)}</TableCell>
                                            <TableCell><Badge variant="secondary">{campaign.hook}</Badge></TableCell>
                                            <TableCell><Badge variant={campaign.status === 'Active' ? 'default' : 'outline'}>{campaign.status}</Badge></TableCell>
                                        </TableRow>
                                        {expandedRow === campaign.id && (
                                            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                                                <TableCell colSpan={8} className="p-0">
                                                    <div className="p-4 grid grid-cols-4 gap-4">
                                                        <div><p className="text-xs text-muted-foreground">Impressions</p><p className="font-bold">150,234</p></div>
                                                        <div><p className="text-xs text-muted-foreground">Clicks</p><p className="font-bold">4,512</p></div>
                                                        <div><p className="text-xs text-muted-foreground">CTR</p><p className="font-bold">3.0%</p></div>
                                                        <div><p className="text-xs text-muted-foreground">Bookings</p><p className="font-bold">32</p></div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-fit">
                <AiChatAnalysis />
            </aside>
        </div>
      </div>
    );
}
