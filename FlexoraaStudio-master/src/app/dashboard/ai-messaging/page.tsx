
'use client';

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Loader2, FileEdit, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateTemplateAction } from './actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Template = {
  id: string;
  name: string;
  content: string;
};

type TemplateType = 'INITIAL_OUTREACH' | 'RE_ENGAGEMENT';
type ToneType = 'Friendly' | 'Professional' | 'Direct' | 'Casual';

const initialTemplates: Record<TemplateType, Template[]> = {
  INITIAL_OUTREACH: [
    { id: 'init-1', name: 'Standard Intro', content: 'Hi {{lead_name}}, I\'m from [Your Company]. I saw you were interested in our services. Would you be free for a quick chat this week?' },
    { id: 'init-2', name: 'Friendly Opener', content: 'Hello {{lead_name}}! Reaching out from [Your Company]. We have something special that might interest you. Got a moment to connect?' },
  ],
  RE_ENGAGEMENT: [
    { id: 're-1', name: 'Inactive Check-in', content: 'Hi {{lead_name}}, it\'s been a while! We\'ve made some exciting updates at [Your Company] and thought you might be interested. Would you like to hear more?' },
  ],
};

export default function AiMessagingPage() {
  const [businessInfo, setBusinessInfo] = useState('');
  const [templates, setTemplates] = useState(initialTemplates);
  const [activeTab, setActiveTab] = useState<TemplateType>('INITIAL_OUTREACH');
  const [reEngagementTone, setReEngagementTone] = useState<ToneType>('Friendly');
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerateTemplate = () => {
    if (!businessInfo) {
      toast({
        variant: "destructive",
        title: "Business Information Required",
        description: "Please provide information about your business before generating a template.",
      });
      return;
    }
    startTransition(async () => {
      const result = await generateTemplateAction({ 
        businessInfo, 
        templateType: activeTab,
        tone: activeTab === 'RE_ENGAGEMENT' ? reEngagementTone : undefined,
      });

      if (result.data?.template) {
        const newTemplate: Template = {
          id: `gen-${Date.now()}`,
          name: `AI Generated ${templates[activeTab].length + 1}`,
          content: result.data.template,
        };
        setTemplates(prev => ({
          ...prev,
          [activeTab]: [...prev[activeTab], newTemplate],
        }));
        toast({
          title: "Template Generated",
          description: "A new AI-powered template has been added.",
        });
      }
      if (result.message && result.message.startsWith('Error')) {
         toast({
          variant: "destructive",
          title: "Generation Failed",
          description: result.message,
        });
      }
    });
  };
  
  const handleTemplateContentChange = (content: string) => {
    if (editingTemplate) {
        setEditingTemplate({...editingTemplate, content});
    }
  }

  const saveTemplate = () => {
    if(editingTemplate) {
        const newTemplates = templates[activeTab].map(t => t.id === editingTemplate.id ? editingTemplate : t)
        setTemplates(prev => ({...prev, [activeTab]: newTemplates}));
        setEditingTemplate(null);
        toast({ title: "Template Saved!"})
    }
  }

  const TemplateEditor = ({template, onContentChange, onSave}: {template: Template, onContentChange: (content: string) => void, onSave: () => void}) => {
    return (
        <div className="p-4 border rounded-lg bg-secondary/30 mt-2 space-y-3">
            <h4 className="font-semibold">{template.name}</h4>
            <Textarea 
                value={template.content}
                onChange={(e) => onContentChange(e.target.value)}
                rows={5}
                className="bg-background focus-visible:ring-1"
            />
            <div className="flex justify-end gap-2">
                 <Button variant="ghost" size="sm" onClick={() => setEditingTemplate(null)}>Cancel</Button>
                 <Button size="sm" onClick={onSave}><Save className="mr-2 h-4 w-4"/> Save</Button>
            </div>
        </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI Messaging Configuration</h1>
        <p className="text-muted-foreground mt-1">
          Teach the AI about your business to generate personalized WhatsApp messages for your leads.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Business Information</CardTitle>
              <CardDescription>Provide context for the AI.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label htmlFor="business-info">About Your Business</Label>
                <Textarea
                  id="business-info"
                  placeholder="Describe your company, products, services, and target audience..."
                  rows={8}
                  value={businessInfo}
                  onChange={(e) => setBusinessInfo(e.target.value)}
                />
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4"/> Save Information
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>AI Messaging Templates</CardTitle>
              <CardDescription>Manage your WhatsApp message templates.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TemplateType)} className="w-full">
                <TabsList>
                  <TabsTrigger value="INITIAL_OUTREACH">Initial Outreach</TabsTrigger>
                  <TabsTrigger value="RE_ENGAGEMENT">Re-engagement</TabsTrigger>
                </TabsList>
                <div className="py-4 flex gap-4 items-center">
                  <Button onClick={handleGenerateTemplate} disabled={isPending}>
                    {isPending ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Generating...</>
                    ) : (
                      <><Wand2 className="mr-2 h-4 w-4" /> Generate New Template</>
                    )}
                  </Button>
                  {activeTab === 'RE_ENGAGEMENT' && (
                    <div className="flex items-center gap-2">
                      <Label htmlFor="tone-select">Tone:</Label>
                      <Select value={reEngagementTone} onValueChange={(v) => setReEngagementTone(v as ToneType)}>
                        <SelectTrigger id="tone-select" className="w-[180px]">
                          <SelectValue placeholder="Select a tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Friendly">Friendly</SelectItem>
                          <SelectItem value="Professional">Professional</SelectItem>
                          <SelectItem value="Direct">Direct</SelectItem>
                          <SelectItem value="Casual">Casual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                
                {Object.keys(templates).map(key => (
                  <TabsContent key={key} value={key}>
                    <div className="space-y-3">
                      {templates[key as TemplateType].map((template) => (
                        <div key={template.id}>
                            { editingTemplate?.id === template.id ? (
                                <TemplateEditor template={editingTemplate} onContentChange={handleTemplateContentChange} onSave={saveTemplate} />
                            ) : (
                                <div className="p-3 border rounded-lg hover:bg-secondary/30 transition-colors flex justify-between items-center">
                                  <div className="flex-1">
                                    <p className="font-medium">{template.name}</p>
                                    <p className="text-sm text-muted-foreground truncate max-w-md">{template.content}</p>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => setEditingTemplate(template)}><FileEdit className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="text-destructive/80 hover:text-destructive"><Trash2 className="h-4 w-4"/></Button>
                                  </div>
                                </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
