
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, MessagesSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ChooseAgentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelect = async (agentType: 'leados' | 'agentos') => {
    setLoading(agentType);

    // In a real app, you would save this to the user's profile in your database (e.g., Firestore or Supabase)
    // await updateUserProfile({ agent_type: agentType });
    console.log(`Agent selected: ${agentType}. In a real app, this would be saved to the database.`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Agent Selected!",
      description: `You have selected ${agentType === 'leados' ? 'LeadOS' : 'AgentOS'}. Redirecting to onboarding...`,
    });

    router.push(`/onboarding?product=${agentType}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Choose Your Agent</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Select which Flexoraa Intelligence OS agent you'd like to get started with.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
            <Card 
                className={cn(
                    "text-left transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-accent/20 hover:scale-105 hover:-translate-y-2 cursor-pointer",
                    loading === 'leados' && "ring-2 ring-accent"
                )}
                onClick={() => !loading && handleSelect('leados')}
            >
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-md bg-accent/10"><BarChart className="h-8 w-8 text-accent" /></div>
                        <CardTitle className="font-headline text-2xl">LeadOS</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                    The ultimate AI sales development representative. LeadOS verifies, engages, and scores leads via WhatsApp, booking appointments directly into your calendar.
                    </p>
                    {loading === 'leados' && (
                        <div className="flex items-center justify-center mt-4">
                            <Loader2 className="h-5 w-5 animate-spin text-accent" />
                        </div>
                    )}
                </CardContent>
            </Card>
            <Card 
                className={cn(
                    "text-left transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-accent/20 hover:scale-105 hover:-translate-y-2 cursor-pointer",
                    loading === 'agentos' && "ring-2 ring-accent"
                )}
                onClick={() => !loading && handleSelect('agentos')}
            >
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-md bg-accent/10"><MessagesSquare className="h-8 w-8 text-accent" /></div>
                        <CardTitle className="font-headline text-2xl">AgentOS</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                    Your multi-channel AI customer support agent. AgentOS connects to WhatsApp, Instagram, Facebook, and Gmail to provide instant, intelligent responses.
                    </p>
                     {loading === 'agentos' && (
                        <div className="flex items-center justify-center mt-4">
                            <Loader2 className="h-5 w-5 animate-spin text-accent" />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
