
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ArrowUpDown, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getConversationSummary } from './actions';
import { Skeleton } from '@/components/ui/skeleton';


type Lead = {
  id: string;
  name: string;
  phone: string;
  score: number;
  status: 'HOT' | 'WARM' | 'COLD';
  lastActivity: string;
  conversationHistory: string;
};

const engagedLeadsData: Lead[] = [];

const ScoreIndicator = ({ score }: { score: number }) => {
  let colorClass = 'bg-green-500';
  if (score < 80) colorClass = 'bg-yellow-500';
  if (score < 50) colorClass = 'bg-red-500';

  return (
    <div className="flex items-center gap-2">
      <div className="w-24">
        <Progress value={score} className="h-2"/>
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

  return (
    <div className="space-y-2">
        <p className="text-sm italic text-muted-foreground">{summary}</p>
    </div>
  );
};


export default function EngagedLeadsPage() {

    const [leads, setLeads] = React.useState<Lead[]>(engagedLeadsData);
    const [sortConfig, setSortConfig] = React.useState<{ key: keyof Lead; direction: 'ascending' | 'descending' } | null>(null);

    const sortedLeads = React.useMemo(() => {
        let sortableItems = [...leads];
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
    }, [leads, sortConfig]);

    const requestSort = (key: keyof Lead) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key: keyof Lead) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Engaged Leads</h1>
        <p className="text-muted-foreground mt-1">
          Review all engaged WhatsApp leads and their AI-generated conversion score.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Engaged Leads</CardTitle>
          <CardDescription>
            A list of all leads currently in engagement, sorted by the highest conversion potential.
          </CardDescription>
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
                      <Button variant="ghost" onClick={() => requestSort('phone')}>
                          Phone Number
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                  </TableHead>
                  <TableHead>
                      <Button variant="ghost" onClick={() => requestSort('score')}>
                          Conversion Score
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                  </TableHead>
                  <TableHead>
                      <Button variant="ghost" onClick={() => requestSort('status')}>
                          Status
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                  </TableHead>
                  <TableHead>
                      <Button variant="ghost" onClick={() => requestSort('lastActivity')}>
                          Last Activity
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
                    <TableCell className="font-medium">{lead.phone}</TableCell>
                    <TableCell>
                      <ScoreIndicator score={lead.score} />
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          lead.status === 'HOT' ? 'gradient-background text-primary-foreground' :
                          lead.status === 'WARM' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30 hover:text-yellow-300 transition-colors' :
                          'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 hover:text-blue-300 transition-colors'
                        }
                      >
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{lead.lastActivity}</TableCell>
                    <TableCell>
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
                                View Conversation
                              </DropdownMenuItem>
                            </DialogTrigger>
                             <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <Bot className="h-6 w-6 text-primary" />
                                  AI Conversation Summary
                                </DialogTitle>
                                <DialogDescription>
                                  A brief overview of the conversation with {lead.name}.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <ConversationSummary conversation={lead.conversationHistory} />
                              </div>
                            </DialogContent>
                          </Dialog>
                          <DropdownMenuItem>Mark as Not Interested</DropdownMenuItem>
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
