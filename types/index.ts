import { z } from "zod";
import { setSchema, exerciseSchema } from "@/lib/validators";

export type SetType = z.infer<typeof setSchema>;
export type ExerciseType = z.infer<typeof exerciseSchema>;

export interface Set {
  id: string;
  weight: number | null;
  reps: number | null;
  exerciseId?: string;
}

export interface Exercise {
  id: string;
  userId: string;
  name: string;
  categoryColor: string;
  muscle: string;
  date: Date;
  sets: Set[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ExerciseCategory {
  id: string;
  name: string;
  muscle: string;
  color: string;
}
