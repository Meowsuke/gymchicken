"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { Exercise, Set } from "@/types";
import { exerciseSchema, setSchema } from "@/lib/validators";

// 指定ユーザーの指定日のエクササイズ取得
export async function getExercisesByUserAndDate(userId: string, date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const data = await prisma.exercise.findMany({
    where: {
      userId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: { createdAt: "asc" },
    include: { sets: true },
  });

  return convertToPlainObject(data);
}

export async function getExercisesByUserAndMonth(
  userId: string,
  start: Date,
  end: Date
) {
  const data = await prisma.exercise.findMany({
    where: {
      userId,
      date: {
        gte: start,
        lte: end,
      },
    },
    orderBy: { createdAt: "asc" },
    include: { sets: true },
  });
  return convertToPlainObject(data);
}

export async function createExercise(userId: string, exercise: Exercise) {
  const parsedExercise = exerciseSchema.parse({
    ...exercise,
    userId,
  });
  const data = await prisma.exercise.create({
    data: {
      userId: parsedExercise.userId,
      name: parsedExercise.name,
      muscle: parsedExercise.muscle,
      categoryColor: parsedExercise.categoryColor,
      date: parsedExercise.date,
      sets: {
        create: [],
      },
    },
    include: {
      sets: true,
    },
  });
  return convertToPlainObject(data);
}

export async function deleteExercise(exerciseId: string) {
  return prisma.exercise.delete({ where: { id: exerciseId } });
}

export async function createSet(
  exerciseId: string,
  set: { weight: number; reps: number }
) {
  const parsedSet = setSchema.parse({
    ...set,
    exerciseId,
  });
  const created = await prisma.set.create({
    data: parsedSet,
  });

  return convertToPlainObject(created);
}

export async function updateSet(
  exerciseId: string,
  setId: string,
  updated: { weight?: number; reps?: number }
) {
  const updatedSet = await prisma.set.update({
    where: { id: setId },
    data: updated,
  });

  return convertToPlainObject(updatedSet);
}

export async function deleteSet(exerciseId: string, setId: string) {
  return prisma.set.delete({ where: { id: setId } });
}
