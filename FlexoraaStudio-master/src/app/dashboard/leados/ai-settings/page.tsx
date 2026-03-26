

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Bot, Save, Shield, SlidersHorizontal, Sparkles, HelpCircle, User, GitCompareArrows, AlertTriangle, Percent, Hand, Settings, BrainCircuit, GitBranch, CheckSquare, Filter, Milestone, BarChart, BookUser, ShieldCheck, AreaChart, GitCommitVertical, ListFilter, History, Calendar as CalendarIcon, Upload, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from 'react-day-picker';
import { format, subDays } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

const initialProducts: { id: string; name: string; price: number; minDiscount: number; maxDiscount: number; notes: string; }[] = [];

export default function LeadOSAIPersonaPage() {
    const { toast } = useToast();
    const [fileUploaded, setFileUploaded] = useState(false);
    const [products, setProducts] = useState(initialProducts);

    const handleSaveSettings = () => {
        toast({
            title: "LeadOS Settings Saved!",
            description: "Your new AI configurations have been applied.",
        });
    };

    const handleProductChange = (id: string, field: string, value: string | number) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    }
    
    const handleSaveProduct = (id: string) => {
        toast({
            title: "Product Settings Saved",
            description: `Changes for product ${id} have been saved.`,
        });
    }

    const handleUpload = () => {
        // Simulate file upload processing
        toast({
            title: "File Uploaded",
            description: "Product data has been extracted.",
        });
        setFileUploaded(true);
    }
    
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <div>
                    <h1 className="text-3xl font-bold font-headline">LeadOS: AI & Persona Settings</h1>
                    <p className="text-muted-foreground mt-1">
                        Manager-level controls for the AI qualification, scoring, and routing engine.
                    </p>
                </div>
                 <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" /> Save All Changes
                </Button>
            </div>

            <VersioningCard />

             <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    {/* Qualification & Scoring */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5"/>Qualification & Scoring</CardTitle>
                            <CardDescription>Control how the AI filters, qualifies, and scores incoming leads.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                           <div>
                                <h3 className="font-semibold mb-4 text-sm uppercase text-muted-foreground">Qualification Logic</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                     <div className="space-y-4">
                                        <Label htmlFor="qualification-strictness" className="flex items-center gap-2">AI Qualification Strictness <InfoTooltip text="Determines how aggressively the AI filters out leads. 'Strict' will result in fewer but higher-quality leads."/></Label>
                                        <Select defaultValue="balanced">
                                            <SelectTrigger id="qualification-strictness"><SelectValue placeholder="Select strictness..." /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="conservative">
                                                    <p>Conservative</p>
                                                    <p className="text-xs text-muted-foreground">Fewer HOT leads, higher quality.</p>
                                                </SelectItem>
                                                <SelectItem value="balanced">
                                                     <p>Balanced</p>
                                                    <p className="text-xs text-muted-foreground">A mix of volume and quality.</p>
                                                </SelectItem>
                                                <SelectItem value="aggressive">
                                                     <p>Aggressive</p>
                                                    <p className="text-xs text-muted-foreground">More HOT leads, lower filter.</p>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="space-y-4 pt-4">
                                            <Label htmlFor="verification-threshold" className="flex items-center gap-2">Minimum Verification Threshold <InfoTooltip text="The minimum confidence score required from the number verification ping to be considered a valid lead."/></Label>
                                            <Slider id="verification-threshold" defaultValue={[75]} max={100} step={1} />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="flex items-center gap-2">Auto-Disqualification Rules <InfoTooltip text="Automatically mark leads as 'Invalid' if they meet these criteria."/></Label>
                                        <div className="flex items-center space-x-2"><Checkbox id="dq-invalid" defaultChecked/><Label htmlFor="dq-invalid">Invalid phone number</Label></div>
                                        <div className="flex items-center space-x-2"><Checkbox id="dq-nowa" defaultChecked/><Label htmlFor="dq-nowa">No WhatsApp account</Label></div>
                                        <div className="flex items-center space-x-2"><Checkbox id="dq-negative" defaultChecked/><Label htmlFor="dq-negative">Negative intent detected (e.g., "not interested", etc.)</Label></div>
                                    </div>
                                </div>
                           </div>
                           <Separator />
                           <div>
                               <h3 className="font-semibold mb-4 text-sm uppercase text-muted-foreground">Scoring Model Control</h3>
                               <div className="space-y-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">Responsiveness<InfoTooltip text="How quickly a lead responds."/></Label>
                                            <Input type="number" defaultValue="30" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">Sentiment<InfoTooltip text="Positive, negative, or neutral sentiment in messages."/></Label>
                                            <Input type="number" defaultValue="25" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">Intent Keywords<InfoTooltip text="Presence of keywords like 'pricing', 'demo', etc.'"/></Label>
                                            <Input type="number" defaultValue="25" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">Channel Priority<InfoTooltip text="Weight given to leads from certain channels."/></Label>
                                            <Input type="number" defaultValue="10" />
                                        </div>
                                    </div>
                                    <div className="flex items-center pt-4 space-x-2">
                                        <Switch id="score-decay"/>
                                        <Label htmlFor="score-decay" className="flex items-center gap-2">Enable Score Decay <InfoTooltip text="Gradually decrease lead score over time if there is no interaction."/></Label>
                                    </div>
                                </div>
                           </div>
                        </CardContent>
                    </Card>

                    {/* Persona */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BookUser className="h-5 w-5"/> Lead Persona & Engagement Style</CardTitle>
                            <CardDescription>Define how the AI communicates to reflect your brand and sales strategy.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="space-y-2">
                                <Label htmlFor="sales-persona" className="flex items-center gap-2">Lead Engagement Persona <InfoTooltip text="This pre-defined persona dictates the AI's overall strategy and conversational style."/></Label>
                                <Select defaultValue="curious_qualifier">
                                    <SelectTrigger id="sales-persona" className="max-w-xs"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="polite_verifier">
                                            <p>Polite Verifier</p>
                                            <p className="text-xs text-muted-foreground">Gentle, respectful, verification-focused.</p>
                                        </SelectItem>
                                        <SelectItem value="curious_qualifier">
                                            <p>Curious Qualifier</p>
                                            <p className="text-xs text-muted-foreground">Asks open-ended questions to uncover needs.</p>
                                        </SelectItem>
                                        <SelectItem value="authority_checker">
                                            <p>Authority Checker</p>
                                            <p className="text-xs text-muted-foreground">Determines if the lead has decision-making power.</p>
                                        </SelectItem>
                                        <SelectItem value="fast_screener">
                                            <p>Fast Screener</p>
                                            <p className="text-xs text-muted-foreground">Quickly qualifies or disqualifies with direct questions.</p>
                                        </SelectItem>
                                        <SelectItem value="consultative_expert">
                                            <p>Consultative Expert</p>
                                            <p className="text-xs text-muted-foreground">Acts as a knowledgeable advisor to build trust.</p>
                                        </SelectItem>
                                        <SelectItem value="fast_closer">
                                            <p>Fast Closer</p>
                                            <p className="text-xs text-muted-foreground">Drives urgency and pushes for a quick decision.</p>
                                        </SelectItem>
                                        <SelectItem value="relationship_builder">
                                            <p>Relationship Builder</p>
                                            <p className="text-xs text-muted-foreground">Focuses on rapport and long-term connection.</p>
                                        </SelectItem>
                                        <SelectItem value="challenger_authority">
                                            <p>Challenger Authority</p>
                                            <p className="text-xs text-muted-foreground">Challenges assumptions to reframe the problem.</p>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                                <div className="space-y-3">
                                    <Label className="flex items-center gap-2">Tone: Neutral ↔ Friendly <InfoTooltip text="Adjusts the formality and warmth of the language."/></Label>
                                    <Slider defaultValue={[70]} max={100} step={1} />
                                </div>
                                <div className="space-y-3">
                                    <Label className="flex items-center gap-2">Style: Soft ↔ Direct <InfoTooltip text="Controls how assertive and to-the-point the AI is."/></Label>
                                    <Slider defaultValue={[50]} max={100} step={1} />
                                </div>
                                <div className="space-y-3">
                                    <Label className="flex items-center gap-2">Length: Short ↔ Detailed <InfoTooltip text="Defines the verbosity of the AI's messages."/></Label>
                                    <Slider defaultValue={[30]} max={100} step={1} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5"/> AI Knowledge Base & Product Rules</CardTitle>
                            <CardDescription>Train the AI on your products, pricing, and discount rules.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {!fileUploaded ? (
                                <>
                                    <div 
                                        className="relative block w-full rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                                        onClick={handleUpload}
                                    >
                                        <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                                        <span className="mt-2 block text-sm font-semibold text-foreground">
                                            Upload Product CSV
                                        </span>
                                        <span className="text-xs text-muted-foreground">CSV with columns: product_name, price</span>
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
                                </>
                            ) : (
                                <div className="space-y-4">
                                     <h3 className="font-semibold">Product Discount Rules</h3>
                                     <div className="border rounded-lg overflow-hidden">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Product</TableHead>
                                                    <TableHead>Min Discount (%)</TableHead>
                                                    <TableHead>Max Discount (%)</TableHead>
                                                    <TableHead>Notes for AI</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {products.map(product => (
                                                    <TableRow key={product.id}>
                                                        <TableCell>
                                                            <p className="font-medium">{product.name}</p>
                                                            <p className="text-xs text-muted-foreground">₹{product.price.toLocaleString()}</p>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input 
                                                                type="number" 
                                                                className="w-20" 
                                                                value={product.minDiscount}
                                                                onChange={(e) => handleProductChange(product.id, 'minDiscount', e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input 
                                                                type="number" 
                                                                className="w-20" 
                                                                value={product.maxDiscount}
                                                                onChange={(e) => handleProductChange(product.id, 'maxDiscount', e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Textarea 
                                                                placeholder="e.g., Highlight feature X..."
                                                                className="min-w-[200px]"
                                                                value={product.notes}
                                                                onChange={(e) => handleProductChange(product.id, 'notes', e.target.value)}
                                                                rows={1}
                                                             />
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <Button size="sm" onClick={() => handleSaveProduct(product.id)}>Save</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                     </div>
                                      <Button variant="outline" size="sm" onClick={() => setFileUploaded(false)}><Trash2 className="mr-2 h-4 w-4"/> Clear & Re-upload</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 space-y-8">
                     {/* Governance */}
                    <Card>
                        <CardHeader>
                             <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5"/>SDR & Funnel Governance</CardTitle>
                            <CardDescription>Enforce funnel integrity, prevent SDR overload, and manage routing.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                             <div>
                                <h3 className="font-semibold mb-4 text-sm uppercase text-muted-foreground">SDR Assignment & Routing</h3>
                                <div className="space-y-4">
                                     <div className="flex items-center space-x-2">
                                        <Switch id="auto-assign" defaultChecked/><Label htmlFor="auto-assign">Enable Auto-Assignment</Label>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="assignment-strategy">Assignment Strategy</Label>
                                        <Select defaultValue="round_robin">
                                            <SelectTrigger id="assignment-strategy"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="round_robin">Round-robin</SelectItem>
                                                <SelectItem value="performance_based">Performance-based</SelectItem>
                                                <SelectItem value="load_balanced">Load-balanced</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="hot-lead-push" defaultChecked/>
                                        <Label htmlFor="hot-lead-push" className="flex items-center gap-2">Instantly push HOT leads to SDRs<InfoTooltip text="If enabled, HOT leads bypass standard queues and are assigned immediately."/></Label>
                                    </div>
                                </div>
                            </div>
                            <Separator/>
                            <div>
                                <h3 className="font-semibold mb-4 text-sm uppercase text-muted-foreground">SDR Behavior Guardrails</h3>
                                 <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="max-hot" className="flex items-center gap-2">Max HOT Leads / SDR<InfoTooltip text="Max number of HOT leads one SDR can own at a time."/></Label>
                                        <Input id="max-hot" type="number" defaultValue="15" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="max-open" className="flex items-center gap-2">Max Open Leads / SDR<InfoTooltip text="Max total leads (any stage) one SDR can own."/></Label>
                                        <Input id="max-open" type="number" defaultValue="100" />
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="sla-followup" className="flex items-center gap-2">Follow-up SLA (hours)<InfoTooltip text="Maximum time allowed before an SDR must follow up on an assigned lead."/></Label>
                                        <Input id="sla-followup" type="number" defaultValue="24" />
                                    </div>
                                </div>
                            </div>
                             <Separator/>
                              <div>
                                <h3 className="font-semibold mb-4 text-sm uppercase text-muted-foreground">Stage Governance</h3>
                                 <div className="space-y-4">
                                     <div className="flex items-center space-x-2">
                                        <Switch id="enforce-transitions" defaultChecked/><Label htmlFor="enforce-transitions" className="flex items-center gap-2">Lock Illegal Stage Jumps<InfoTooltip text="Prevents SDRs from skipping stages (e.g., 'New' to 'Closed')."/></Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="enforce-outcome" defaultChecked disabled/><Label htmlFor="enforce-outcome" className="flex items-center gap-2">Mandatory Outcome Tag for Closing<InfoTooltip text="SDRs must tag a lead as 'Won' or 'Lost' to move it to the 'Closed' stage."/></Label>
                                    </div>
                                    <div className="space-y-2 pt-2">
                                        <Label htmlFor="override-permission" className="flex items-center gap-2">Manual Override Permission<InfoTooltip text="Control if/how SDRs can manually change a lead's stage."/></Label>
                                        <Select defaultValue="limited">
                                            <SelectTrigger id="override-permission"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">Not Allowed</SelectItem>
                                                <SelectItem value="limited">Limited (e.g., 'Contacted' to 'Nurturing')</SelectItem>
                                                <SelectItem value="strict">Strict (Requires Manager Approval)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-5 w-5"/>AI Learning & Feedback</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex items-center space-x-2">
                                <Switch id="learn-outcome" defaultChecked/><Label htmlFor="learn-outcome" className="flex items-center gap-2">Learn from Outcome Tags<InfoTooltip text="AI analyzes conversations of 'Won' vs 'Lost' deals to improve scoring."/></Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="learn-notes" /><Label htmlFor="learn-notes" className="flex items-center gap-2">Learn from SDR Notes<InfoTooltip text="AI parses SDR notes for additional context and keywords."/></Label>
                            </div>
                            <div className="space-y-2 pt-2">
                                <Label htmlFor="min-deal-value" className="flex items-center gap-2">Minimum Deal Value for Learning<InfoTooltip text="AI will only learn from deals with a value greater than this amount."/></Label>
                                <Input id="min-deal-value" type="number" placeholder="e.g. 1000" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5"/>Risk & Quality Alerts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                           <div className="flex items-center justify-between"><Label htmlFor="alert-hot-idle">HOT lead not contacted</Label><Switch id="alert-hot-idle" defaultChecked /></div>
                           <div className="flex items-center justify-between"><Label htmlFor="alert-verification-drop">Verification rate drop</Label><Switch id="alert-verification-drop" /></div>
                           <div className="flex items-center justify-between"><Label htmlFor="alert-stage-abuse">SDR stage abuse detected</Label><Switch id="alert-stage-abuse" defaultChecked /></div>
                           <div className="flex items-center justify-between"><Label htmlFor="alert-invalid-high">High % of invalid leads</Label><Switch id="alert-invalid-high" defaultChecked /></div>
                        </CardContent>
                    </Card>
                </div>
            </div>
             <div className="flex justify-start">
                <Button variant="link" asChild>
                    <Link href="/dashboard/leados/settings">Go to System Settings <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
             </div>
        </div>
    );
}
