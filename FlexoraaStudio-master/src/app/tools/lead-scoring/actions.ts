'use server';

import { z } from 'zod';
import { leadScoring, type LeadScoringOutput } from '@/ai/flows/lead-scoring';

const FormSchema = z.object({
  customerInfoCsv: z.string().min(10, { message: 'CSV data is too short.' }),
});

export type State = {
  message?: string | null;
  errors?: {
    customerInfoCsv?: string[];
  } | null;
  data?: LeadScoringOutput | null;
};

export async function scoreLeadsAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    customerInfoCsv: formData.get('customerInfoCsv'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid CSV data. Please check the content and try again.',
      data: null,
    };
  }

  try {
    const result = await leadScoring({ customerInfoCsv: validatedFields.data.customerInfoCsv });
    if (!result || !result.scoredLeads) {
        throw new Error('AI processing failed to return valid data.');
    }
    return {
      message: 'Leads scored successfully.',
      data: result,
      errors: null,
    };
  } catch (error) {
    console.error('Lead scoring error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      message: `Error scoring leads: ${errorMessage}`,
      data: null,
      errors: null,
    };
  }
}
