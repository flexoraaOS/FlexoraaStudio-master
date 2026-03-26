'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { scoreLeadsAction, type State } from './actions';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Upload, Loader2, PartyPopper, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full gradient-background text-primary-foreground hover:opacity-90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Uploading & Scoring...
        </>
      ) : (
        <>
         <Upload className="mr-2 h-4 w-4" />
          Process Leads
        </>
      )}
    </Button>
  );
}

export function UploadLeadsClient() {
  const initialState: State = { message: null, errors: null, data: null };
  const [state, dispatch] = useFormState(scoreLeadsAction, initialState);
  const [fileName, setFileName] = useState('');
  const [csvContent, setCsvContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv') {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload a valid CSV file.",
        });
        return;
      }
      setFileName(file.name);
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
    <div className="grid grid-cols-1">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Upload & Process Leads</CardTitle>
            <CardDescription>Upload a CSV file with customer data to have the AI score and qualify them.</CardDescription>
          </CardHeader>
          <CardContent>
            {state.data?.scoredLeads ? (
                 <div className="flex flex-col items-center justify-center p-12 text-center bg-secondary/30 rounded-lg">
                    <div className="relative mb-4">
                        <CheckCircle className="h-20 w-20 text-green-400 animate-in fade-in zoom-in-50 duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold font-headline mb-2">Upload Successful!</h3>
                    <p className="text-muted-foreground mb-4">
                        We have successfully processed your file <span className="font-semibold text-foreground">{fileName}</span>.
                    </p>
                    <div className="flex gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold">{state.data.scoredLeads.length}</p>
                            <p className="text-sm text-muted-foreground">Leads Scored</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{state.data.scoredLeads.filter(l => l.leadStatus === 'HOT').length}</p>
                            <p className="text-sm text-muted-foreground">HOT Leads</p>
                        </div>
                         <div>
                            <p className="text-2xl font-bold">{state.data.scoredLeads.filter(l => l.leadStatus === 'WARM').length}</p>
                            <p className="text-sm text-muted-foreground">WARM Leads</p>
                        </div>
                    </div>
                    <Button onClick={() => window.location.reload()} className="mt-6">Upload Another File</Button>
                </div>
            ) : (
                <form action={dispatch}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="csv-upload" className="sr-only">Upload CSV</Label>
                      <div 
                        className="relative block w-full rounded-lg border-2 border-dashed border-border p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={handleUploadClick}
                        onDrop={(e) => { e.preventDefault(); handleFileChange({ target: e.dataTransfer } as any); }}
                        onDragOver={(e) => e.preventDefault()}
                      >
                         <input
                            id="csv-upload"
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".csv"
                            name="file"
                        />
                        <div className="flex flex-col items-center justify-center">
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                            <span className="mt-2 block text-sm font-semibold text-foreground">
                              {fileName ? `Selected: ${fileName}` : 'Click to upload or drag & drop'}
                            </span>
                            <span className="text-xs text-muted-foreground">CSV up to 10MB</span>
                        </div>
                      </div>
                    </div>
                    <input type="hidden" name="customerInfoCsv" value={csvContent} />
                     {state.errors?.customerInfoCsv && (
                        <p className="text-sm text-destructive">{state.errors.customerInfoCsv.join(', ')}</p>
                      )}
                    <SubmitButton />
                  </div>
                </form>
            )}
          </CardContent>
        </Card>
    </div>
  );
}
