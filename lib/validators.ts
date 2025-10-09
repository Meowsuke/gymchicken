import { z } from "zod";

// Schema for signing in a user
export const signInFormSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(3, "Email must be at least 3 characters"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

// Schema for signing up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name msut be at least 3 characters"),
    email: z
      .string()
      .email("Invalid email address")
      .min(3, "Email must be at least 3 characters"),
    password: z.string().min(3, "Password must be at least 3 characters"),
    confirmPassword: z
      .string()
      .min(3, "Confirm password must be at least 3 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Update Profile Schema
export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().min(3, "Email must be at least 3 characters"),
});

// ===============================
// Exercise / Set Schemas
// ===============================
export const setSchema = z.object({
  exerciseId: z.string().min(1, "Exercise ID is required"),
  weight: z.number().min(0, "Weight must be non-negative"),
  reps: z.number().min(0, "Reps must be non-negative"),
});

export const exerciseSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  name: z.string().min(1, "Exercise name is required"),
  categoryColor: z.string().min(1, "Category color is required"),
  muscle: z.string().min(1, "Muscle group is required"),
  date: z.date(),
  sets: z.array(setSchema),
});
