
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { BarChart as RechartsBarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell, PieChart, Pie, Sector, LabelList, Legend, FunnelChart, Funnel, LineChart, Line } from "recharts";
import { MoreHorizontal, MessageSquare, Bot, CalendarCheck, Wifi, Power, Instagram, Facebook, Mail, Search, Users, TrendingUp, CheckCircle, Clock, ArrowUpDown, Calendar as CalendarIcon, Radar, Hand, ThumbsUp, MousePointerClick, RefreshCw, Send, Loader2, Target, Filter, FileText, Wand2, Star, Check, Flame, Trophy, TrendingDown, User, GitCompareArrows, Heart, MessageSquareReply, AtSign, ThumbsDown, GitCommitVertical, Image as ImageIcon, MessageCircleQuestion, Lightbulb, UserX, BrainCircuit, PieChart as PieChartIcon, Upload, Sparkles, Folder, Wallet, DollarSign } from "lucide-react";
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, subDays, startOfDay, addDays, isToday } from 'date-fns';
import { getConversationSummary } from '../leados/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { AiChatAnalysis } from '@/components/dashboard/AiChatAnalysis';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlatformActivityHeatmap } from '@/components/dashboard/agentos-sdr/PlatformActivityHeatmap';

const kpiData = {
    newConversations: 0,
    bookings: 0,
    engagements: 0,
};

const channelVolumeData: any[] = [];

// Explicit Conversation type for the Unified Inbox
type ConversationTag = { text: string; type: 'success' | 'warning' | 'info' | string };
type ConversationMessage = { type: 'user' | 'ai' | 'sdr'; content: string };
type ConversationOutcome = { status: string; revenue: number; date: string };

type Conversation = {
  id: string;
  customer: string;
  avatar: string;
  channel: string;
  fromEmail: string;
  subject: string;
  lastMessage: string;
  timestamp: string;
  status: string;
  engagementScore: number;
  tags: ConversationTag[];
  thread: ConversationMessage[];
  outcome?: ConversationOutcome;
};

// Fallbacks for zero states without breaking the component tree
const initialConversations: Conversation[] = [];

const getTagStyles = (type: string) => {
    switch (type) {
        case 'success': return 'bg-green-500/10 text-green-400 border-green-500/20';
        case 'warning': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        case 'info': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        default: return 'bg-secondary text-secondary-foreground';
    }
}

const channelIcons: { [key: string]: JSX.Element } = {
    WhatsApp: <MessageSquare className="h-5 w-5 text-green-500" />,
    Instagram: <Instagram className="h-5 w-5 text-pink-500" />,
    Facebook: <Facebook className="h-5 w-5 text-blue-600" />,
    Gmail: <Mail className="h-5 w-5 text-red-500" />,
};

