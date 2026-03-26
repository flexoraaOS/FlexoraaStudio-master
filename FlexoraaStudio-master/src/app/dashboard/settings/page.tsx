
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, HelpCircle, Instagram, Facebook, MessageSquare, Mail, CheckCircle, XCircle, Settings2, Bell, Palette, LifeBuoy, Wifi, Save } from "lucide-react";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

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

export default function SettingsPage() {
    const { toast } = useToast();
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const handleSaveSettings = () => {
        toast({
            title: "AgentOS Settings Saved!",
            description: "Your system configurations have been updated.",
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline">AgentOS System Settings</h1>
                    <p className="text-muted-foreground mt-1">
                    Manage system connectivity and personal preferences for AgentOS.
                    </p>
                </div>
                <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4"/>
                    Save Changes
                </Button>
            </div>

            <div className="grid md:grid-cols-5 gap-12">
                <aside className="md:col-span-1">
                    <nav className="grid gap-2 text-sm sticky top-24">
                        <SettingsNavLink id="integrations" icon={Wifi} activeSection={activeSection} setActiveSection={setActiveSection}>Integrations</SettingsNavLink>
                        <SettingsNavLink id="notifications" icon={Bell} activeSection={activeSection} setActiveSection={setActiveSection}>Notifications</SettingsNavLink>
                        <SettingsNavLink id="appearance" icon={Palette} activeSection={activeSection} setActiveSection={setActiveSection}>Appearance</SettingsNavLink>
                        <SettingsNavLink id="help" icon={LifeBuoy} activeSection={activeSection} setActiveSection={setActiveSection}>Help & Support</SettingsNavLink>
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
                                    <CardDescription>Connect and manage your external communication channels for AgentOS.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <ChannelIntegrationRow name="WhatsApp" icon={<MessageSquare className="h-6 w-6 text-green-500"/>} isConnected={false} lastSync="Never" />
                                    <ChannelIntegrationRow name="Instagram" icon={<Instagram className="h-6 w-6 text-pink-500"/>} isConnected={false} lastSync="Never" />
                                    <ChannelIntegrationRow name="Facebook" icon={<Facebook className="h-6 w-6 text-blue-600"/>} isConnected={false} lastSync="Never" />
                                    <ChannelIntegrationRow name="Gmail" icon={<Mail className="h-6 w-6 text-red-500"/>} isConnected={false} lastSync="Never" />
                                </CardContent>
                            </Card>
                        </section>
                    )}
                    {activeSection === 'notifications' && (
                        <section id="notifications" className="scroll-mt-24">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Notification Settings</CardTitle>
                                    <CardDescription>Control what alerts you receive and how you get them.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <h4 className="font-medium">Notification Types</h4>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><Label htmlFor="alert-hot-lead">New HOT lead assigned</Label><Switch id="alert-hot-lead" defaultChecked /></div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><Label htmlFor="alert-escalation">Lead escalated to you</Label><Switch id="alert-escalation" defaultChecked /></div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><Label htmlFor="alert-follow-up">Follow-up reminder</Label><Switch id="alert-follow-up" /></div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><Label htmlFor="alert-booked">Meeting booked by AI</Label><Switch id="alert-booked" defaultChecked /></div>
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
                    {activeSection === 'appearance' && (
                        <section id="appearance" className="scroll-mt-24">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Appearance</CardTitle>
                                    <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Theme</Label>
                                        <Select defaultValue="dark">
                                            <SelectTrigger className="w-[280px]"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Light</SelectItem>
                                                <SelectItem value="dark">Dark</SelectItem>
                                                <SelectItem value="system">System Default</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary"><Label htmlFor="compact-mode">Compact mode (dense UI)</Label><Switch id="compact-mode" /></div>
                                </CardContent>
                            </Card>
                        </section>
                    )}
                    {activeSection === 'help' && (
                        <section id="help" className="scroll-mt-24">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Help & Support</CardTitle>
                                    <CardDescription>Resources to help you get the most out of AgentOS.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <Link href="/dashboard/help"><BookOpen className="mr-2 h-4 w-4"/>Knowledge base / FAQs</Link>
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <a href="mailto:support@flexoraaa.com"><Mail className="mr-2 h-4 w-4"/>Contact Support</a>
                                    </Button>
                                </CardContent>
                            </Card>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}
