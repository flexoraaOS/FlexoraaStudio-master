
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { MessageCircle, Mail, Instagram, Facebook, Bot, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

const channels = [
  { id: 'whatsapp', name: 'WhatsApp', icon: <MessageCircle className="h-6 w-6 text-green-500" /> },
  { id: 'instagram', name: 'Instagram', icon: <Instagram className="h-6 w-6 text-pink-500" /> },
  { id: 'facebook', name: 'Facebook', icon: <Facebook className="h-6 w-6 text-blue-600" /> },
  { id: 'gmail', name: 'Gmail', icon: <Mail className="h-6 w-6 text-red-500" /> },
];

export default function CreateAgentPage() {
  const [agentName, setAgentName] = useState('');
  const [agentDescription, setAgentDescription] = useState('');
  const [agentPersona, setAgentPersona] = useState('');
  const [activeChannels, setActiveChannels] = useState<string[]>([]);
  const { toast } = useToast();

  const handleChannelToggle = (channelId: string) => {
    setActiveChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleCreateAgent = () => {
    if (!agentName || !agentPersona) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide an agent name and select a persona.",
      });
      return;
    }
    
    toast({
      title: "Agent Created Successfully!",
      description: `The agent "${agentName}" has been created.`,
    });
    // Here you would typically call an API to save the agent configuration
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Create New AI Agent</h1>
        <p className="text-muted-foreground mt-1">
          Configure a new AI agent by defining its persona and assigning it to communication channels.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Agent Details</CardTitle>
                    <CardDescription>Give your agent a name and a persona that defines its behavior.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="agent-name">Agent Name</Label>
                        <Input 
                            id="agent-name" 
                            placeholder="e.g., 'Support Bot Alpha' or 'Sales Assistant'"
                            value={agentName}
                            onChange={(e) => setAgentName(e.target.value)}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="agent-description">Agent Description (Optional)</Label>
                        <Textarea 
                            id="agent-description" 
                            placeholder="Briefly describe what this agent will be responsible for."
                            value={agentDescription}
                            onChange={(e) => setAgentDescription(e.target.value)}
                            rows={3}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="agent-persona">Agent Persona</Label>
                         <Select onValueChange={setAgentPersona} value={agentPersona}>
                            <SelectTrigger id="agent-persona">
                                <SelectValue placeholder="Select a persona" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="support">Support Agent</SelectItem>
                                <SelectItem value="sales">Sales Assistant</SelectItem>
                                <SelectItem value="general">General Inquiries</SelectItem>
                                <SelectItem value="custom">Custom (Advanced)</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">The persona determines the AI's tone and primary functions.</p>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Channel Assignment</CardTitle>
                    <CardDescription>Select which channels this agent will be active on.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {channels.map((channel) => (
                        <div 
                            key={channel.id}
                            className={cn(
                                "flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer",
                                activeChannels.includes(channel.id) ? 'border-primary bg-primary/10 shadow-inner' : 'hover:bg-secondary/50'
                            )}
                            onClick={() => handleChannelToggle(channel.id)}
                        >
                            <div className="flex items-center gap-3">
                                {channel.icon}
                                <span className="font-medium">{channel.name}</span>
                            </div>
                            <Switch 
                                checked={activeChannels.includes(channel.id)}
                                onCheckedChange={() => handleChannelToggle(channel.id)}
                                aria-label={`Activate ${channel.name}`}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 sticky top-24">
             <Card>
                <CardHeader>
                    <CardTitle>Summary</CardTitle>
                    <CardDescription>Review your new agent's configuration.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-secondary rounded-lg"><Bot className="h-6 w-6 text-primary"/></div>
                        <div>
                            <p className="font-semibold">{agentName || "Your New Agent"}</p>
                            <p className="text-sm text-muted-foreground">{agentPersona ? `Persona: ${agentPersona.charAt(0).toUpperCase() + agentPersona.slice(1)}` : 'No persona selected'}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium text-sm mb-2">Active Channels:</h4>
                        {activeChannels.length > 0 ? (
                             <ul className="space-y-2">
                                {activeChannels.map(id => {
                                    const channel = channels.find(c => c.id === id);
                                    return (
                                        <li key={id} className="flex items-center gap-2 text-sm text-muted-foreground">
                                           {React.cloneElement(channel!.icon, { className: "h-4 w-4" })}
                                           {channel!.name}
                                        </li>
                                    )
                                })}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground">No channels selected.</p>
                        )}
                    </div>
                     <Button className="w-full gradient-background text-primary-foreground hover:opacity-90" onClick={handleCreateAgent}>
                        <Save className="mr-2 h-4 w-4"/>
                        Create Agent
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
