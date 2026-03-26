'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { scoreLeadsAction, type State } from './actions';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Scoring Leads...
        </>
      ) : (
        'Score Leads'
      )}
    </Button>
  );
}

export function LeadScoringClient() {
  const initialState: State = { message: null, errors: null, data: null };
  const [state, dispatch] = useFormState(scoreLeadsAction, initialState);
  const [csvContent, setCsvContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCsvContent(text);
      };
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  useEffect(() => {
    if (state.message && state.message.startsWith('Error')) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: state.message,
      })
    }
  }, [state.message, toast])


  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Upload Data</CardTitle>
            <CardDescription>Upload a CSV file or paste the content directly.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={dispatch}>
              <div className="space-y-4">
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".csv"
                  />
                  <Button type="button" variant="outline" className="w-full" onClick={handleUploadClick}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload CSV File
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerInfoCsv">Or paste CSV content</Label>
                  <Textarea
                    id="customerInfoCsv"
                    name="customerInfoCsv"
                    rows={10}
                    placeholder="customerId,conversation...\n123,Hello! I am interested..."
                    value={csvContent}
                    onChange={(e) => setCsvContent(e.target.value)}
                    required
                  />
                  {state.errors?.customerInfoCsv && (
                    <p className="text-sm text-destructive">{state.errors.customerInfoCsv.join(', ')}</p>
                  )}
                </div>
                <SubmitButton />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle className="font-headline">Scored Leads</CardTitle>
            <CardDescription>AI-analyzed lead status based on conversation data.</CardDescription>
          </CardHeader>
          <CardContent>
            {state.data?.scoredLeads ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Lead Status</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.data.scoredLeads.map((lead) => (
                    <TableRow key={lead.customerId}>
                      <TableCell className="font-medium">{lead.customerId}</TableCell>
                      <TableCell>
                        <Badge variant={
                          lead.leadStatus === 'HOT' ? 'default' : lead.leadStatus === 'WARM' ? 'secondary' : 'outline'
                        }
                        className={lead.leadStatus === 'HOT' ? 'gradient-background text-primary-foreground' : ''}>
                          {lead.leadStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{lead.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                 <div className="p-4 mb-4 rounded-full bg-secondary">
                    <Terminal className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold font-headline">Awaiting Data</h3>
                <p className="text-muted-foreground">Upload your CSV data to see the AI scoring results here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
