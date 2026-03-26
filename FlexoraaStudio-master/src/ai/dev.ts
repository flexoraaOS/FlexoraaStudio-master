
'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/lead-scoring.ts';
import '@/ai/flows/score-engagement.ts';
import '@/ai/flows/generate-message-template.ts';
import '@/ai/flows/summarize-conversation.ts';
import '@/ai/flows/analyze-dropoff.ts';
