'use server';

/**
 * @fileOverview Generates adaptive training schedules for archery practice.
 *
 * - generateTrainingSchedule - A function that generates a training schedule based on user input.
 * - TrainingScheduleInput - The input type for the generateTrainingSchedule function.
 * - TrainingScheduleOutput - The return type for the generateTrainingSchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrainingScheduleInputSchema = z.object({
  skillLevel: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .describe('The archer skill level.'),
  goals: z.string().describe('The archer goals for training.'),
  historicalPerformanceData: z
    .string()
    .describe('The archer historical performance data.'),
});

export type TrainingScheduleInput = z.infer<typeof TrainingScheduleInputSchema>;

const TrainingScheduleOutputSchema = z.object({
  schedule: z.string().describe('The generated training schedule.'),
});

export type TrainingScheduleOutput = z.infer<typeof TrainingScheduleOutputSchema>;

export async function generateTrainingSchedule(
  input: TrainingScheduleInput
): Promise<TrainingScheduleOutput> {
  return generateTrainingScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'trainingSchedulePrompt',
  input: {schema: TrainingScheduleInputSchema},
  output: {schema: TrainingScheduleOutputSchema},
  prompt: `You are an expert archery coach. Generate a training schedule based on the archer's skill level, goals, and historical performance data.

Skill Level: {{{skillLevel}}}
Goals: {{{goals}}}
Historical Performance Data: {{{historicalPerformanceData}}}

Training Schedule:`, 
});

const generateTrainingScheduleFlow = ai.defineFlow(
  {
    name: 'generateTrainingScheduleFlow',
    inputSchema: TrainingScheduleInputSchema,
    outputSchema: TrainingScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
