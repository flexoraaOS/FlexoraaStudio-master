
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { BookOpen, HelpCircle, LifeBuoy, Mail, MessageSquare, Palette, Save, Bell, Wifi, Settings, Users, Settings2, XCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const SettingsNavLink = ({ id, children, icon: Icon, activeSection, setActiveSection }: { id: string; children: React.ReactNode; icon: React.ElementType; activeSection: string | null; setActiveSection: (id: string) => void; }) => (
    <button 
      onClick={() => setActiveSection(id)}
      className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-secondary hover:text-primary",
        activeSection === id && "bg-secondary text-primary"
      )}
    >
        <Icon className="h-4 w-4" />
        {children}
    </button>
)

const ChannelIntegrationRow = ({ name, icon, isConnected: initialIsConnected, lastSync }: { name: string, icon: React.ReactNode, isConnected: boolean, lastSync: string }) => {
    const [isConnected, setIsConnected] = React.useState(initialIsConnected);

    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
            <div className="flex items-center gap-4">
                {icon}
                <div>
                    <span className="font-semibold">{name}</span>
                    <p className="text-xs text-muted-foreground">Last synced: {lastSync}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                 <Badge variant={isConnected ? "default" : "destructive"} className={cn(isConnected ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/10 text-red-400 border-red-500/20")}>
                    {isConnected ? <CheckCircle className="mr-1 h-3.5 w-3.5"/> : <XCircle className="mr-1 h-3.5 w-3.5"/>}
                    {isConnected ? "Connected" : "Disconnected"}
                </Badge>
                <Button variant="outline">
                    {isConnected ? "Manage" : "Connect"}
                </Button>
            </div>
        </div>
    )
}

export default function LeadOSSystemSettingsPage() {
    const { toast } = useToast();
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const handleSaveSettings = () => {
        toast({
            title: "LeadOS Settings Saved!",
            description: "Your system configurations have been updated.",
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <div>
                    <h1 className="text-3xl font-bold font-headline">LeadOS System Settings</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage operational hygiene, integrations, and visibility for the LeadOS platform.
                    </p>
                </div>
                 <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" /> Save All Changes
                </Button>
            </div>
            
            <div className="grid md:grid-cols-5 gap-12">
                <aside className="md:col-span-1">
                    <nav className="grid gap-2 text-sm sticky top-24">
                        <SettingsNavLink id="integrations" icon={Wifi} activeSection={activeSection} setActiveSection={setActiveSection}>Integrations</SettingsNavLink>
                        <SettingsNavLink id="notifications" icon={Bell} activeSection={activeSection} setActiveSection={setActiveSection}>Notifications</SettingsNavLink>
                        <SettingsNavLink id="lead_defaults" icon={Settings} activeSection={activeSection} setActiveSection={setActiveSection}>Lead Defaults</SettingsNavLink>
                        <SettingsNavLink id="sdr_access" icon={Users} activeSection={activeSection} setActiveSection={setActiveSection}>SDR Access</SettingsNavLink>
                        <SettingsNavLink id="appearance" icon={Palette} activeSection={activeSection} setActiveSection={setActiveSection}>Appearance</SettingsNavLink>
                        <SettingsNavLink id="help" icon={LifeBuoy} activeSection={activeSection} setActiveSection={setActiveSection}>Help</SettingsNavLink>
                    </nav>
                </aside>
                <main className="md:col-span-4 space-y-12">
                    {!activeSection && (
                        <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-96 border-2 border-dashed rounded-lg">
                            <Settings2 className="h-16 w-16 mb-4" />
                            <h3 className="text-lg font-semibold text-foreground">Select a category</h3>
                            <p>Choose a setting from the left to get started.</p>
                        </div>
                    )}
                    {activeSection === 'integrations' && (
                        <section id="integrations" className="scroll-mt-24">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Channel Integrations</CardTitle>
                                    <CardDescription>Enable lead ingestion and messaging reliability by connecting your WhatsApp channel.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <ChannelIntegrationRow name="WhatsApp" icon={<MessageSquare className="h-6 w-6 text-green-500"/>} isConnected={true} lastSync="2 minutes ago" />
                                </CardContent>
                            </Card>
                        </section>
                    )}
                     {activeSection === 'notifications' && (
                         <section id="notifications" className="scroll-mt-24">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Notification Settings</CardTitle>
                                    <CardDescription>Control which manager-level alerts you receive and how.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <h4 className="font-medium">Notification Types</h4>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><Label htmlFor="alert-hot-lead">New HOT lead detected</Label><Switch id="alert-hot-lead" defaultChecked /></div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><Label htmlFor="alert-escalation">SDR pushed lead to manager</Label><Switch id="alert-escalation" defaultChecked /></div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><Label htmlFor="alert-idle">Lead idle beyond SLA</Label><Switch id="alert-idle" /></div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><Label htmlFor="alert-booked">Meeting booked</Label><Switch id="alert-booked" defaultChecked /></div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><Label htmlFor="alert-failure">Verification failure</Label><Switch id="alert-failure" /></div>
                                    </div>
                                    <div className="space-y-6">
                                         <div>
                                            <h4 className="font-medium mb-3">Delivery Channels</h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><Label htmlFor="delivery-email">Email Notifications</Label><Switch id="delivery-email" defaultChecked /></div>
                                                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><Label htmlFor="delivery-in-app">In-App Notifications</Label><Switch id="delivery-in-app" defaultChecked disabled /></div>
                                            </div>
                                        </div>
                                        <Separator/>
                                         <div>
                                            <h4 className="font-medium mb-3">Advanced</h4>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="dnd-start">Do Not Disturb Start</Label>
                                                        <Input id="dnd-start" type="time" defaultValue="22:00" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="dnd-end">Do Not Disturb End</Label>
                                                        <Input id="dnd-end" type="time" defaultValue="09:00" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                         </section>
                     )}
                     {activeSection === 'lead_defaults' && (
                        <section id="lead_defaults" className="scroll-mt-24">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Lead Defaults &amp; Hygiene</CardTitle>
                                    <CardDescription>Maintain clean lead operations with default settings.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="default-campaign">Default Campaign for New Uploads</Label>
                                        <Input id="default-campaign" placeholder="e.g., 'Manual Upload Batch'" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="duplicate-handling">Duplicate Lead Handling</Label>
                                        <Select defaultValue="merge">
                                            <SelectTrigger id="duplicate-handling"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="block">Block</SelectItem>
                                                <SelectItem value="merge">Merge</SelectItem>
                                                <SelectItem value="allow">Allow</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="default-stage">Default Lead Stage on Upload</Label>
                                        <Input id="default-stage" defaultValue="New" disabled />
                                    </div>
                                    <div className="flex items-center space-x-2 pt-8">
                                        <Switch id="auto-archive" />
                                        <Label htmlFor="auto-archive">Auto-archive invalid leads</Label>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                     )}
                     {activeSection === 'sdr_access' && (
                        <section id="sdr_access" className="scroll-mt-24">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">SDR Visibility Controls</CardTitle>
                                    <CardDescription>Prevent SDR confusion and misuse by controlling what they can see.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary"><Label htmlFor="warm-access">Allow SDR access to Warm leads</Label><Switch id="warm-access" defaultChecked /></div>
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary"><Label htmlFor="cold-access">Allow SDR access to Cold leads</Label><Switch id="cold-access" /></div>
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary"><Label htmlFor="approval-required">Require manager approval for Cold/Warm access</Label><Switch id="approval-required" /></div>
                                </CardContent>
                            </Card>
                       </section>
                     )}
                     {activeSection === 'appearance' && (
                        <section id="appearance" className="scroll-mt-24">
                           <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Appearance</CardTitle>
                                    <CardDescription>Customize the look and feel of your LeadOS dashboard.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="theme-select">Theme</Label>
                                        <Select defaultValue="dark">
                                            <SelectTrigger id="theme-select"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Light</SelectItem>
                                                <SelectItem value="dark">Dark</SelectItem>
                                                <SelectItem value="system">System Default</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="density-select">Table Density</Label>
                                        <Select defaultValue="comfortable">
                                            <SelectTrigger id="density-select"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="comfortable">Comfortable</SelectItem>
                                                <SelectItem value="compact">Compact</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                       </section>
                     )}
                     {activeSection === 'help' && (
                        <section id="help" className="scroll-mt-24">
                             <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Help &amp; Support</CardTitle>
                                    <CardDescription>Resources to help you get the most out of LeadOS.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-4">
                                    <Button variant="outline" className="w-full justify-start" asChild><Link href="/dashboard/help"><BookOpen className="mr-2 h-4 w-4"/>Knowledge base / FAQs</Link></Button>
                                    <Button variant="outline" className="w-full justify-start" asChild><a href="mailto:support@flexoraa.com"><Mail className="mr-2 h-4 w-4"/>Contact Support</a></Button>
                                    <Button variant="outline" className="w-full justify-start" asChild><Link href="#"><HelpCircle className="mr-2 h-4 w-4"/>How LeadOS Works</Link></Button>
                                    <Button variant="outline" className="w-full justify-start" asChild><Link href="#"><LifeBuoy className="mr-2 h-4 w-4"/>System Status</Link></Button>
                                </CardContent>
                            </Card>
                        </section>
                     )}
                </main>
            </div>
        </div>
    );
}
