
'use client';
import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { BarChart2, Settings, LogOut, UserCircle, Zap, CheckCircle, List, Flame, Wand2, Upload, MessagesSquare, Calendar, PlusCircle, Shield, UserPlus, PhoneCall, Video, CheckSquare, Bell, Bot, BrainCircuit, Rocket, Scale, HelpCircle, Target, Menu, UserCog, Wallet, FileInput, ChevronDown, Inbox, Brain, Check, FileText as PrdIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CreditUsageDialog } from '@/components/dashboard/leados/CreditUsageDialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';

const adminNav = [
    { href: '/dashboard/admin', label: 'Admin', icon: Shield },
]

const mainNav = [
    { href: '/dashboard/leados', label: 'LeadOS', icon: BarChart2 },
    { href: '/dashboard/agentos', label: 'AgentOS', icon: MessagesSquare },
    { href: '/dashboard/legalos', label: 'LegalOS', icon: Scale },
    { href: '/dashboard/campaign-intelligence', label: 'Campaigns', icon: Target },
]

const sdrNav = [
    { href: '/dashboard/leados-sdr', label: 'LeadOS SDR', icon: UserCog },
    { href: '/dashboard/agentos-sdr', label: 'AgentOS SDR', icon: UserCog },
]

const leadNav = [
    { href: '/dashboard/upload-leads', label: 'Upload Leads', icon: Upload },
    { href: '/dashboard/uploaded-leads', label: 'Uploaded', icon: List },
    { href: '/dashboard/verified-leads', label: 'Verified', icon: CheckCircle },
    { href: '/dashboard/engaged-leads', label: 'Engaged', icon: Zap },
    { href: '/dashboard/qualified-leads', label: 'Qualified', icon: Flame },
]

const secondaryNav = [
    { href: '/dashboard/help', label: 'Help Center', icon: HelpCircle },
]

const NavLink = ({ href, children, isActive }: { href: string, children: React.ReactNode, isActive: boolean }) => (
    <Link href={href} className={cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "text-primary" : "text-muted-foreground")}>
        {children}
    </Link>
)