const LogOutcomeDialog = ({ open, onOpenChange, onSave }: { open: boolean, onOpenChange: (open: boolean) => void, onSave: (outcome: { revenue: number; date: string }) => void }) => {
    const [revenue, setRevenue] = useState('');
    const [date, setDate] = useState<Date | undefined>(new Date());
    const { toast } = useToast();

    const handleSave = () => {
        const revenueAmount = parseFloat(revenue);
        if (isNaN(revenueAmount) || revenueAmount <= 0) {
            toast({ variant: 'destructive', title: 'Invalid Revenue', description: 'Please enter a valid positive number for revenue.' });
            return;
        }
        if (!date) {
            toast({ variant: 'destructive', title: 'Invalid Date', description: 'Please select a closing date.' });
            return;
        }
        onSave({ revenue: revenueAmount, date: format(date, 'yyyy-MM-dd') });
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Log Deal Outcome</DialogTitle>
                    <DialogDescription>Record the details for this closed-won deal.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="revenue">Revenue Amount</Label>
                        <Input id="revenue" type="number" placeholder="e.g., 1500" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Closing Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save Outcome</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const UnifiedInboxDialog = ({ open, onOpenChange, initialConversation, initialFilter }: { open: boolean, onOpenChange: (open: boolean) => void, initialConversation: Conversation | null, initialFilter?: 'hot' }) => {
    const { toast } = useToast();
    const [conversations, setConversations] = React.useState<Conversation[]>(initialConversations);
    const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(null);
    const [replyContent, setReplyContent] = React.useState('');
    const [isSending, setIsSending] = React.useState(false);
    const [channelFilter, setChannelFilter] = React.useState('All');
    const [statusFilter, setStatusFilter] = React.useState('All');
    const [isOutcomeDialogOpen, setIsOutcomeDialogOpen] = React.useState(false);

    const scrollAreaRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(initialConversation) {
            setSelectedConversation(initialConversation);
        } else if (filteredConversations.length > 0) {
            setSelectedConversation(filteredConversations[0]);
        }
    }, [initialConversation]);
    
    useEffect(() => {
        if (initialFilter === 'hot') {
            setStatusFilter('Hot Lead'); // A bit of a hack, assumes 'Hot Lead' is a possible status/tag
        } else {
            setStatusFilter('All');
        }
    }, [initialFilter, open])

    const filteredConversations = React.useMemo(() => {
        return conversations.filter(convo => {
            const channelMatch = channelFilter === 'All' || convo.channel === channelFilter;
            let statusMatch = statusFilter === 'All' || convo.status === statusFilter;
            if(statusFilter === 'Hot Lead') {
                statusMatch = convo.tags.some(tag => tag.text === 'Hot Lead');
            }
            return channelMatch && statusMatch;
        });
    }, [conversations, channelFilter, statusFilter]);

    const messages = selectedConversation ? selectedConversation.thread : [];

    React.useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [selectedConversation, messages]);

    const handleSendReply = () => {
        if (!replyContent || !selectedConversation) return;
        setIsSending(true);
        setTimeout(() => {
            const newReply = { type: 'sdr' as const, content: replyContent };
            const updatedConversation = { ...selectedConversation, thread: [...selectedConversation.thread, newReply] };
            setConversations(prev => prev.map(c => c.id === selectedConversation.id ? updatedConversation : c));
            setSelectedConversation(updatedConversation);
            toast({
                title: "Reply Sent!",
                description: `Your message to ${selectedConversation.customer} has been sent.`,
            });
            setReplyContent('');
            setIsSending(false);
        }, 1000);
    };
    
    const handleUpdateStatus = (id: string, status: 'Deal Closed' | 'Lost') => {
        if (status === 'Deal Closed') {
            setIsOutcomeDialogOpen(true);
        } else {
            const updatedConversation = { ...conversations.find(c => c.id === id)!, status: 'Resolved' as const, outcome: { status: 'Lost', revenue: 0, date: format(new Date(), 'yyyy-MM-dd') } };
            setConversations(prev => prev.map(c => c.id === id ? updatedConversation : c));
            if (selectedConversation && selectedConversation.id === id) {
                setSelectedConversation(updatedConversation);
            }
            toast({
                title: "Conversation Updated",
                description: `Conversation status updated to ${status}.`
            })
        }
    }

    const handleSaveOutcome = (outcome: { revenue: number; date: string }) => {
        if (selectedConversation) {
            const updatedConversation = { ...selectedConversation, status: 'Resolved' as const, outcome: { status: 'Won', ...outcome } };
            setConversations(prev => prev.map(c => c.id === selectedConversation.id ? updatedConversation : c));
            setSelectedConversation(updatedConversation);
             toast({
                title: "Outcome Logged!",
                description: `Revenue of ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(outcome.revenue)} saved.`
            })
        }
        setIsOutcomeDialogOpen(false);
    }

    return (
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[90vw] h-[90vh] md:max-w-7xl md:h-[80vh] flex flex-col p-0">
                <div className="p-4 border-b">
                    <DialogTitle className="text-lg font-semibold font-headline">Unified Inbox</DialogTitle>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden flex-1">
                    {/* Left Panel */}
                    <div className="md:col-span-4 lg:col-span-3 border-r flex flex-col">
                        <div className="p-3 border-b space-y-2">
                             <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                                <Input placeholder="Search here..." className="pl-9 bg-background h-9"/>
                            </div>
                            <div className="flex gap-2">
                                <Select value={channelFilter} onValueChange={setChannelFilter}>
                                    <SelectTrigger className="w-full h-8 text-xs"><SelectValue placeholder="Filter Channel..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All Channels</SelectItem>
                                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                                        <SelectItem value="Instagram">Instagram</SelectItem>
                                        <SelectItem value="Facebook">Facebook</SelectItem>
                                        <SelectItem value="Gmail">Gmail</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-full h-8 text-xs"><SelectValue placeholder="Filter Status..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All Statuses</SelectItem>
                                        <SelectItem value="Needs Attention">Needs Attention</SelectItem>
                                        <SelectItem value="AI Handled">AI Handled</SelectItem>
                                        <SelectItem value="Resolved">Resolved</SelectItem>
                                        <SelectItem value="Hot Lead">Hot Leads</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <ScrollArea className="flex-1">
                            <div className="p-2 space-y-1">
                                {filteredConversations.map((convo) => (
                                    <button 
                                        key={convo.id}
                                        className={cn(
                                            "w-full text-left p-2.5 rounded-lg border border-transparent transition-colors",
                                            selectedConversation?.id === convo.id 
                                                ? "bg-secondary border-primary/20"
                                                : "hover:bg-secondary/50"
                                        )}
                                        onClick={() => setSelectedConversation(convo)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="text-xs">{convo.avatar}</AvatarFallback>
                                                </Avatar>
                                                <p className="font-semibold text-sm">{convo.customer}</p>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{convo.timestamp}</p>
                                        </div>
                                        <h3 className="font-medium text-sm mt-2 truncate">{convo.subject}</h3>
                                        <p className="text-xs text-muted-foreground mt-1 truncate">{convo.lastMessage}</p>
                                        <div className="mt-2 flex gap-1.5 flex-wrap">
                                            {convo.tags.map(tag => (
                                                <Badge key={tag.text} variant="outline" className={cn("text-xs px-1.5 py-0.5", getTagStyles(tag.type))}>
                                                    {tag.text}
                                                </Badge>
                                            ))}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Center Panel */}
                    <div className="md:col-span-5 lg:col-span-5 flex flex-col bg-muted/20">
                        {selectedConversation ? (
                            <>
                                <div className="p-3 border-b flex items-center justify-between flex-wrap gap-2 bg-background">
                                    <h2 className="text-base font-bold flex items-center gap-2">
                                        {channelIcons[selectedConversation.channel]}
                                        {selectedConversation.customer}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm"><Check className="mr-2 h-4 w-4"/> Close</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                 <DropdownMenuItem onClick={() => handleUpdateStatus(selectedConversation.id, 'Deal Closed')}>
                                                    <Star className="mr-2 h-4 w-4 text-green-400"/>
                                                    Mark as Deal Closed
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleUpdateStatus(selectedConversation.id, 'Lost')}>
                                                    <Hand className="mr-2 h-4 w-4 text-red-400"/>
                                                    Mark as Lost
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                                                <DropdownMenuItem>Assign to team member</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Mark as spam</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 md:p-6">
                                    <div className="space-y-6">
                                        {messages.map((msg, index) => (
                                            <div key={index} className={cn("flex items-end gap-2", msg.type === 'sdr' ? 'justify-end' : '')}>
                                                {(msg.type === 'user' || msg.type === 'ai') && (
                                                     <Avatar className="h-8 w-8">
                                                        <AvatarFallback>{msg.type === 'user' ? selectedConversation.avatar : 'AI'}</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className={cn(
                                                    "p-3 rounded-lg max-w-md",
                                                    msg.type === 'user' && 'bg-background shadow-sm',
                                                    msg.type === 'ai' && 'bg-blue-500/10 text-blue-900 dark:text-blue-200 border border-blue-500/20',
                                                    msg.type === 'sdr' && 'bg-primary text-primary-foreground',
                                                )}>
                                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                                </div>
                                                {msg.type === 'sdr' && (
                                                     <Avatar className="h-8 w-8">
                                                        <AvatarFallback>You</AvatarFallback>
                                                    </Avatar>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                <div className="p-4 border-t bg-background space-y-3">
                                    <Textarea
                                        placeholder={`Reply to ${selectedConversation.customer}...`}
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        className="bg-secondary"
                                    />
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="sm"><FileText className="mr-2 h-4 w-4" /> Templates</Button>
                                            <Button variant="ghost" size="sm"><Wand2 className="mr-2 h-4 w-4" /> AI Suggest</Button>
                                        </div>
                                        <Button
                                            onClick={handleSendReply}
                                            disabled={isSending || !replyContent}
                                        >
                                            {isSending ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                <Send className="mr-2 h-4 w-4" />
                                            )}
                                            Send
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                <p>Select a conversation to view</p>
                            </div>
                        )}
                    </div>
                    {/* Right Panel */}
                    <div className="md:col-span-3 lg:col-span-4 border-l flex flex-col">
                        <ScrollArea className="flex-1">
                            {selectedConversation && (
                                <div className="p-6 space-y-6">
                                    {selectedConversation.outcome && (
                                        <Card className={cn(selectedConversation.outcome.status === 'Won' ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20')}>
                                            <CardHeader>
                                                <CardTitle className={cn("flex items-center gap-2", selectedConversation.outcome.status === 'Won' ? 'text-green-400' : 'text-red-400')}>
                                                    <Trophy className="h-5 w-5"/> Outcome: {selectedConversation.outcome.status}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-2 text-sm">
                                                {selectedConversation.outcome.status === 'Won' && (
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Revenue Logged</span>
                                                        <span className="font-bold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(selectedConversation.outcome.revenue)}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Date Closed</span>
                                                    <span className="font-medium">{format(new Date(selectedConversation.outcome.date), 'PPP')}</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Lead Details</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Name</span>
                                                <span className="font-medium">{selectedConversation.customer}</span>
                                            </div>
                                             <div className="flex justify-between">
                                                <span className="text-muted-foreground">Contact</span>
                                                <span className="font-medium">{selectedConversation.fromEmail}</span>
                                            </div>
                                             <div className="flex justify-between">
                                                <span className="text-muted-foreground">Source</span>
                                                <span className="font-medium">{selectedConversation.channel}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                     <Card>
                                        <CardHeader>
                                            <CardTitle>AI Insights</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <Label className="text-xs">Confidence Score</Label>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={selectedConversation.engagementScore} />
                                                    <span>{selectedConversation.engagementScore}/100</span>
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-xs">AI Summary</Label>
                                                <p className="text-sm text-muted-foreground">Lead is asking about product materials and shipping, showing high purchase intent.</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader><CardTitle>Next Steps</CardTitle></CardHeader>
                                        <CardContent className="space-y-2">
                                            <Button variant="outline" className="w-full justify-start"><Wand2 className="mr-2 h-4 w-4"/>Suggest Reply</Button>
                                            <Button variant="outline" className="w-full justify-start"><CalendarCheck className="mr-2 h-4 w-4"/>Book Appointment</Button>
                                            <Button variant="outline" className="w-full justify-start"><Clock className="mr-2 h-4 w-4"/>Set Follow-up Reminder</Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </ScrollArea>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
        {selectedConversation && (
            <LogOutcomeDialog 
                open={isOutcomeDialogOpen} 
                onOpenChange={setIsOutcomeDialogOpen} 
                onSave={handleSaveOutcome}
            />
        )}
        </>
    )
}

const ConversationSummary = ({ conversation }: { conversation: string }) => {
  const [summary, setSummary] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      setError('');
      try {
        const result = await getConversationSummary({ conversationHistory: conversation });
        if (result.data) {
          setSummary(result.data.summary);
        } else {
           setError(result.message || 'Failed to get summary.');
        }
      } catch (e) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, [conversation]);

  if (loading) {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    )
  }

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  return (
    <div className="space-y-2">
        <p className="text-sm">{summary}</p>
    </div>
  );
};

const agentosAppointments: any[] = [];

const AppointmentsBookedDialog = () => {
  const [appointmentDate, setAppointmentDate] = React.useState<Date | undefined>();

  React.useEffect(() => {
    // We set the date in a useEffect to avoid hydration mismatches
    setAppointmentDate(new Date());
  }, []);

  const selectedAppointments = agentosAppointments.filter(
    (app) => appointmentDate && format(app.date, 'yyyy-MM-dd') === format(appointmentDate, 'yyyy-MM-dd')
  );
  
  return (
       <Dialog>
            <DialogTrigger asChild>
                <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Appointments Booked</CardTitle>
                        <CalendarCheck className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.bookings}</div>
                        <p className="text-xs text-muted-foreground"><span className="text-muted-foreground">0</span> from yesterday</p>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Appointments</DialogTitle>
                  <DialogDescription>
                    View booked appointments by date. Click an appointment for an AI summary.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={appointmentDate}
                      onSelect={setAppointmentDate}
                      className="rounded-md border"
                      modifiers={{ booked: agentosAppointments.map(a => a.date) }}
                      modifiersStyles={{ booked: { border: '1px solid hsl(var(--primary))' } }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Appointments for {appointmentDate ? format(appointmentDate, "PPP") : "..."}
                    </h3>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {selectedAppointments.length > 0 ? (
                        <ul className="space-y-4">
                            {selectedAppointments.map((app, index) => (
                             <li key={index}>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="flex items-center space-x-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary w-full text-left transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                                            <div className="flex-shrink-0 bg-primary/20 text-primary p-2 rounded-lg">
                                                <Clock className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold">{app.time}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    With <span className="font-medium text-foreground">{app.lead}</span>
                                                </p>
                                            </div>
                                            <Badge variant="outline" className="text-green-400 border-green-400/50 bg-green-500/10">Booked</Badge>
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Bot className="h-6 w-6 text-primary" />
                                                <h4 className="font-semibold font-headline">AI Conversation Summary</h4>
                                            </div>
                                            <ConversationSummary conversation={app.conversation}/>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </li>
                            ))}
                        </ul>
                        ) : (
                        <div className="flex flex-col items-center justify-center h-48 text-center">
                            <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
                            <p className="text-muted-foreground">No appointments for this date.</p>
                        </div>
                        )}
                    </div>
                  </div>
                </div>
            </DialogContent>
        </Dialog>
  )
}

const LeadsNeedingResponseDialog = ({ onTakeOver }: { onTakeOver: (convo: Conversation) => void }) => {
    const handoffConversations = initialConversations.filter(c => c.status === 'Needs Attention');

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="lg:col-span-1 cursor-pointer hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leads Needing Response</CardTitle>
                        <Hand className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{handoffConversations.length}</div>
                        <p className="text-xs text-muted-foreground">Conversations needing your attention</p>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Leads Needing Response</DialogTitle>
                    <DialogDescription>These conversations were flagged by the AI for your expert handling.</DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto">
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Reason for Handoff</TableHead>
                                <TableHead>Channel</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {handoffConversations.map((convo) => (
                                <TableRow key={convo.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar><AvatarFallback>{convo.avatar}</AvatarFallback></Avatar>
                                            <span className="font-medium">{convo.customer}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground max-w-sm truncate">{convo.lastMessage}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {channelIcons[convo.channel as keyof typeof channelIcons]}
                                            {convo.channel}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" onClick={() => onTakeOver(convo)}>
                                            Take Over
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const initialEngagementFeedData: any[] = [];
type EngagementItem = any;
const mentionsFeedData: EngagementItem[] = [];
const platformPerformanceData: any[] = [];
const aiVsSdrData: any[] = [];
const themeData: any[] = [];
const influencerData: any[] = [];
const trendData = {
    sentiment: { current: 0, previous: 0, change: 0 },
    issues: { current: 0, previous: 0, change: 0 },
};
const escalationHeatmapData: any[] = [];

const EngagementDialog = () => {
    const [engagementFeed, setEngagementFeed] = useState(initialEngagementFeedData);
    const [mentionsFeed, setMentionsFeed] = useState(mentionsFeedData);
    const [activeTab, setActiveTab] = useState("comments");
    const [filter, setFilter] = useState("all");
    const [selectedItem, setSelectedItem] = useState<EngagementItem | null>(initialEngagementFeedData[0]);
    const { toast } = useToast();

    const handleItemAction = (itemId: string, action: 'resolve' | 'send', collection: 'engagement' | 'mentions') => {
        const updateFeed = (feed: EngagementItem[]) => feed.map(item =>
            item.id === itemId ? { ...item, status: 'Resolved' as const } : item
        );

        if(collection === 'engagement') {
            setEngagementFeed(updateFeed(engagementFeed));
        } else {
            setMentionsFeed(updateFeed(mentionsFeed));
        }
        
        toast({
            title: action === 'resolve' ? "Item Resolved" : "Reply Sent!",
            description: `The item has been updated.`,
        });
    };
    
    const sentimentAnalyticsData: any[] = [];
    const engagementTrendData: any[] = [];
    const conversationPerformanceData: any[] = [];

    const getSentimentStyles = (sentiment: 'Positive' | 'Neutral' | 'Negative') => {
        switch (sentiment) {
            case 'Positive': return 'text-green-500 bg-green-500/10';
            case 'Negative': return 'text-red-500 bg-red-500/10';
            default: return 'text-yellow-500 bg-yellow-500/10';
        }
    };
    
    const currentFeed = activeTab === 'comments' ? engagementFeed : mentionsFeed;
    const filteredFeed = useMemo(() => {
        if (filter === 'all') return currentFeed;
        return currentFeed.filter(item => {
             if (filter === 'unanswered' || filter === 'needs-review') return item.status === 'Needs SDR';
             if (filter === 'mentions') return item.type === 'mention';
             return true;
        })
    }, [filter, currentFeed]);

    useEffect(() => {
        if(filteredFeed.length > 0) {
            setSelectedItem(filteredFeed[0]);
        } else {
            setSelectedItem(null);
        }
    }, [filteredFeed])


    const renderFeed = (items: EngagementItem[]) => (
        <ScrollArea className="flex-1">
            <div className="space-y-3 p-4">
            {items.length > 0 ? items.map(item => (
                <Card 
                    key={item.id} 
                    className={cn("cursor-pointer transition-all", selectedItem?.id === item.id ? "border-primary shadow-lg" : "hover:border-primary/50")}
                    onClick={() => setSelectedItem(item)}
                >
                    <CardContent className="p-4 space-y-3">
                        <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10"><AvatarFallback>{item.user.avatar}</AvatarFallback></Avatar>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{item.user.name} <span className="text-muted-foreground font-normal">{item.user.handle}</span></p>
                                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                                </div>
                                <p className="text-sm mt-1">{item.content}</p>
                                <div className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                                    <ImageIcon className="h-4 w-4"/>
                                    <span>{item.source.name} on {item.source.platform}</span>
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Badge variant="outline" className={getSentimentStyles(item.sentiment)}>{item.sentiment}</Badge>
                                <Badge variant={item.status === 'Auto-Reply' || item.status === 'Resolved' ? 'default' : 'destructive'} className={cn(item.status === 'Auto-Reply' || item.status === 'Resolved' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400')}>
                                    {item.status === 'Needs SDR' ? <MessageCircleQuestion className="h-3 w-3 mr-1.5"/> : <CheckCircle className="h-3 w-3 mr-1.5"/>}
                                    {item.status}
                                </Badge>
                            </div>
                             <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" className="h-8">Reply</Button>
                                <Button variant="ghost" size="sm" className="h-8" onClick={() => handleItemAction(item.id, 'resolve', activeTab as 'engagement' | 'mentions')}>Mark Resolved</Button>
                                <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">Ignore</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )) : (
                 <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center p-8">
                    <MessageSquare className="h-10 w-10 mb-4" />
                    <h3 className="font-semibold">No items match your filter</h3>
                    <p className="text-sm">Try selecting a different filter option.</p>
                </div>
            )}
            </div>
        </ScrollArea>
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="lg:col-span-1 cursor-pointer hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Engagements</CardTitle>
                        <ThumbsUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.engagements}</div>
                        <p className="text-xs text-muted-foreground"><span className="text-muted-foreground">0</span> mentions & comments</p>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="max-w-7xl h-[90vh] flex flex-col p-0">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle className="font-headline text-lg">AgentOS Engagement Panel</DialogTitle>
                </DialogHeader>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden">
                    <div className="md:col-span-8 flex flex-col border-r">
                        <Tabs defaultValue="comments" className="flex flex-col flex-1" onValueChange={setActiveTab}>
                           <TabsList className="m-4">
                                <TabsTrigger value="comments">Comments</TabsTrigger>
                                <TabsTrigger value="mentions">Mentions</TabsTrigger>
                                <TabsTrigger value="engagement-analytics">Engagement Analytics</TabsTrigger>
                                <TabsTrigger value="conversation-analytics">Conversation Analytics</TabsTrigger>
                            </TabsList>
                            <TabsContent value="comments" className="flex-1 outline-none h-full m-0 data-[state=active]:flex flex-col overflow-hidden">
                                <div className="px-4 pb-4 border-b shrink-0">
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input placeholder="Search comments..." className="pl-8 bg-background"/>
                                        </div>
                                        <Select value={filter} onValueChange={setFilter}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Filter..."/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All</SelectItem>
                                                <SelectItem value="unanswered">Unanswered</SelectItem>
                                                <SelectItem value="needs-review">Needs Review</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                {renderFeed(engagementFeed)}
                            </TabsContent>
                             <TabsContent value="mentions" className="flex-1 outline-none m-0 h-full data-[state=active]:flex flex-col overflow-hidden">
                                <div className="px-4 pb-4 border-b shrink-0">
                                   <div className="flex items-center gap-2">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input placeholder="Search mentions..." className="pl-8 bg-background"/>
                                        </div>
                                         <Select value={filter} onValueChange={setFilter}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Filter..."/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All</SelectItem>
                                                <SelectItem value="unanswered">Unanswered</SelectItem>
                                                <SelectItem value="needs-review">Needs Review</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                {renderFeed(mentionsFeed)}
                            </TabsContent>
                            <TabsContent value="engagement-analytics" className="data-[state=active]:flex flex-col flex-1 overflow-y-auto p-4 space-y-4 m-0 outline-none">
                                <div className="flex items-center justify-between shrink-0">
                                    <h3 className="font-semibold font-headline text-xl">AI Engagement Analysis</h3>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm">This Week</Button>
                                        <Button variant="outline" size="sm">Last 7 Days</Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Comments</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">0</p></CardContent></Card>
                                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Mentions</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">0</p></CardContent></Card>
                                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">% Auto-Handled by AI</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">0%</p></CardContent></Card>
                                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">% Escalated to SDR</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">0%</p></CardContent></Card>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <Card className="lg:col-span-2">
                                        <CardHeader><CardTitle>Sentiment Analysis</CardTitle></CardHeader>
                                        <CardContent className="grid grid-cols-2 gap-4">
                                            <div className="h-[200px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Tooltip />
                                                        <Pie data={sentimentAnalyticsData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                                                            const RADIAN = Math.PI / 180;
                                                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                                            return <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">{`${(percent * 100).toFixed(0)}%`}</text>;
                                                        }}>
                                                            {sentimentAnalyticsData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                                        </Pie>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                            <div>
                                                 <h4 className="font-semibold mb-2">Top Themes</h4>
                                                <ul className="space-y-2 text-sm italic text-muted-foreground">
                                                    <li className="flex items-start"><div>Awaiting user sentiment data...</div></li>
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                     <Card>
                                        <CardHeader><CardTitle>AI Narrative</CardTitle></CardHeader>
                                        <CardContent className="text-sm text-muted-foreground space-y-2 italic bg-secondary p-4 rounded-lg">
                                            <p>Awaiting sufficient sample data to generate automated narrative.</p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                     <Card className="lg:col-span-2">
                                        <CardHeader><CardTitle>Engagement Trends (Last 7 Days)</CardTitle></CardHeader>
                                        <CardContent className="h-[200px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={engagementTrendData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" fontSize={12} />
                                                    <YAxis fontSize={12} />
                                                    <Tooltip />
                                                    <Legend wrapperStyle={{fontSize: '12px'}}/>
                                                    <Line type="monotone" dataKey="comments" stroke="hsl(var(--chart-1))" />
                                                    <Line type="monotone" dataKey="mentions" stroke="hsl(var(--chart-2))" />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </CardContent>
                                    </Card>
                                     <Card>
                                        <CardHeader><CardTitle>AI Recommendations</CardTitle></CardHeader>
                                        <CardContent>
                                            <ul className="space-y-3">
                                               <li className="text-sm italic text-muted-foreground">Monitoring streams for recommendation...</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                             <TabsContent value="conversation-analytics" className="data-[state=active]:flex flex-col flex-1 overflow-y-auto p-4 space-y-4 m-0 outline-none">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0">
                                    <Card>
                                        <CardHeader><CardTitle>Platform Comparison</CardTitle></CardHeader>
                                        <CardContent>
                                            {platformPerformanceData.length > 0 ? platformPerformanceData.map(p => (
                                                <div key={p.platform} className="mb-4">
                                                    <h4 className="font-semibold">{p.platform}</h4>
                                                    <div className="text-xs text-muted-foreground">
                                                        <p>Conversations: {p.conversations}</p>
                                                        <p>Escalated: {p.escalated}%</p>
                                                        <p>Growth: <span className={p.growth > 0 ? 'text-green-500' : 'text-red-500'}>{p.growth}%</span></p>
                                                    </div>
                                                </div>
                                            )) : <p className="text-muted-foreground text-sm italic text-center py-4">Awaiting data...</p>}
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader><CardTitle>AI vs SDR Handling</CardTitle></CardHeader>
                                        <CardContent className="h-[200px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RechartsBarChart data={aiVsSdrData} layout="vertical">
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis type="number" unit="%" />
                                                    <YAxis dataKey="channel" type="category" width={80} />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="ai" name="AI Handled" stackId="a" fill="hsl(var(--chart-2))" />
                                                    <Bar dataKey="sdr" name="SDR Handled" stackId="a" fill="hsl(var(--chart-1))" />
                                                </RechartsBarChart>
                                            </ResponsiveContainer>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                     <Card>
                                        <CardHeader><CardTitle>Theme Clustering</CardTitle></CardHeader>
                                        <CardContent>
                                            {themeData.length > 0 ? themeData.map(t => (
                                                <div key={t.theme} className="mb-2 text-sm">
                                                    <p className="font-semibold">{t.theme} ({t.volume})</p>
                                                    <p className="text-xs text-muted-foreground">Pos: {t.positive}% / Neg: {t.negative}%</p>
                                                </div>
                                            )) : <p className="text-muted-foreground text-sm italic text-center py-4">Awaiting data...</p>}
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader><CardTitle>Influencer Mentions</CardTitle></CardHeader>
                                        <CardContent>
                                            {influencerData.length > 0 ? influencerData.map(inf => (
                                                <div key={inf.name} className="mb-2 text-sm">
                                                    <p className="font-semibold">{inf.name} ({inf.followers})</p>
                                                    <p className="text-xs text-muted-foreground">Sentiment: {inf.sentiment} / Impact: {inf.impact}</p>
                                                </div>
                                            )) : <p className="text-muted-foreground text-sm italic text-center py-4">Awaiting data...</p>}
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader><CardTitle>Trend Shift Analysis</CardTitle></CardHeader>
                                        <CardContent>
                                            <div className="text-sm">
                                                <p className="font-semibold">Overall Sentiment</p>
                                                <p className="text-muted-foreground">0% (-%)</p>
                                                <p className="font-semibold mt-2">Recurring Issues</p>
                                                <p className="text-muted-foreground">0% (-%)</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <aside className="md:col-span-4 bg-secondary/30 p-4 flex flex-col gap-4 overflow-y-auto">
                        {selectedItem ? (
                            <>
                                <Card>
                                    <CardHeader className="pb-2"><CardTitle className="text-base">Context</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-3">
                                            <img src={selectedItem.source.thumbnail} alt="Post thumbnail" className="w-16 h-16 rounded-md object-cover"/>
                                            <div>
                                                <p className="font-semibold text-sm">Post: {selectedItem.source.name}</p>
                                                <p className="text-xs text-muted-foreground">Platform: {selectedItem.source.platform}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="flex-1">
                                    <CardHeader className="pb-2"><CardTitle className="text-base">Thread</CardTitle></CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-start gap-2">
                                            <Avatar className="h-8 w-8"><AvatarFallback>{selectedItem.user.avatar}</AvatarFallback></Avatar>
                                            <p className="bg-background p-2 rounded-lg text-sm">{selectedItem.content}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2"><CardTitle className="text-base">AI Suggestion</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="bg-background p-3 rounded-lg text-sm border border-primary/20">{selectedItem.aiReply}</div>
                                        <div className="flex gap-2 mt-3">
                                            <Button className="flex-1" onClick={() => handleItemAction(selectedItem.id, 'send', activeTab === 'comments' ? 'engagement' : 'mentions')}>Send Reply</Button>
                                            <Button variant="outline" className="flex-1"><RefreshCw className="mr-2 h-4 w-4"/>Re-generate</Button>
                                         </div>
                                         <Button variant="secondary" className="w-full mt-2"><GitCompareArrows className="mr-2 h-4 w-4"/>Escalate to DM</Button>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                             <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center p-8">
                                <MessageSquare className="h-10 w-10 mb-4" />
                                <h3 className="font-semibold">Select an item</h3>
                                <p className="text-sm">Choose a comment or mention to see the context and reply.</p>
                            </div>
                        )}
                    </aside>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default function AgentosSdrPage() {
  const { toast } = useToast();
  const [conversations, setConversations] = useState(initialConversations);
  const [isAiActive, setIsAiActive] = React.useState(true);
  const [isUnifiedInboxOpen, setIsUnifiedInboxOpen] = React.useState(false);
  const [selectedConvoForInbox, setSelectedConvoForInbox] = React.useState<Conversation | null>(null);
  const [inboxFilter, setInboxFilter] = React.useState<'hot' | undefined>(undefined);

  const handleOpenInbox = (filter?: 'hot') => {
      setInboxFilter(filter);
      setSelectedConvoForInbox(null);
      setIsUnifiedInboxOpen(true);
  }

  const handleTakeOver = (convo: Conversation) => {
      const existingConvo = conversations.find(c => c.id === convo.id);
      setSelectedConvoForInbox(existingConvo || null);
      setIsUnifiedInboxOpen(true);
  }

  const handleUpdateStatus = (id: string, status: 'Booked' | 'Follow-up' | 'Lost') => {
      setConversations(prev => prev.map(c => c.id === id ? { ...c, status: 'Resolved' } : c));
      toast({
          title: "Conversation Updated",
          description: `Conversation with ${conversations.find(c=>c.id === id)?.customer} marked as ${status}.`
      })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold font-headline">AgentOS SDR Dashboard</h1>
            <p className="text-muted-foreground mt-1">Your unified inbox for AI-powered conversations.</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Dialog onOpenChange={setIsUnifiedInboxOpen} open={isUnifiedInboxOpen}>
            <DialogTrigger asChild>
                <Card className="lg:col-span-1 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1" onClick={() => handleOpenInbox()}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Conversations</CardTitle>
                        <MessageSquare className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.newConversations}</div>
                        <p className="text-xs text-muted-foreground"><span className="text-muted-foreground">0%</span> from yesterday</p>
                    </CardContent>
                </Card>
            </DialogTrigger>
             <UnifiedInboxDialog open={isUnifiedInboxOpen} onOpenChange={setIsUnifiedInboxOpen} initialConversation={selectedConvoForInbox} initialFilter={inboxFilter} />
        </Dialog>

        
        <AppointmentsBookedDialog />
        
        <EngagementDialog />

        <Link href="/dashboard/intelligence-hub/sdr" className="lg:col-span-1">
            <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <BrainCircuit className="h-4 w-4 text-primary"/>
                        Intelligence Hub
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Actionable Insights</div>
                </CardContent>
            </Card>
        </Link>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
               <PlatformActivityHeatmap />
            </div>
            <div className="lg:col-span-1 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Platform Activity by Hour</CardTitle>
                        <CardDescription>Comparing normalized user activity scores (0-100) across channels.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={channelVolumeData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="channel" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => value.toLocaleString()} />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--secondary))' }}
                                    contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                                />
                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                    <LabelList dataKey="count" position="top" />
                                    {channelVolumeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-3">
                    <AiChatAnalysis />
                </div>
        </div>
    </div>
  );
}
