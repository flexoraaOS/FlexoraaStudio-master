
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FunnelChart, Funnel, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { Lightbulb, TrendingDown, Users, FileText, Phone, MessageSquare, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { analyzeDropOff } from '@/ai/flows/analyze-dropoff';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { AiChatAnalysis } from '@/components/dashboard/AiChatAnalysis';
import { EmptyState } from '@/components/ui/empty-state';

type StageName = 'Leads' | 'Contacted' | 'Qualified' | 'Booked' | 'Closed';

const funnelData: any[] = [];

const funnelDataWithDropOff = funnelData.map((item, index) => {
    if (index === 0) return { ...item, dropOff: 0 };
    const previousStageValue = funnelData[index - 1].value;
    const dropOff = ((previousStageValue - item.value) / previousStageValue) * 100;
    return { ...item, dropOff };
});

const overallConversion = funnelData.length > 0 
    ? ((funnelData[funnelData.length - 1].value / funnelData[0].value) * 100).toFixed(1) 
    : "0.0";

const stageLeadsData: Record<StageName, any[]> = {
    'Leads': [],
    'Contacted': [],
    'Qualified': [],
    'Booked': [],
    'Closed': [],
}

const CustomTooltipContent = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="p-3 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-xl">
                <p className="font-bold text-lg">{`${data.name}: ${data.value.toLocaleString()}`}</p>
                {data.dropOff > 0 && 
                    <p className="text-sm text-red-400 flex items-center mt-1">
                        <TrendingDown className="mr-1 h-4 w-4" />
                        {`${data.dropOff.toFixed(1)}% drop-off from previous stage`}
                    </p>
                }
            </div>
        );
    }
    return null;
};

export function DropOffAnalysis() {
    const [panelOpen, setPanelOpen] = React.useState(false);
    const [selectedStage, setSelectedStage] = React.useState<StageName | null>(null);
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 29),
        to: new Date(),
    });

    const handleStageClick = (props: any) => {
        if(props && props.name) {
            setSelectedStage(props.name as StageName);
            setPanelOpen(true);
        }
    }
    
    const leadsForStage = selectedStage ? stageLeadsData[selectedStage] : [];

    return (
        <>
            <Card className="col-span-1 lg:col-span-3">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <CardTitle>Lead Journey Drop-off</CardTitle>
                            <CardDescription>From initial assignment to closed deal.</CardDescription>
                        </div>
                         <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-full sm:w-[300px] justify-start text-left font-normal",
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
                <CardContent className="h-[350px]">
                    {funnelData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <FunnelChart>
                            <defs>
                                <linearGradient id="gradient-leads" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0.2}/>
                                </linearGradient>
                                <linearGradient id="gradient-contacted" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0.2}/>
                                </linearGradient>
                                <linearGradient id="gradient-qualified" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0.2}/>
                                </linearGradient>
                                <linearGradient id="gradient-booked" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.2}/>
                                </linearGradient>
                                <linearGradient id="gradient-closed" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.2}/>
                                </linearGradient>
                            </defs>
                            <Tooltip content={<CustomTooltipContent />} />
                            <Funnel
                                dataKey="value"
                                data={funnelDataWithDropOff}
                                isAnimationActive
                                lastShapeType="rectangle"
                                orientation="vertical"
                            >
                                <LabelList position="right" fill="hsl(var(--foreground))" stroke="none" dataKey="name" className="font-semibold" />
                                {funnelData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={entry.fill} 
                                        className="funnel-stage"
                                        onClick={() => handleStageClick(entry)}
                                    />
                                ))}
                            </Funnel>
                        </FunnelChart>
                    </ResponsiveContainer>
                    ) : (
                        <EmptyState />
                    )}
                </CardContent>
                <CardFooter className="flex-col items-start gap-4 text-sm pt-4 border-t">
                    <div className="flex gap-2 font-medium leading-none">
                        Overall Conversion Rate: <span className="text-primary font-bold">{overallConversion}%</span>
                    </div>
                </CardFooter>
            </Card>

            <Sheet open={panelOpen} onOpenChange={setPanelOpen}>
                 <SheetContent className="w-full sm:max-w-2xl">
                     <SheetHeader>
                        <SheetTitle>Leads in "{selectedStage}" Stage</SheetTitle>
                        <SheetDescription>Review the leads currently in this stage and take action.</SheetDescription>
                    </SheetHeader>
                     <div className="max-h-[calc(100vh-8rem)] overflow-y-auto py-4">
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Lead</TableHead>
                                    <TableHead>Contact Info</TableHead>
                                    <TableHead>Notes</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leadsForStage.map(lead => (
                                    <TableRow key={lead.id}>
                                        <TableCell className="font-medium">{lead.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm">
                                                {lead.contactMethod === 'Phone' ? <Phone className="h-4 w-4 text-muted-foreground"/> : <MessageSquare className="h-4 w-4 text-muted-foreground" />}
                                                <span>{lead.lastContact}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground max-w-xs">{lead.notes}</TableCell>
                                        <TableCell>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="ghost" size="sm"><Lightbulb className="mr-2 h-4 w-4"/> Suggestion</Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <p className="text-sm text-primary italic">{lead.tip}</p>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
