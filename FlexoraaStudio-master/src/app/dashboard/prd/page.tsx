
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Shield, Bot, Users } from "lucide-react";

export default function PrdPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary"/>
                    Product Requirements Document
                </h1>
                <p className="text-muted-foreground mt-1">
                    An overview of the core components and logic for Flexoraa OS.
                </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-1">
                <AccordionItem value="item-1" className="border-b-0">
                     <Card>
                        <AccordionTrigger className="p-6 text-xl font-semibold hover:no-underline">
                            <div className="flex items-center gap-3">
                                <Bot className="h-6 w-6 text-primary"/>
                                <span>LeadOS: AI & Persona Engine</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg">Lead Qualification Logic</h3>
                                    <p className="text-muted-foreground text-sm">Controls how the AI filters, qualifies, and scores incoming leads.</p>
                                    <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                                        <li><strong>Qualification Strictness</strong>: Options for Conservative, Balanced, Aggressive to control lead quality vs. volume.</li>
                                        <li><strong>Minimum Verification Threshold</strong>: A score (0-100) to mark leads as invalid.</li>
                                        <li><strong>Auto-Disqualification Rules</strong>: Toggles for invalid numbers, no WhatsApp, and negative intent.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Lead Scoring Model</h3>
                                    <p className="text-muted-foreground text-sm">Defines how leads are prioritized.</p>
                                     <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                                        <li><strong>Score Weight Sliders</strong>: Adjust weights for Responsiveness, Sentiment, Intent Keywords, and Channel Priority.</li>
                                        <li><strong>Score Decay Rule</strong>: Toggle to decrease lead scores over time due to inactivity.</li>
                                    </ul>
                                </div>
                                 <div>
                                    <h3 className="font-semibold text-lg">Lead Engagement Persona</h3>
                                    <p className="text-muted-foreground text-sm">Defines the AI's communication style.</p>
                                     <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                                        <li><strong>Personas</strong>: Polite Verifier, Curious Qualifier, Authority Checker, Fast Screener, and various sales methodologies.</li>
                                        <li><strong>Tone Controls</strong>: Sliders for Neutral/Friendly, Soft/Direct, and Short/Detailed.</li>
                                    </ul>
                                </div>
                            </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>

                 <AccordionItem value="item-2" className="border-b-0">
                     <Card>
                        <AccordionTrigger className="p-6 text-xl font-semibold hover:no-underline">
                            <div className="flex items-center gap-3">
                                <Users className="h-6 w-6 text-primary"/>
                                <span>LeadOS: SDR & Funnel Governance</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                             <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg">SDR Assignment & Routing Rules</h3>
                                    <p className="text-muted-foreground text-sm">Controls how leads are distributed to the sales team.</p>
                                    <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                                        <li><strong>Auto-Assignment</strong>: Toggle to enable/disable automatic routing.</li>
                                        <li><strong>Assignment Strategy</strong>: Options for Round-robin, Performance-based, and Load-balanced.</li>
                                        <li><strong>HOT Lead Auto-Push</strong>: Instantly assign high-priority leads.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Stage Governance</h3>
                                    <p className="text-muted-foreground text-sm">Enforces the integrity of the sales funnel.</p>
                                     <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                                        <li><strong>Lock Illegal Stage Jumps</strong>: Prevent SDRs from skipping stages (e.g., 'New' directly to 'Closed').</li>
                                        <li><strong>Mandatory Outcome Tag</strong>: Require 'Won' or 'Lost' tag to move a lead to 'Closed'.</li>
                                    </ul>
                                </div>
                                 <div>
                                    <h3 className="font-semibold text-lg">SDR Behavior Guardrails</h3>
                                    <p className="text-muted-foreground text-sm">Prevents SDR overload and ensures timely follow-ups.</p>
                                     <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                                        <li><strong>Max HOT Leads per SDR</strong>: Limit on active high-priority leads.</li>
                                        <li><strong>Max Open Leads per SDR</strong>: Overall capacity limit.</li>
                                        <li><strong>Follow-up SLA</strong>: Time limit (in hours) for SDRs to act on a lead.</li>
                                    </ul>
                                </div>
                            </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>

                 <AccordionItem value="item-3" className="border-b-0">
                    <Card>
                        <AccordionTrigger className="p-6 text-xl font-semibold hover:no-underline">
                             <div className="flex items-center gap-3">
                                <Shield className="h-6 w-6 text-primary"/>
                                <span>AgentOS: AI & Persona Engine</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                             <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg">AI Operating Mode</h3>
                                    <p className="text-muted-foreground text-sm">Sets the global autonomy level for the AgentOS conversational AI.</p>
                                    <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                                        <li><strong>Autonomy Modes</strong>: Assist Only, Semi-Autonomous, Fully Autonomous.</li>
                                        <li><strong>Aggressiveness Levels</strong>: Conservative, Balanced, Aggressive.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">AI Knowledge Base</h3>
                                    <p className="text-muted-foreground text-sm">Provides the AI with company-specific information for accurate responses.</p>
                                     <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                                        <li><strong>Document Upload</strong>: Supports PDF, DOCX, and TXT for knowledge ingestion.</li>
                                        <li><strong>Text Paste</strong>: Allows for pasting FAQs and other snippets directly.</li>
                                    </ul>
                                </div>
                                 <div>
                                    <h3 className="font-semibold text-lg">Sales Persona & Brand Voice</h3>
                                    <p className="text-muted-foreground text-sm">Defines the AI's communication style to reflect the brand.</p>
                                     <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                                        <li><strong>Sales Personas</strong>: Consultative Expert, Fast Closer, Relationship Builder, etc.</li>
                                        <li><strong>Tone Controls</strong>: Sliders for Formality, Verbosity, Empathy, and Authority.</li>
                                    </ul>
                                </div>
                            </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
                 <AccordionItem value="item-4" className="border-b-0">
                    <Card>
                        <AccordionTrigger className="p-6 text-xl font-semibold hover:no-underline">
                             <div className="flex items-center gap-3">
                                <FileText className="h-6 w-6 text-primary"/>
                                <span>Versioning & Auditing</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                             <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg">AI Configuration Versioning</h3>
                                    <p className="text-muted-foreground text-sm">Tracks all changes to AI settings for traceability and rollback.</p>
                                    <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                                        <li><strong>Audit Trail</strong>: Every change creates a new version, logging the user, timestamp, and a summary of changes.</li>
                                        <li><strong>Rollback Capability</strong>: Allows managers to revert to a previous, stable configuration if needed.</li>
                                        <li><strong>Date-based Filtering</strong>: A horizontal timeline with a date range picker to inspect changes over time.</li>
                                    </ul>
                                </div>
                            </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
