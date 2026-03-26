
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Logo } from '@/components/ui/logo';
import { Check, Loader2, ArrowRight, MessageSquare, Instagram, Facebook, FileCheck2, Send, Youtube, Download, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type ProductType = 'leados' | 'agentos';

type StepStatus = 'pending' | 'in_progress' | 'completed' | 'active';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const leadOSStepsData: Step[] = [
  { id: 'whatsapp', title: 'Connect WhatsApp Business API', description: 'Link your WABA to enable automated messaging.', icon: <MessageSquare className="h-6 w-6" /> },
  { id: 'verify', title: 'Verify Number & Templates', description: 'Confirm your phone number and message templates with Meta.', icon: <FileCheck2 className="h-6 w-6" /> },
  { id: 'test', title: 'Send Test Lead', description: 'Run a test to ensure the automation is working correctly.', icon: <ArrowRight className="h-6 w-6" /> },
];

const agentOSStepsData: Step[] = [
  { id: 'instagram', title: 'Connect Instagram Account', description: 'Link your Instagram business profile via OAuth.', icon: <Instagram className="h-6 w-6" /> },
  { id: 'facebook', title: 'Connect Facebook Page', description: 'Authorize access to your Facebook page messages.', icon: <Facebook className="h-6 w-6" /> },
  { id: 'whatsapp', title: 'Connect WhatsApp Business API', description: 'Link your WABA to the omnichannel inbox.', icon: <MessageSquare className="h-6 w-6" /> },
  { id: 'test', title: 'Run Test Reply', description: 'Send a test message to check the integration.', icon: <ArrowRight className="h-6 w-6" /> },
];

const WhatsAppConnectDialog = ({ onConnected, children }: { onConnected: () => void, children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false);
    const { toast } = useToast();

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Connection Successful!",
            description: "Your WhatsApp Business API details have been saved.",
        });
        onConnected();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Connect WhatsApp Business API</DialogTitle>
                    <DialogDescription>
                        Enter your WABA credentials below. You can find these in your Meta Business Suite.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSave}>
                    <div className="space-y-4 py-4">
                        <Button type="button" className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white gap-2">
                            <Facebook className="h-5 w-5"/>
                            Connect with Meta (Recommended)
                        </Button>
                         <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                Or connect manually
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bm-id">Business Manager ID</Label>
                            <Input id="bm-id" placeholder="e.g., 123456789012345" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="waba-id">WhatsApp Business Account (WABA) ID</Label>
                            <Input id="waba-id" placeholder="e.g., 123456789012345" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone-id">Phone Number ID</Label>
                            <Input id="phone-id" placeholder="e.g., 123456789012345" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="token">Permanent Access Token</Label>
                            <Input id="token" type="password" placeholder="Enter your permanent access token" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit">Save Connection</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const VerificationDialog = ({ onVerified, children }: { onVerified: () => void, children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false);
    const [isVerifying, setIsVerifying] = React.useState(false);
    const [verificationComplete, setVerificationComplete] = React.useState(false);
    const { toast } = useToast();

    const templates = [
        { name: 'onboarding_welcome', category: 'UTILITY', status: 'APPROVED' },
        { name: 'follow_up_1', category: 'MARKETING', status: 'APPROVED' },
        { name: 'quote_ready', category: 'UTILITY', status: 'APPROVED' },
    ];

    const handleVerify = () => {
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            setVerificationComplete(true);
            toast({
                title: "Verification Successful!",
                description: "Phone number and templates have been verified.",
            });
        }, 2000);
    };

    const handleComplete = () => {
        onVerified();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Verify Number & Templates</DialogTitle>
                    <DialogDescription>
                        We'll check your number's status with Meta and fetch your approved message templates.
                    </DialogDescription>
                </DialogHeader>
                {!verificationComplete ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <FileCheck2 className="h-16 w-16 text-primary mb-4" />
                        <p className="text-muted-foreground mb-6">Ready to start the verification process?</p>
                        <Button onClick={handleVerify} disabled={isVerifying}>
                            {isVerifying ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</>
                            ) : "Start Verification"}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4 py-4">
                        <div className="p-4 bg-green-500/10 rounded-lg text-green-700 dark:text-green-300 flex items-center gap-3">
                            <Check className="h-5 w-5" />
                            <p className="font-medium text-sm">Phone number successfully verified with Meta.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Approved Message Templates</h4>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Template Name</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {templates.map(template => (
                                        <TableRow key={template.name}>
                                            <TableCell className="font-mono text-xs">{template.name}</TableCell>
                                            <TableCell><Badge variant="outline">{template.category}</Badge></TableCell>
                                            <TableCell><Badge className="bg-green-500/20 text-green-400 border-green-500/30">{template.status}</Badge></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <DialogFooter className="pt-4">
                            <Button onClick={handleComplete}>Confirm & Complete Step</Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

const TestLeadDialog = ({ onSent, children }: { onSent: () => void, children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false);
    const [isSending, setIsSending] = React.useState(false);
    const { toast } = useToast();

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        setTimeout(() => {
            setIsSending(false);
            toast({
                title: "Test Message Sent!",
                description: "Test lead delivered successfully.",
            });
            onSent();
            setOpen(false);
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Send Test Lead</DialogTitle>
                    <DialogDescription>
                        Enter a phone number (with country code) to send a test message to.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSend}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone-number">Test Phone Number</Label>
                            <Input id="phone-number" placeholder="e.g., +15551234567" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isSending}>
                            {isSending ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                            ) : (
                                <><Send className="mr-2 h-4 w-4"/> Send Test</>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

const InstagramConnectDialog = ({ onConnected, children }: { onConnected: () => void, children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isConnected, setIsConnected] = React.useState(false);
    const { toast } = useToast();

    const handleConnect = () => {
        setIsLoading(true);
        // Simulate OAuth flow and API call
        setTimeout(() => {
            setIsLoading(false);
            setIsConnected(true);
            toast({
                title: "Instagram Account Connected!",
                description: "Successfully linked @YourFlexoraaStore.",
            });
        }, 2000);
    };

    const handleComplete = () => {
        onConnected();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Connect Instagram Account</DialogTitle>
                    <DialogDescription>
                        You'll be redirected to Meta to authorize Flexoraa to manage your Instagram messages and comments.
                    </DialogDescription>
                </DialogHeader>
                {!isConnected ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="p-4 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 mb-4">
                            <Instagram className="h-10 w-10 text-white" />
                        </div>
                        <p className="text-muted-foreground mb-6">
                            This will open a new window for you to log in and approve the necessary permissions.
                        </p>
                        <Button onClick={handleConnect} disabled={isLoading} className="w-full">
                            {isLoading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...</>
                            ) : "Connect with Instagram"}
                        </Button>
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold">Connection Successful!</h3>
                        <p className="text-muted-foreground">You've successfully connected the account <span className="font-medium text-foreground">@YourFlexoraaStore</span>.</p>
                        <DialogFooter className="mt-6">
                            <Button onClick={handleComplete} className="w-full">
                                Continue
                            </Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};


const StepAction = ({ step, onComplete }: { step: Step; onComplete: () => void; }) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleAction = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onComplete();
        }, 2000)
    };
    
    const buttonText = step.id === 'whatsapp' ? 'Connect' : step.id === 'verify' ? 'Verify' : 'Start';

    switch (step.id) {
        case 'whatsapp':
            return <WhatsAppConnectDialog onConnected={onComplete}><Button className="w-full">{buttonText}</Button></WhatsAppConnectDialog>;
        case 'verify':
            return <VerificationDialog onVerified={onComplete}><Button className="w-full">{buttonText}</Button></VerificationDialog>;
        case 'test':
            return <TestLeadDialog onSent={onComplete}><Button className="w-full">{buttonText}</Button></TestLeadDialog>;
        case 'instagram':
            return <InstagramConnectDialog onConnected={onComplete}><Button className="w-full">Connect</Button></InstagramConnectDialog>;
        default:
            return <Button className="w-full" onClick={handleAction} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null} {buttonText}
            </Button>
    }
}


export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const product = (searchParams.get('product') as ProductType) || 'leados';
  
  const initialStepsData = product === 'leados' ? leadOSStepsData : agentOSStepsData;
  const [steps, setSteps] = useState(initialStepsData);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleCompleteStep = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
        setCompletedSteps(prev => [...prev, stepId]);
    }
  };

  const handleContinue = () => {
    if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
    } else {
        router.push(product === 'leados' ? '/dashboard/leados' : '/dashboard/agentos');
    }
  }

  const progressValue = (currentStepIndex / (steps.length -1) ) * 100;
  
  useEffect(() => {
    const newSteps = product === 'leados' ? leadOSStepsData : agentOSStepsData;
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setCompletedSteps([]);
  }, [product]);

  const getStepStatus = (stepId: string, index: number): StepStatus => {
      if(completedSteps.includes(stepId)) return 'completed';
      if(index === currentStepIndex) return 'active';
      return 'pending';
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
        <header className="text-center mb-10">
            <div className="flex justify-center mb-4">
                <Logo />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-3">
                Welcome to <span className="gradient-text">{product === 'leados' ? 'LeadOS' : 'AgentOS'}</span> 🚀
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                {product === 'leados' 
                    ? "Let’s connect your WhatsApp Business account to start qualifying leads with AI."
                    : "Let’s connect your social media channels so the AI can start engaging leads."
                }
            </p>
        </header>

        <div className="mb-10 px-4">
            <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
                <span>Step {Math.min(currentStepIndex + 1, steps.length)} of {steps.length}</span>
                <span>{Math.round(progressValue)}% Complete</span>
            </div>
            <Progress value={progressValue} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 lg:col-span-7">
                <div className="space-y-6">
                    {steps.map((step, index) => {
                        const status = getStepStatus(step.id, index);
                        const isCompleted = status === 'completed';
                        const isActive = status === 'active';

                        return (
                             <div key={step.id} className={cn(
                                "flex items-start gap-4 p-6 rounded-xl transition-all duration-300",
                                isActive ? 'bg-card shadow-2xl shadow-primary/10 border border-primary/20' : 'bg-card/50 border',
                                isCompleted && 'opacity-60'
                             )}>
                                <div className={cn(
                                    "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                                    isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground',
                                    isCompleted && 'bg-green-500/20 text-green-500'
                                )}>
                                    {isCompleted ? <Check/> : step.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{step.title}</h3>
                                    <p className="text-muted-foreground text-sm mt-1">{step.description}</p>
                                    {isActive && (
                                        <div className="mt-4">
                                            <StepAction step={step} onComplete={() => handleCompleteStep(step.id)} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <aside className="md:col-span-4 lg:col-span-5 sticky top-24 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><HelpCircle className="h-5 w-5 text-primary"/>Need Help?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <p className="text-sm text-muted-foreground">
                            If you're having trouble, watch our video guide or download the step-by-step instructions.
                        </p>
                        <Button variant="outline" className="w-full justify-start" asChild>
                           <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                               <Youtube className="mr-2 h-4 w-4 text-red-500"/> Watch Video Guide
                           </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                           <a href="/setup-guide.pdf" download>
                               <Download className="mr-2 h-4 w-4"/> Download PDF Guide
                           </a>
                        </Button>
                    </CardContent>
                </Card>
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" asChild>
                        <Link href="/dashboard">Skip for now</Link>
                    </Button>
                    <Button 
                        onClick={handleContinue} 
                        disabled={!completedSteps.includes(steps[currentStepIndex].id)}
                    >
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </aside>
        </div>
    </div>
  );
}
