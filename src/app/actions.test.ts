import { beforeEach, describe, expect, it, vi } from "vitest";

const generateTrainingSchedule = vi.fn();

vi.mock("@/ai/flows/adaptive-training-schedules", () => ({
  generateTrainingSchedule: (...args: unknown[]) =>
    generateTrainingSchedule(...args),
}));

import { generateTrainingScheduleAction } from "./actions";

function buildFormData(fields: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value);
  }
  return formData;
}

const validFields = {
  skillLevel: "beginner",
  goals: "Improve accuracy at 30 meters",
  historicalData: "Completed two beginner lessons so far.",
};

describe("generateTrainingScheduleAction", () => {
  beforeEach(() => {
    generateTrainingSchedule.mockReset();
  });

  it("returns a schedule when input is valid and generation succeeds", async () => {
    generateTrainingSchedule.mockResolvedValue({ schedule: "Day 1: warm up" });

    const result = await generateTrainingScheduleAction(
      { schedule: "", error: "" },
      buildFormData(validFields)
    );

    expect(generateTrainingSchedule).toHaveBeenCalledWith({
      skillLevel: "beginner",
      goals: validFields.goals,
      historicalPerformanceData: validFields.historicalData,
    });
    expect(result).toEqual({ schedule: "Day 1: warm up", error: "" });
  });

  it("rejects an invalid skill level without calling the flow", async () => {
    const result = await generateTrainingScheduleAction(
      { schedule: "", error: "" },
      buildFormData({ ...validFields, skillLevel: "expert" })
    );

    expect(generateTrainingSchedule).not.toHaveBeenCalled();
    expect(result.schedule).toBe("");
    expect(result.error).toMatch(/skillLevel|Invalid enum/i);
  });

  it("rejects goals shorter than the minimum length", async () => {
    const result = await generateTrainingScheduleAction(
      { schedule: "", error: "" },
      buildFormData({ ...validFields, goals: "short" })
    );

    expect(generateTrainingSchedule).not.toHaveBeenCalled();
    expect(result.error).toContain("Goals must be at least 10 characters long.");
  });

  it("rejects historical data shorter than the minimum length", async () => {
    const result = await generateTrainingScheduleAction(
      { schedule: "", error: "" },
      buildFormData({ ...validFields, historicalData: "new" })
    );

    expect(generateTrainingSchedule).not.toHaveBeenCalled();
    expect(result.error).toContain(
      "Historical data must be at least 10 characters long."
    );
  });

  it("returns a generic error when the flow throws", async () => {
    generateTrainingSchedule.mockRejectedValue(new Error("upstream failure"));

    const result = await generateTrainingScheduleAction(
      { schedule: "", error: "" },
      buildFormData(validFields)
    );

    expect(result).toEqual({
      schedule: "",
      error: "Failed to generate schedule. Please try again later.",
    });
  });
});
