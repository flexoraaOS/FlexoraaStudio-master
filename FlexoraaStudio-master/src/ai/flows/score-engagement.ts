'use server';

/**
 * @fileOverview AI flow for scoring engaged leads based on WhatsApp conversations.
 *
 * - scoreEngagement - A function that handles the lead engagement scoring process.
 * - ScoreEngagementInput - The input type for the scoreEngagement function.
 * - ScoreEngagementOutput - The return type for the scoreEngagement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScoreEngagementInputSchema = z.object({
  conversationHistory: z
    .string()
    .describe('The full WhatsApp conversation history with a potential customer.'),
});
export type ScoreEngagementInput = z.infer<typeof ScoreEngagementInputSchema>;

const ScoreEngagementOutputSchema = z.object({
  leadId: z.string().describe('The unique identifier for the lead.'),
  phoneNumber: z.string().describe('The phone number of the lead.'),
  score: z
    .number()
    .min(0)
    .max(100)
    .describe('The conversion probability score from 0 to 100.'),
  reasoning: z
    .string()
    .describe('A brief explanation for the assigned score.'),
});
export type ScoreEngagementOutput = z.infer<typeof ScoreEngagementOutputSchema>;

export async function scoreEngagement(
  input: ScoreEngagementInput
): Promise<ScoreEngagementOutput> {
  return scoreEngagementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scoreEngagementPrompt',
  input: {schema: ScoreEngagementInputSchema},
  output: {schema: ScoreEngagementOutputSchema},
  prompt: `You are a sales analyst AI. Your task is to analyze a WhatsApp conversation and determine the likelihood of conversion.
  Based on the conversation, provide a score from 0 to 100 indicating the conversion probability.
  A score of 100 means the lead is definitely going to convert, and 0 means there is no chance.

  Analyze the sentiment, engagement level, specific questions asked, and purchase intent mentioned in the conversation.

  Conversation History:
  {{{conversationHistory}}}

  Provide your analysis in the specified JSON format, including the lead's ID, phone number, the calculated score, and your reasoning.
  `,
});

const scoreEngagementFlow = ai.defineFlow(
  {
    name: 'scoreEngagementFlow',
    inputSchema: ScoreEngagementInputSchema,
    outputSchema: ScoreEngagementOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
