
'use client';

import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DollarSign, Filter, Target, TrendingUp, Lightbulb, ChevronDown, ChevronUp, Instagram, Facebook, Users, MessageSquare, Phone, ChevronRight, ThumbsUp, MousePointerClick, Star, Eye, Calendar as CalendarIcon, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell, FunnelChart, Funnel, LabelList, CartesianGrid, AreaChart, Area, Legend } from 'recharts';
import { Search } from "lucide-react";
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Check } from 'lucide-react';
import { subDays } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AiChatAnalysis } from '@/components/dashboard/AiChatAnalysis';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';


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
    leadsGenerated: { title: "Leads Generated", value: "0", icon: <Users className="text-blue-500" /> },
    cpl: { title: "Cost per Lead (CPL)", value: "$0.00", icon: <DollarSign className="text-green-500" /> },
    engagementRate: { title: "Engagement Rate", value: "0%", icon: <MousePointerClick className="text-purple-500" />, tooltipText: "Percentage of exposed leads who reacted, clicked, or interacted with an ad." },
    leadQualityScore: { title: "Lead Quality Score", value: "0/100", icon: <Star className="text-yellow-500" />, tooltipText: "An AI-generated score indicating the potential quality of a lead based on their initial interaction." }
};


const sourceData: any[] = [];

const engagementData: any[] = [];

const funnelData: any[] = [];

const campaignData: any[] = [];

const detailedLeadsData: any[] = [];

const allRevenueVsSpendData: any[] = [];

const revenueByCampaignData: any[] = [];

const hotLeadPercentageData: any[] = [];

const LeadsGeneratedDialog = () => {
    const [selectedLead, setSelectedLead] = useState<any | null>(null);

    const platforms = [...new Set(campaignData.map(c => c.platform))];

    return (
        <div className="flex flex-col h-full bg-muted/30">
            <DialogHeader className="p-6 border-b bg-background">
                <DialogTitle className="text-2xl font-headline">Leads Generated Analytics</DialogTitle>
                <DialogDescription>A detailed, drillable view of all leads generated from your campaigns.</DialogDescription>
            </DialogHeader>

            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 bg-background border-b">
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Leads Exposed</CardTitle><Eye className="text-blue-500 h-4 w-4" /></CardHeader><CardContent><div className="text-2xl font-bold">0</div></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Engagement Rate</CardTitle><MousePointerClick className="text-purple-500 h-4 w-4" /></CardHeader><CardContent><div className="text-2xl font-bold">0%</div></CardContent></Card>
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
                        <div className="text-sm font-semibold">None</div>
                        <p className="text-xs text-muted-foreground">No engagement yet</p>
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
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 29),
        to: new Date(),
    });

    const revenueVsSpendData = useMemo(() => {
        if (!dateRange || !dateRange.from) return [];
        return allRevenueVsSpendData
            .filter(item => {
                const itemDate = new Date(item.date);
                const from = new Date(dateRange.from!);
                from.setHours(0,0,0,0);
                const to = dateRange.to ? new Date(dateRange.to) : new Date();
                to.setHours(23,59,59,999);
                return itemDate >= from && itemDate <= to;
            })
            .map(item => ({...item, name: format(item.date, 'MMM d')}));
    }, [dateRange]);

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
                <Card className="lg:col-span-8">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <CardTitle>Revenue vs. Ad Spend</CardTitle>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        "w-[300px] justify-start text-left font-normal",
                                        !dateRange && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateRange?.from ? (
                                        dateRange.to ? (
                                        <>
                                            {format(dateRange.from, "LLL dd, y")} -{" "}
                                            {format(dateRange.to, "LLL dd, y")}
                                        </>
                                        ) : (
                                        format(dateRange.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="end">
                                    <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={dateRange?.from}
                                    selected={dateRange}
                                    onSelect={setDateRange}
                                    numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardHeader>
                    <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueVsSpendData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickFormatter={(val) => `₹${val/1000}k`} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)' }} />
                                <Legend wrapperStyle={{fontSize: "12px"}}/>
                                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                                <Area type="monotone" dataKey="spend" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorSpend)" name="Ad Spend" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Campaign Deep Dive</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            <Card>
                                <CardHeader><CardTitle>Revenue by Campaign</CardTitle></CardHeader>
                                <CardContent className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={revenueByCampaignData} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" width={110} fontSize={12} />
                                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)' }} />
                                            <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                                            {revenueByCampaignData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle>Hot Lead % by Campaign</CardTitle></CardHeader>
                                <CardContent className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={hotLeadPercentageData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" fontSize={12}/>
                                            <YAxis unit="%" />
                                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)' }} />
                                            <Bar dataKey="hotLeadPercentage" name="Hot Lead %" radius={[4, 4, 0, 0]}>
                                                {hotLeadPercentageData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                        <Table>
                            <TableHeader><TableRow><TableHead>Campaign</TableHead><TableHead>Spend</TableHead><TableHead>Revenue</TableHead><TableHead>ROI</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                            <TableBody>
                            {campaignData.map(c => (
                                <TableRow key={c.id}>
                                <TableCell className="font-medium">{c.name}</TableCell>
                                <TableCell>₹{c.spend.toLocaleString()}</TableCell>
                                <TableCell>₹{c.revenue.toLocaleString()}</TableCell>
                                <TableCell>{c.roi.toFixed(2)}x</TableCell>
                                <TableCell><Badge variant="outline">{c.status}</Badge></TableCell>
                                </TableRow>
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

    