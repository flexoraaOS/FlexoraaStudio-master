

'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ArrowUpDown, Flame, Phone, MessageSquare, List, Bot, Clock, Info, UserCheck, Filter, Milestone, FileText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getConversationSummary } from './actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type LeadStage = 'New' | 'Contacted' | 'Demo Booked' | 'Follow-up' | 'Closed';
type TimelineEventType = 'created' | 'stage_change' | 'note' | 'follow_up' | 'escalation';

type TimelineEvent = {
    type: TimelineEventType;
    title: string;
    content: string;
    date: string;
    author?: string;
};

type Lead = {
  id: string;
  name: string;
  phone: string;
  score: number;
  status: 'HOT';
  stage: LeadStage;
  lastActivity: string;
  timeline: TimelineEvent[];
  sdr?: string;
  sdrAvatar?: string;
  escalationReason?: string;
  conversationHistory: string;
  manager?: string;
};

const qualifiedLeadsData: Lead[] = [];


const ScoreIndicator = ({ score }: { score: number }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-16">
        <Progress value={score} className="h-1.5"/>
      </div>
      <span className="font-medium text-sm text-foreground">{score}</span>
    </div>
  );
};

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

  return <p className="text-sm italic text-muted-foreground">{summary}</p>;
};

const timelineEventIcons: Record<TimelineEventType, React.ReactElement> = {
    created: <List className="h-4 w-4" />,
    stage_change: <Milestone className="h-4 w-4" />,
    note: <FileText className="h-4 w-4" />,
    follow_up: <Clock className="h-4 w-4" />,
    escalation: <ArrowUpDown className="h-4 w-4" />,
};

const leadStages: LeadStage[] = ['New', 'Contacted', 'Demo Booked', 'Follow-up', 'Closed'];


export default function QualifiedLeadsPage() {
    const { toast } = useToast();
    const [leads, setLeads] = React.useState<Lead[]>(qualifiedLeadsData);
    const [sortConfig, setSortConfig] = React.useState<{ key: keyof Lead; direction: 'ascending' | 'descending' } | null>({ key: 'score', direction: 'descending'});
    const [showEscalatedOnly, setShowEscalatedOnly] = React.useState(false);

    const filteredLeads = React.useMemo(() => {
        return showEscalatedOnly ? leads.filter(lead => lead.escalationReason) : leads;
    }, [leads, showEscalatedOnly]);

    const sortedLeads = React.useMemo(() => {
        let sortableItems = [...filteredLeads];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredLeads, sortConfig]);

    const requestSort = (key: keyof Lead) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleTakeOwnership = (leadId: string) => {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, manager: 'Admin User' } : l));
        toast({
            title: "Ownership Taken",
            description: `You are now handling lead ${leadId}.`
        })
    }

    const handleStageChange = (leadId: string, newStage: LeadStage) => {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
        toast({
            title: "Stage Updated",
            description: `Lead ${leadId} moved to "${newStage}".`
        })
    }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Qualified Leads (HOT)</h1>
        <p className="text-muted-foreground mt-1">
          Review high-priority leads, including those escalated by your SDR team.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>HOT Leads Queue</CardTitle>
              <CardDescription>
                Leads with the highest conversion potential.
              </CardDescription>
            </div>
             <div className="flex items-center space-x-2">
                <Switch 
                    id="escalated-only" 
                    checked={showEscalatedOnly}
                    onCheckedChange={setShowEscalatedOnly}
                />
                <Label htmlFor="escalated-only" className="flex items-center gap-2">
                    <Filter className="h-4 w-4"/>
                    Show Escalated Only
                </Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                      <Button variant="ghost" onClick={() => requestSort('name')}>
                          Name
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                  </TableHead>
                  <TableHead>
                      <Button variant="ghost" onClick={() => requestSort('score')}>
                          Score
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                  </TableHead>
                  <TableHead>
                      <Button variant="ghost" onClick={() => requestSort('stage')}>
                          Stage
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                  </TableHead>
                  <TableHead>
                      <Button variant="ghost" onClick={() => requestSort('sdr')}>
                          Escalation
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                  </TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-secondary/50">
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell><ScoreIndicator score={lead.score} /></TableCell>
                    <TableCell><Badge variant="outline">{lead.stage}</Badge></TableCell>
                    <TableCell>
                        {lead.sdr ? (
                             <Popover>
                                <PopoverTrigger asChild>
                                    <div className="flex items-center gap-2 cursor-pointer group">
                                        <Avatar className="h-6 w-6 text-xs"><AvatarFallback>{lead.sdrAvatar}</AvatarFallback></Avatar>
                                        <span className="text-sm group-hover:text-primary">{lead.sdr}</span>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="space-y-2">
                                        <h4 className="font-semibold leading-none">Escalation Reason</h4>
                                        <p className="text-sm text-muted-foreground">{lead.escalationReason}</p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <span className="text-muted-foreground text-sm">—</span>
                        )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <Dialog>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Bot className="mr-2 h-4 w-4"/> AI Summary
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>AI Conversation Summary for {lead.name}</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                    <ConversationSummary conversation={lead.conversationHistory} />
                                </div>
                                </DialogContent>
                            </Dialog>
                             <Dialog>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <List className="mr-2 h-4 w-4"/> View Timeline
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Lead Timeline: {lead.name}</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4 max-h-96 overflow-y-auto">
                                        {lead.timeline.map((event, index) => (
                                            <div key={index} className="flex gap-4 items-start mb-6">
                                                <div className="flex-shrink-0 mt-1 h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                                                    <span className="text-primary">{timelineEventIcons[event.type]}</span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">{event.title}</p>
                                                    <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()} by {event.author}</p>
                                                    <p className="text-sm mt-1">{event.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </DialogContent>
                            </Dialog>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem asChild>
                             <a href={`tel:${lead.phone}`}><Phone className="mr-2 h-4 w-4" /> Call Lead</a>
                           </DropdownMenuItem>
                           <DropdownMenuItem asChild>
                             <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank"><MessageSquare className="mr-2 h-4 w-4" /> WhatsApp</a>
                           </DropdownMenuItem>
                           <DropdownMenuSeparator />
                             <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <Milestone className="mr-2 h-4 w-4" />
                                    <span>Update Stage</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                    {leadStages.map(stage => (
                                        <DropdownMenuItem key={stage} onClick={() => handleStageChange(lead.id, stage)}>
                                            {lead.stage === stage && <Check className="mr-2 h-4 w-4" />}
                                            <span>{stage}</span>
                                        </DropdownMenuItem>
                                    ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                           <DropdownMenuItem onClick={() => handleTakeOwnership(lead.id)} disabled={!!lead.manager}>
                                <UserCheck className="mr-2 h-4 w-4" /> {lead.manager ? `Handled by ${lead.manager}` : 'Take Ownership'}
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
