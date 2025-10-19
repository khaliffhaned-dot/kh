"use client";

import { useActionState } from "react";
import { generateTrainingScheduleAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dumbbell, Loader2, Target, Trophy } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const initialState = {
  schedule: "",
  error: "",
};

export function TrainingForm() {
  const [state, formAction, isPending] = useActionState(
    generateTrainingScheduleAction,
    initialState
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card className="bg-secondary border-border">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">
            Your Training Input
          </CardTitle>
          <CardDescription>
            Provide your current status and goals.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="skillLevel" className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-primary" />
                Skill Level
              </Label>
              <Select name="skillLevel" required>
                <SelectTrigger id="skillLevel" className="w-full">
                  <SelectValue placeholder="Select your skill level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="goals" className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                Training Goals
              </Label>
              <Textarea
                id="goals"
                name="goals"
                placeholder="e.g., Improve accuracy at 50m, prepare for a competition in 3 months, master a consistent release."
                required
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="historicalData" className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Historical Performance
              </Label>
              <Textarea
                id="historicalData"
                name="historicalData"
                placeholder="e.g., 'Last 5 sessions: Average score of 7.5 at 30m. Struggle with grouping arrows on the left.' or 'New archer, completed 2 beginner lessons.'"
                required
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending} className="w-full font-bold">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Schedule"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Card className="bg-secondary border-border">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">
            Your AI-Generated Schedule
          </CardTitle>
          <CardDescription>
            Follow this plan to reach your goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPending && (
             <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          )}
          {state?.error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          {state?.schedule && (
            <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white prose-strong:text-primary whitespace-pre-wrap">
              {state.schedule}
            </div>
          )}
          {!isPending && !state?.error && !state?.schedule && (
             <div className="flex items-center justify-center text-center text-muted-foreground h-64">
                <p>Your generated training schedule will appear here.</p>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
