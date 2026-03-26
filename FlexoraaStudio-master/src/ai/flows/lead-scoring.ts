'use server';

/**
 * @fileOverview Lead scoring AI agent for analyzing WhatsApp conversations and assigning lead status.
 *
 * - leadScoring - A function that handles the lead scoring process.
 * - LeadScoringInput - The input type for the leadScoring function.
 * - LeadScoringOutput - The return type for the leadScoring function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LeadScoringInputSchema = z.object({
  customerInfoCsv: z
    .string()
    .describe('A CSV string containing customer information and WhatsApp conversations.'),
});
export type LeadScoringInput = z.infer<typeof LeadScoringInputSchema>;

const LeadScoringOutputSchema = z.object({
  scoredLeads: z.array(
    z.object({
      customerId: z.string().describe('The unique identifier for the customer.'),
      leadStatus: z
        .enum(['HOT', 'WARM', 'COLD'])
        .describe('The lead status assigned by the AI.'),
      reason: z.string().describe('The reason for the assigned lead status.'),
    })
  ).describe('An array of scored leads with their customer ID, lead status, and reason.'),
});
export type LeadScoringOutput = z.infer<typeof LeadScoringOutputSchema>;

export async function leadScoring(input: LeadScoringInput): Promise<LeadScoringOutput> {
  return leadScoringFlow(input);
}

const prompt = ai.definePrompt({
  name: 'leadScoringPrompt',
  input: {schema: LeadScoringInputSchema},
  output: {schema: LeadScoringOutputSchema},
  prompt: `You are an AI assistant specializing in lead scoring for sales teams.
  You will receive a CSV string containing customer information and their WhatsApp conversations.
  Analyze each conversation and assign a lead status of HOT, WARM, or COLD based on the customer's interest and engagement.
  Explain the reasoning behind the assigned lead status.

  The output should be a JSON array of scored leads with the following format:
  [{
    "customerId": "<customer_id>",
    "leadStatus": "HOT | WARM | COLD",
    "reason": "<reason_for_lead_status>"
  }]

  Here is the customer information and WhatsApp conversations in CSV format:
  {{{customerInfoCsv}}}
  `,
});

const leadScoringFlow = ai.defineFlow(
  {
    name: 'leadScoringFlow',
    inputSchema: LeadScoringInputSchema,
    outputSchema: LeadScoringOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
