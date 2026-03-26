
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CompanyDetailsForm } from "@/components/dashboard/profile/CompanyDetailsForm";
import { PersonalInfoForm } from "@/components/dashboard/profile/PersonalInfoForm";
import { BuyCreditsDialog } from "@/components/dashboard/profile/BuyCreditsDialog";
import { UpgradePlanDialog } from "@/components/dashboard/profile/UpgradePlanDialog";
import { Save, User, Building, CreditCard, PieChart, BrainCircuit, ArrowRight, ShoppingCart, Shield, Monitor, Smartphone, Globe, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';


const ProfileNavLink = ({ id, children, icon: Icon, activeSection, setActiveSection }: { id: string; children: React.ReactNode; icon: React.ElementType; activeSection: string | null; setActiveSection: (id: string) => void; }) => (
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

const activeSessionsData: { device: string; browser: string; location: string; lastActive: string; isCurrent: boolean; }[] = [];

const loginActivityData: { timestamp: string; ip: string; device: string; location: string; }[] = [];

const SecuritySettings = () => {
    const { toast } = useToast();

    const handlePasswordReset = () => {
        toast({
            title: "Password Reset Email Sent",
            description: "Please check your inbox for instructions to reset your password.",
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl"><Shield className="h-5 w-5"/> Security</CardTitle>
                <CardDescription>Manage your password, active sessions, and account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Change Password */}
                <div>
                    <h3 className="font-semibold mb-4">Change Password</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                        </div>
                        <Button>Update Password</Button>
                    </div>
                </div>

                {/* Active Sessions */}
                <div>
                    <h3 className="font-semibold mb-4">Active Sessions</h3>
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Device</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Last Active</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activeSessionsData.map((session, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {session.device.includes('Mac') || session.device.includes('PC') ? <Monitor className="h-4 w-4 text-muted-foreground" /> : <Smartphone className="h-4 w-4 text-muted-foreground" />}
                                                <div>
                                                    <p className="font-medium">{session.device} <span className="text-muted-foreground">({session.browser})</span></p>
                                                    {session.isCurrent && <Badge variant="outline" className="text-green-400 border-green-400/50 bg-green-500/10">This device</Badge>}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{session.location}</TableCell>
                                        <TableCell>{session.lastActive}</TableCell>
                                        <TableCell className="text-right">
                                            {!session.isCurrent && <Button variant="ghost" size="sm">Logout</Button>}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         <CardFooter className="pt-4 justify-end">
                            <Button variant="outline">Logout All Other Sessions</Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Login Activity */}
                <div>
                    <h3 className="font-semibold mb-4">Login Activity</h3>
                     <Card>
                         <Table>
                            <TableHeader>
                                <TableRow><TableHead>Timestamp</TableHead><TableHead>Device</TableHead><TableHead>Location</TableHead><TableHead>IP Address</TableHead></TableRow>
                            </TableHeader>
                            <TableBody>
                                {loginActivityData.map((activity, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{activity.timestamp}</TableCell>
                                        <TableCell>{activity.device}</TableCell>
                                        <TableCell>{activity.location}</TableCell>
                                        <TableCell className="font-mono text-xs">{activity.ip}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>

                {/* Account Recovery & 2FA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold mb-4">Account Recovery</h3>
                        <p className="text-sm text-muted-foreground mb-4">Account recovery email is enabled.</p>
                        <Button variant="secondary" onClick={handlePasswordReset}>Send Password Reset Email</Button>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Two-Factor Authentication</h3>
                        <div className="flex items-center space-x-2">
                            <Switch id="two-factor" disabled />
                            <Label htmlFor="two-factor" className="text-muted-foreground">Enable 2FA (Coming Soon)</Label>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function ProfilePage() {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState<string | null>('personal-info');

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            setActiveSection(hash);
        } else {
            setActiveSection('personal-info');
        }
    }, []);

    const getSettingsPath = () => {
      if (pathname.includes('/leados')) return '/dashboard/leados/settings';
      if (pathname.includes('/agentos')) return '/dashboard/settings';
      return '/dashboard/settings'; // Default
    }

    return (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                 <h1 className="text-3xl font-bold font-headline">Account Settings</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your personal and company information, billing, and usage.
                </p>
            </div>
            <Button>
                <Save className="mr-2 h-4 w-4" /> Save All Changes
            </Button>
      </div>
      
       <div className="grid md:grid-cols-5 gap-12">
           <aside className="md:col-span-1">
                <nav className="grid gap-2 text-sm sticky top-24">
                    <ProfileNavLink id="personal-info" icon={User} activeSection={activeSection} setActiveSection={setActiveSection}>Profile</ProfileNavLink>
                    <ProfileNavLink id="security" icon={Shield} activeSection={activeSection} setActiveSection={setActiveSection}>Security</ProfileNavLink>
                    <ProfileNavLink id="company-details" icon={Building} activeSection={activeSection} setActiveSection={setActiveSection}>Company</ProfileNavLink>
                    <ProfileNavLink id="billing" icon={CreditCard} activeSection={activeSection} setActiveSection={setActiveSection}>Billing</ProfileNavLink>
                    <ProfileNavLink id="usage" icon={PieChart} activeSection={activeSection} setActiveSection={setActiveSection}>Usage</ProfileNavLink>
                    <ProfileNavLink id="ai-persona" icon={BrainCircuit} activeSection={activeSection} setActiveSection={setActiveSection}>AI Persona</ProfileNavLink>
                    <Link href={getSettingsPath()} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-secondary hover:text-primary">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </nav>
           </aside>
            <main className="md:col-span-4 space-y-12">
                {activeSection === 'personal-info' && (
                    <section id="personal-info" className="scroll-mt-24">
                        <PersonalInfoForm />
                    </section>
                )}
                {activeSection === 'security' && (
                    <section id="security" className="scroll-mt-24">
                        <SecuritySettings />
                    </section>
                )}
                {activeSection === 'company-details' && (
                    <section id="company-details" className="scroll-mt-24">
                        <CompanyDetailsForm />
                    </section>
                )}
                {activeSection === 'billing' && (
                    <section id="billing" className="scroll-mt-24">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl"><CreditCard className="h-5 w-5"/> Billing & Subscription</CardTitle>
                                <CardDescription>Manage your subscription and payment details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="p-4 rounded-lg bg-secondary/50">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-muted-foreground">Current Plan</p>
                                            <p className="text-foreground font-semibold text-xl">Pro</p>
                                        </div>
                                        <UpgradePlanDialog>
                                            <Button>Upgrade <ArrowRight className="ml-2 h-4 w-4"/></Button>
                                        </UpgradePlanDialog>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                )}
                {activeSection === 'usage' && (
                    <section id="usage" className="scroll-mt-24">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Usage Quotas</CardTitle>
                                <CardDescription>Your current usage for this billing cycle.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center text-sm mb-2">
                                        <span className="font-medium text-muted-foreground">LeadOS Verifications</span>
                                        <BuyCreditsDialog>
                                            <Button variant="secondary" size="sm"><ShoppingCart className="mr-2 h-4 w-4"/>Add Credits</Button>
                                        </BuyCreditsDialog>
                                    </div>
                                    <Progress value={(1250 / 2000) * 100} />
                                    <p className="text-right text-xs text-muted-foreground mt-1">1,250 / 2,000 used</p>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center text-sm mb-2">
                                        <span className="font-medium text-muted-foreground">AgentOS Conversations</span>
                                        <BuyCreditsDialog>
                                            <Button variant="secondary" size="sm"><ShoppingCart className="mr-2 h-4 w-4"/>Add Credits</Button>
                                        </BuyCreditsDialog>
                                    </div>
                                    <Progress value={(850 / 5000) * 100} />
                                    <p className="text-right text-xs text-muted-foreground mt-1">850 / 5,000 used</p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                )}
                {activeSection === 'ai-persona' && (
                    <section id="ai-persona" className="scroll-mt-24">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl"><BrainCircuit className="h-5 w-5"/> AI Persona</CardTitle>
                                <CardDescription>A summary of your active AI agent's configuration.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Agent Name</span>
                                    <span className="font-semibold">Sales Assistant</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Persona</span>
                                    <Badge variant="secondary">Sales</Badge>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button asChild variant="secondary" className="w-full">
                                    <Link href="/dashboard/ai-persona">Edit AI Persona <ArrowRight className="ml-2 h-4 w-4"/></Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </section>
                )}
            </main>
       </div>
    </div>
    );
}
