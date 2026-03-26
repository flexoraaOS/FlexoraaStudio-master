
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Bot, Save, Shield, SlidersHorizontal, Sparkles, HelpCircle, User, GitCompareArrows, AlertTriangle, Percent, Hand, Settings, BrainCircuit, GitBranch, Upload, History, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { DateRange } from 'react-day-picker';
import { format, subDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';

const InfoTooltip = ({ text }: { text: string }) => (
    <Popover>
        <PopoverTrigger asChild>
            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="w-80 text-sm">{text}</PopoverContent>
    </Popover>
);

const versionHistoryData: { version: string; date: Date; author: string; changes: string; }[] = [];

const VersioningCard = () => {
    const { toast } = useToast();
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 29),
        to: new Date(),
    });

    const handleRollback = (version: string) => {
         toast({
            title: "Rollback Initiated",
            description: `Rolling back to configuration ${version}.`,
        });
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                     <div>
                        <CardTitle className="flex items-center gap-2"><History className="h-5 w-5"/> AI Configuration Versioning</CardTitle>
                        <CardDescription>Track and rollback changes to the AI's behavior and rules.</CardDescription>
                    </div>
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
            <CardContent>
                <div className="relative pt-8 pb-4">
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-border"></div>
                    <div className="relative flex justify-around">
                        {versionHistoryData.map(v => (
                            <Popover key={v.version}>
                                <PopoverTrigger asChild>
                                    <button className="flex flex-col items-center gap-2 group">
                                        <div className="h-4 w-4 rounded-full bg-background border-2 border-primary group-hover:scale-125 transition-transform" />
                                        <span className="text-xs font-semibold">{v.version}</span>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="space-y-3">
                                        <h4 className="font-semibold">{v.version} - {format(v.date, "PPP")}</h4>
                                        <p className="text-sm text-muted-foreground">Changed by: {v.author}</p>
                                        <p className="text-sm text-muted-foreground">Change: <span className="text-foreground italic">"{v.changes}"</span></p>
                                        <Separator />
                                        <Button size="sm" className="w-full" onClick={() => handleRollback(v.version)}>Rollback to this version</Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function AiPersonaPage() {
    const { toast } = useToast();

    const handleSaveSettings = () => {
        toast({
            title: "AgentOS Settings Saved!",
            description: "Your new AI configurations have been applied in real-time.",
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <div>
                    <h1 className="text-3xl font-bold font-headline">AgentOS: AI & Persona Settings</h1>
                    <p className="text-muted-foreground mt-1">
                        Manager-level controls to govern AgentOS behavior, rules, and autonomy.
                    </p>
                </div>
                 <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" /> Save All Changes
                </Button>
            </div>

            <VersioningCard />

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    {/* AI Operating Mode */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-5 w-5"/> AI Operating Mode (Global)</CardTitle>
                            <CardDescription>Set the global autonomy and aggressiveness for the AI across all interactions.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="autonomy-mode" className="flex items-center gap-2">AI Autonomy Mode <InfoTooltip text="Controls how independently the AI operates."/></Label>
                                <Select defaultValue="semi_autonomous">
                                    <SelectTrigger id="autonomy-mode"><SelectValue placeholder="Select mode..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="assist_only">
                                            <div className="flex flex-col">
                                                <p>Assist Only</p>
                                                <p className="text-xs text-muted-foreground">AI suggests replies; SDR sends them.</p>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="semi_autonomous">
                                            <div className="flex flex-col">
                                                <p>Semi-Autonomous</p>
                                                <p className="text-xs text-muted-foreground">AI handles routine chat, handing off for key decisions.</p>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="autonomous">
                                            <div className="flex flex-col">
                                                <p>Fully Autonomous</p>
                                                <p className="text-xs text-muted-foreground">AI manages conversations end-to-end.</p>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="aggressiveness-level" className="flex items-center gap-2">AI Aggressiveness Level <InfoTooltip text="Determines how assertive the AI is in pursuing goals."/></Label>
                                <Select defaultValue="balanced">
                                    <SelectTrigger id="aggressiveness-level"><SelectValue placeholder="Select level..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="conservative">
                                            <div className="flex flex-col">
                                                <p>Conservative</p>
                                                <p className="text-xs text-muted-foreground">Prioritizes safety, escalates if uncertain.</p>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="balanced">
                                            <div className="flex flex-col">
                                                <p>Balanced</p>
                                                <p className="text-xs text-muted-foreground">A mix of caution and proactivity.</p>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="aggressive">
                                            <div className="flex flex-col">
                                                <p>Aggressive</p>
                                                <p className="text-xs text-muted-foreground">Pushes for outcomes (e.g., bookings).</p>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5"/> AI Knowledge Base</CardTitle>
                            <CardDescription>Train the AI on your company's information to ensure accurate, on-brand responses.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="relative block w-full rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary/50 transition-colors">
                                <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                                <span className="mt-2 block text-sm font-semibold text-foreground">
                                    Upload documents
                                </span>
                                <span className="text-xs text-muted-foreground">PDF, DOCX, or TXT up to 10MB</span>
                            </div>
                             <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground">
                                    Or
                                    </span>
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="faq-paste">Paste FAQs or Text</Label>
                                <Textarea id="faq-paste" rows={6} placeholder="Q: What are your shipping times?&#10;A: We ship within 3-5 business days."/>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sales Persona & Brand Voice */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5"/> Sales Persona & Brand Voice</CardTitle>
                            <CardDescription>Define how the AI communicates to reflect your brand.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="space-y-2">
                                <Label htmlFor="sales-persona" className="flex items-center gap-2">Sales Persona <InfoTooltip text="This pre-defined persona dictates the AI's overall strategy and conversational style."/></Label>
                                <Select defaultValue="consultative_expert">
                                    <SelectTrigger id="sales-persona"><SelectValue placeholder="Select persona..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="consultative_expert">Consultative Expert</SelectItem>
                                        <SelectItem value="fast_closer">Fast Closer</SelectItem>
                                        <SelectItem value="relationship_builder">Relationship Builder</SelectItem>
                                        <SelectItem value="challenger_authority">Challenger Authority</SelectItem>
                                        <SelectItem value="friendly_assistant">Friendly Assistant</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                                <div className="space-y-3">
                                    <Label className="flex items-center gap-2">Formality <InfoTooltip text="0: Very casual, uses slang. 100: Very formal, professional language."/></Label>
                                    <Slider defaultValue={[70]} max={100} step={1} />
                                </div>
                                <div className="space-y-3">
                                    <Label className="flex items-center gap-2">Verboisty <InfoTooltip text="0: Extremely concise. 100: Very detailed and verbose."/></Label>
                                    <Slider defaultValue={[50]} max={100} step={1} />
                                </div>
                                <div className="space-y-3">
                                    <Label className="flex items-center gap-2">Empathy <InfoTooltip text="How much the AI mirrors and validates user emotions."/></Label>
                                    <Slider defaultValue={[80]} max={100} step={1} />
                                </div>
                                 <div className="space-y-3">
                                    <Label className="flex items-center gap-2">Authority <InfoTooltip text="How strongly the AI projects expertise and confidence."/></Label>
                                    <Slider defaultValue={[75]} max={100} step={1} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Objection & Discount Control */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Percent className="h-5 w-5"/> Global Objection & Discount Control</CardTitle>
                            <CardDescription>Set guardrails for how the AI handles sales objections and discounts.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-8">
                             <div className="space-y-4">
                                <Label className="flex items-center gap-2">Enabled Objections <InfoTooltip text="Select which types of objections the AI is allowed to handle on its own."/></Label>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2"><Switch id="obj-price" defaultChecked/><Label htmlFor="obj-price">Price</Label></div>
                                    <div className="flex items-center space-x-2"><Switch id="obj-trust" defaultChecked/><Label htmlFor="obj-trust">Trust / Credibility</Label></div>
                                    <div className="flex items-center space-x-2"><Switch id="obj-timing" /><Label htmlFor="obj-timing">Timing</Label></div>
                                    <div className="flex items-center space-x-2"><Switch id="obj-competition"/><Label htmlFor="obj-competition">Competition</Label></div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="max-discount" className="flex items-center gap-2">Max. Allowable Discount (%)<InfoTooltip text="The absolute maximum discount percentage the AI can offer without manager approval."/></Label>
                                    <Input id="max-discount" type="number" defaultValue="15" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="discount-approval" defaultChecked/>
                                    <Label htmlFor="discount-approval" className="flex items-center gap-2">Discount Requires SDR Approval<InfoTooltip text="If enabled, AI will confirm with an SDR before offering any discount."/></Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                <div className="lg:col-span-1 space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><GitBranch className="h-5 w-5"/> Lead Routing & SDR Load Management</CardTitle>
                            <CardDescription>Configure how incoming leads are assigned and protect team capacity.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="routing-mode" className="flex items-center gap-2">Routing Mode <InfoTooltip text="Automatic: AI assigns leads based on SDR load. Manual: Leads appear in an unassigned queue for a manager to assign."/></Label>
                                <Select defaultValue="automatic">
                                    <SelectTrigger id="routing-mode"><SelectValue placeholder="Select mode..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="automatic">Automatic</SelectItem>
                                        <SelectItem value="manual">Manual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="max-convos" className="flex items-center gap-2">Max Active Conversations / SDR<InfoTooltip text="The maximum number of conversations one SDR can handle simultaneously."/></Label>
                                <Input id="max-convos" type="number" defaultValue="15" />
                            </div>
                        </CardContent>
                    </Card>
                     {/* Risk & Escalation */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5"/> Escalation & Risk Settings</CardTitle>
                            <CardDescription>Define rules for flagging at-risk revenue or escalating to managers.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="space-y-2">
                                <Label htmlFor="risk-idle-time" className="flex items-center gap-2">Idle Time for Risk Flag (minutes)<InfoTooltip text="Flag a lead as 'at-risk' if they are idle for this many minutes after showing high intent."/></Label>
                                <Input id="risk-idle-time" type="number" defaultValue="60" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="min-deal-value" className="flex items-center gap-2">Min. Deal Value for Risk Flag<InfoTooltip text="Automatically flag leads with a potential deal value above this amount."/></Label>
                                <Input id="min-deal-value" type="number" placeholder="e.g. 50000" />
                            </div>
                        </CardContent>
                    </Card>
                    
                    {/* AI Governance & Safety */}
                    <Card className="border-destructive/50">
                        <CardHeader>
                            <CardTitle className="text-destructive flex items-center gap-2"><Shield className="h-5 w-5"/> AI Governance & Safety</CardTitle>
                            <CardDescription>Global kill switches and safety controls.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <Label>Tactic Control</Label>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><Label htmlFor="urgency-tactics">Allow Urgency Tactics</Label><Switch id="urgency-tactics"/></div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><Label htmlFor="emotional-persuasion">Allow Emotional Persuasion</Label><Switch id="emotional-persuasion"/></div>
                            </div>
                            <div className="space-y-3">
                                <Label>Kill Switches</Label>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20"><Label htmlFor="pause-replies" className="text-destructive">PAUSE All AI Replies</Label><Switch id="pause-replies"/></div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20"><Label htmlFor="pause-routing" className="text-destructive">PAUSE Auto Routing</Label><Switch id="pause-routing"/></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