const MobileNav = () => (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Navigation</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left">
            <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                    <Logo />
                </div>
                <div className="flex-1 overflow-y-auto">
                    <nav className="grid items-start p-4 text-sm font-medium">
                        <p className="px-2 py-1 text-xs font-semibold text-muted-foreground">Admin</p>
                        {adminNav.map(item => <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"><item.icon className="h-4 w-4" />{item.label}</Link>)}
                        
                        <Separator className="my-4" />

                        <p className="px-2 py-1 text-xs font-semibold text-muted-foreground">Operations</p>
                        {mainNav.map(item => <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"><item.icon className="h-4 w-4" />{item.label}</Link>)}

                        <Separator className="my-4" />

                         <p className="px-2 py-1 text-xs font-semibold text-muted-foreground">SDR Dashboards</p>
                        {sdrNav.map(item => <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"><item.icon className="h-4 w-4" />{item.label}</Link>)}

                        <Separator className="my-4" />

                        <p className="px-2 py-1 text-xs font-semibold text-muted-foreground">Lead Funnel</p>
                        {leadNav.map(item => <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"><item.icon className="h-4 w-4" />{item.label}</Link>)}
                   
                        <Separator className="my-4" />

                        <p className="px-2 py-1 text-xs font-semibold text-muted-foreground">General</p>
                         {secondaryNav.map(item => <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"><item.icon className="h-4 w-4" />{item.label}</Link>)}
                    </nav>
                </div>
            </div>
        </SheetContent>
    </Sheet>
);

const OnboardingProgress = ({ role }: { role: 'Manager' | 'SDR' }) => {
    // SDRs have simpler setup, so we can consider them 100% complete sooner.
    // Managers have company-wide setup tasks remaining.
    const onboardingCompletion = role === 'Manager' ? 75 : 100;

    if (onboardingCompletion === 100) return null;

    const remainingSteps = [
        "Connect WhatsApp Business API",
        "Verify Message Templates",
        "Upload First Lead List"
    ].slice(Math.floor(onboardingCompletion / 33));

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="hidden lg:flex items-center gap-3 cursor-pointer group">
                    <div className="w-40">
                        <Progress value={onboardingCompletion} aria-label="Onboarding progress" />
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-primary">{onboardingCompletion}% Complete</span>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-4">
                    <h4 className="font-medium leading-none">Complete Your Setup</h4>
                    <p className="text-sm text-muted-foreground">Finish these steps to unlock the full power of Flexoraa.</p>
                    <ul className="space-y-3">
                        {remainingSteps.map((step, i) => (
                             <li key={i} className="flex items-center gap-2 text-sm">
                                <div className="h-5 w-5 rounded-full border-2 border-primary/50 flex-shrink-0" />
                                <span>{step}</span>
                            </li>
                        ))}
                    </ul>
                     <Button asChild className="w-full">
                        <Link href="/onboarding?product=leados">Finish Setup</Link>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

const ContextualHeader = () => {
    const pathname = usePathname();

    const isLeadOS = pathname.includes('/leados');
    const isAgentOS = pathname.includes('/agentos');
    const isSDR = pathname.includes('-sdr');

    const LeadOSManagerButtons = () => (
        <>
            <CreditUsageDialog>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Wallet className="mr-2 h-4 w-4" />
                    Credits
                </Button>
            </CreditUsageDialog>
            <Button variant="outline" asChild size="sm"  className="w-full sm:w-auto">
                <Link href="/dashboard/appointments">
                    <Calendar className="mr-2 h-4 w-4" />
                    Appointments
                </Link>
            </Button>
            <Button variant="outline" asChild size="sm" className="w-full sm:w-auto">
                <Link href="/dashboard/leados/ai-settings">
                    <Wand2 className="mr-2 h-4 w-4" />
                    AI &amp; Persona
                </Link>
            </Button>
            <Button className="gradient-background text-primary-foreground hover:opacity-90 w-full sm:w-auto" asChild size="sm">
                <Link href="/dashboard/upload-leads">
                    <FileInput className="mr-2 h-4 w-4" />
                    Upload Leads
                </Link>
            </Button>
        </>
    );
    
    const LeadOSSDRButtons = () => (
         <>
            <CreditUsageDialog>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Wallet className="mr-2 h-4 w-4" />
                    Credits
                </Button>
            </CreditUsageDialog>
            <Button variant="outline" asChild size="sm"  className="w-full sm:w-auto">
                <Link href="/dashboard/appointments">
                    <Calendar className="mr-2 h-4 w-4" />
                    Appointments
                </Link>
            </Button>
        </>
    )


    const AgentOSButtons = () => (
         <>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Wallet className="mr-2 h-4 w-4" />
                Credits
            </Button>
            <Button variant="outline" asChild size="sm" className="w-full sm:w-auto">
              <Link href="/dashboard/intelligence-hub">
                <Brain className="mr-2 h-4 w-4" />
                Intelligence Hub
              </Link>
            </Button>
             <Button variant="outline" asChild size="sm" className="w-full sm:w-auto">
                <Link href="/dashboard/ai-persona">
                    <Wand2 className="mr-2 h-4 w-4" />
                    AI &amp; Persona
                </Link>
            </Button>
             <Button asChild size="sm" className="w-full sm:w-auto">
                <Link href="/dashboard/agentos/inbox">
                    <Inbox className="mr-2 h-4 w-4" />
                    Unified Inbox
                </Link>
            </Button>
        </>
    )

    let currentProduct = "Dashboard";
    if (isLeadOS) currentProduct = "LeadOS";
    if (isAgentOS) currentProduct = "AgentOS";
    
    const role = isSDR ? "SDR" : "Manager";

    return (
        <div className="flex-1 flex items-center justify-end gap-2 flex-wrap min-w-0">
            <OnboardingProgress role={role} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        {currentProduct} {role}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Switch Product</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/leados">LeadOS Manager</Link>
                    </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                        <Link href="/dashboard/leados-sdr">LeadOS SDR</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/agentos">AgentOS Manager</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/agentos-sdr">AgentOS SDR</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {isLeadOS && (isSDR ? <LeadOSSDRButtons /> : <LeadOSManagerButtons />)}
            {isAgentOS && <AgentOSButtons />}

        </div>
    )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getSettingsPath = () => {
    const isSDR = pathname.includes('-sdr');
    if (isSDR) {
      return '/dashboard/profile';
    }
    if (pathname.includes('/leados')) return '/dashboard/leados/settings';
    if (pathname.includes('/agentos')) return '/dashboard/settings';
    return '/dashboard/profile'; // Default to profile for general dashboard pages
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-auto min-h-[4rem] items-center gap-3 border-b bg-background px-4 md:px-6 z-50 py-2 flex-wrap">
        <div className="flex items-center gap-4">
            <Logo />
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            {adminNav.map(item => <NavLink key={item.href} href={item.href} isActive={pathname.startsWith(item.href)}>{item.label}</NavLink>)}
            </nav>
        </div>
        
        <ContextualHeader />

        <div className="flex items-center gap-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                   <Avatar className="h-9 w-9">
                      <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                 </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="flex items-center w-full"><UserCircle className="mr-2 h-4 w-4" />Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={getSettingsPath()} className="flex items-center w-full"><Settings className="mr-2 h-4 w-4" />Settings</Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile#security" className="flex items-center w-full"><Shield className="mr-2 h-4 w-4" />Security</Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                  <Link href="/dashboard/help" className="flex items-center w-full"><HelpCircle className="mr-2 h-4 w-4" />Help Center</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href="/" className="flex items-center w-full"><LogOut className="mr-2 h-4 w-4" />Logout</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
             <MobileNav />
        </div>
      </header>
      <main className={cn("p-4 md:p-8 lg:p-10", "animated-background min-h-[calc(100vh-4rem)]")}>
          {children}
      </main>
    </div>
  );
}
