"use server";

import {
  generateTrainingSchedule,
  type TrainingScheduleInput,
} from "@/ai/flows/adaptive-training-schedules";
import { z } from "zod";

const TrainingScheduleInputSchema = z.object({
  skillLevel: z.enum(["beginner", "intermediate", "advanced"]),
  goals: z.string().min(10, "Goals must be at least 10 characters long."),
  historicalPerformanceData: z
    .string()
    .min(10, "Historical data must be at least 10 characters long."),
});

interface FormState {
  schedule: string;
  error: string;
}

export async function generateTrainingScheduleAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    skillLevel: formData.get("skillLevel"),
    goals: formData.get("goals"),
    historicalPerformanceData: formData.get("historicalData"),
  };

  const validationResult = TrainingScheduleInputSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    return {
      schedule: "",
      error: validationResult.error.errors.map((e) => e.message).join(", "),
    };
  }
  
  const input: TrainingScheduleInput = validationResult.data;

  try {
    const result = await generateTrainingSchedule(input);
    return {
      schedule: result.schedule,
      error: "",
    };
  } catch (e) {
    console.error(e);
    return {
      schedule: "",
      error: "Failed to generate schedule. Please try again later.",
    };
  }
}
