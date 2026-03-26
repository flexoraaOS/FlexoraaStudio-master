'use server';

/**
 * @fileOverview AI flow for summarizing a WhatsApp conversation.
 *
 * - summarizeConversation - A function that generates a conversation summary.
 * - SummarizeConversationInput - The input type for the summarizeConversation function.
 * - SummarizeConversationOutput - The return type for the summarizeConversation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeConversationInputSchema = z.object({
  conversationHistory: z.string().describe('The full WhatsApp conversation history with a lead.'),
});
export type SummarizeConversationInput = z.infer<typeof SummarizeConversationInputSchema>;

const SummarizeConversationOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the conversation for a sales representative.'),
});
export type SummarizeConversationOutput = z.infer<typeof SummarizeConversationOutputSchema>;

export async function summarizeConversation(
  input: SummarizeConversationInput
): Promise<SummarizeConversationOutput> {
  return summarizeConversationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeConversationPrompt',
  input: {schema: SummarizeConversationInputSchema},
  output: {schema: SummarizeConversationOutputSchema},
  prompt: `You are an expert sales assistant AI. Your task is to provide a concise summary of a WhatsApp conversation for a sales representative who is about to have a meeting with the lead.

  The summary should be brief (2-3 sentences) and highlight:
  - The lead's main interests or pain points.
  - Their overall sentiment (e.g., eager, cautious, inquisitive).
  - Any key questions they asked or commitments they made.
  - The primary goal for the upcoming meeting from the lead's perspective.

  Conversation History:
  {{{conversationHistory}}}

  Generate the summary in the specified JSON format.
  `,
});

const summarizeConversationFlow = ai.defineFlow(
  {
    name: 'summarizeConversationFlow',
    inputSchema: SummarizeConversationInputSchema,
    outputSchema: SummarizeConversationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
