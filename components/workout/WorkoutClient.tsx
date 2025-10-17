"use client";

import React, { useEffect, useState } from "react";
import { WorkoutCalendar } from "./WorkoutCalendar";
import { ExerciseSelector } from "./ExerciseSelector";
import { Exercise, ExerciseCategory, Set } from "@/types";
import { sampleExercises } from "@/db/sample-category-data";
import * as exerciseActions from "@/lib/actions/exercise.actions";
import { Plus, Trash2, Pencil, ChevronUp, ChevronDown } from "lucide-react";

interface Props {
  userId: string;
}

const WorkoutClient: React.FC<Props> = ({ userId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthExercises, setMonthExercises] = useState<Exercise[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [openExerciseId, setOpenExerciseId] = useState<string | null>(null);

  const [newSetInputs, setNewSetInputs] = useState<{
    [exerciseId: string]: { weight: string; reps: string };
  }>({});

  const [editingSet, setEditingSet] = useState<{
    exerciseId: string;
    setId: string;
  } | null>(null);
  const [editSetInputs, setEditSetInputs] = useState<{
    weight: number | "";
    reps: number | "";
  }>({ weight: "", reps: "" });

  useEffect(() => {
    const selectedMonth = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}`;

    const updateExercises = async () => {
      if (selectedMonth === currentMonth) {
        setExercises(
          monthExercises.filter(
            (ex) =>
              new Date(ex.date).toDateString() === selectedDate.toDateString()
          )
        );
        return;
      }

      const start = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      );
      const end = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      );

      const data = await exerciseActions.getExercisesByUserAndMonth(
        userId,
        start,
        end
      );
      setMonthExercises(data);
      setCurrentMonth(selectedMonth);
      setExercises(
        data.filter(
          (ex) =>
            new Date(ex.date).toDateString() === selectedDate.toDateString()
        )
      );
    };

    updateExercises();
  }, [selectedDate, userId]);

  const createExercise = async (category: ExerciseCategory) => {
    const newExercise: Exercise = {
      id: `ex-${Date.now()}`,
      userId,
      name: category.name,
      categoryColor: category.color,
      muscle: category.muscle,
      date: selectedDate,
      sets: [],
    };
    const response = await exerciseActions.createExercise(userId, newExercise);
    setExercises([...exercises, response]);
  };

  const deleteExerciseById = async (exerciseId: string) => {
    await exerciseActions.deleteExercise(exerciseId);
    setExercises(exercises.filter((ex) => ex.id !== exerciseId));
  };

  const createSetById = async (
    exerciseId: string,
    set: { weight: number; reps: number }
  ) => {
    if (set.weight <= 0 || set.reps <= 0) return;
    const created = await exerciseActions.createSet(exerciseId, set);
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, sets: [...ex.sets, created] } : ex
      )
    );
  };

  const editSetById = async (
    exerciseId: string,
    setId: string,
    updated: { weight?: number; reps?: number }
  ) => {
    const updatedSet: Set = await exerciseActions.updateSet(
      exerciseId,
      setId,
      updated
    );
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((s) =>
                s.id === setId ? { ...s, ...updatedSet } : s
              ),
            }
          : ex
      )
    );
    setEditingSet(null);
    setEditSetInputs({ weight: "", reps: "" });
  };

  const deleteSetById = async (exerciseId: string, setId: string) => {
    await exerciseActions.deleteSet(exerciseId, setId);
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? { ...ex, sets: ex.sets.filter((s) => s.id !== setId) }
          : ex
      )
    );
  };

  const handleNewSetInputChange = (
    exerciseId: string,
    field: "weight" | "reps",
    value: string
  ) => {
    setNewSetInputs((prev) => ({
      ...prev,
      [exerciseId]: { ...prev[exerciseId], [field]: value },
    }));
  };

  const handleEditSetStart = (exerciseId: string, set: Set) => {
    setEditingSet({ exerciseId, setId: set.id });
    setEditSetInputs({ weight: set.weight || "", reps: set.reps || "" });
  };

  const handleEditSetConfirm = async () => {
    if (!editingSet) return;
    await editSetById(editingSet.exerciseId, editingSet.setId, {
      weight: Number(editSetInputs.weight),
      reps: Number(editSetInputs.reps),
    });
  };

  return (
    <div className="px-2 sm:px-4 pt-4 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <WorkoutCalendar
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        workoutDates={monthExercises.map((ex) => new Date(ex.date))}
      />
      <ExerciseSelector
        categories={sampleExercises}
        onSelect={createExercise}
      />

      {exercises.length > 0 ? (
        exercises.map((exercise) => (
          <div key={exercise.id} className="mb-6">
            <div
              className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() =>
                setOpenExerciseId(
                  openExerciseId === exercise.id ? null : exercise.id
                )
              }
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {exercise.categoryColor && (
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: exercise.categoryColor }}
                    />
                  )}
                  <h4 className="font-semibold text-base sm:text-lg text-gray-800 dark:text-gray-100 break-words">
                    {exercise.name}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {exercise.muscle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteExerciseById(exercise.id);
                  }}
                  className="p-1.5 text-red-500 hover:text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-gray-700 transition"
                >
                  <Trash2 size={18} />
                </button>

                {openExerciseId === exercise.id ? (
                  <ChevronUp
                    size={20}
                    className="text-gray-500 dark:text-gray-300"
                  />
                ) : (
                  <ChevronDown
                    size={20}
                    className="text-gray-500 dark:text-gray-300"
                  />
                )}
              </div>
            </div>

            {openExerciseId === exercise.id && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-b-xl mt-2 px-3 sm:px-4 py-3 space-y-3 border border-gray-100 dark:border-gray-700 shadow-inner">
                {exercise.sets.length > 0 ? (
                  exercise.sets.map((set, i) => (
                    <div
                      key={set.id}
                      className="bg-white dark:bg-gray-800 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition"
                    >
                      {editingSet?.exerciseId === exercise.id &&
                      editingSet?.setId === set.id ? (
                        <div className="flex flex-col sm:flex-row items-center gap-3 flex-1 w-full">
                          <input
                            type="number"
                            value={editSetInputs.weight}
                            onChange={(e) =>
                              setEditSetInputs((inputs) => ({
                                ...inputs,
                                weight: Number(e.target.value),
                              }))
                            }
                            className="w-full sm:w-24 px-3 py-1.5 border rounded-md text-sm text-center dark:bg-gray-700 dark:border-gray-600"
                            placeholder="kg"
                          />
                          <input
                            type="number"
                            value={editSetInputs.reps}
                            onChange={(e) =>
                              setEditSetInputs((inputs) => ({
                                ...inputs,
                                reps: Number(e.target.value),
                              }))
                            }
                            className="w-full sm:w-24 px-3 py-1.5 border rounded-md text-sm text-center dark:bg-gray-700 dark:border-gray-600"
                            placeholder="reps"
                          />
                          <button
                            onClick={handleEditSetConfirm}
                            className="px-3 py-1.5 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                          >
                            保存
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 flex-1 text-sm">
                          <span className="font-medium text-gray-800 dark:text-gray-100">
                            {i + 1}セット目
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {set.weight} kg
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {set.reps} 回
                          </span>
                          <button
                            onClick={() => handleEditSetStart(exercise.id, set)}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <Pencil size={18} />
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() => deleteSetById(exercise.id, set.id)}
                        className="text-red-500 hover:text-red-600 mt-2 sm:mt-0 sm:ml-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
                    セットがまだありません。
                  </p>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <input
                    type="number"
                    placeholder="重量 (kg)"
                    value={newSetInputs[exercise.id]?.weight ?? ""}
                    onChange={(e) =>
                      handleNewSetInputChange(
                        exercise.id,
                        "weight",
                        e.target.value
                      )
                    }
                    className="w-full sm:w-24 px-3 py-1.5 border rounded-md text-sm text-center focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="number"
                    placeholder="回数"
                    value={newSetInputs[exercise.id]?.reps ?? ""}
                    onChange={(e) =>
                      handleNewSetInputChange(
                        exercise.id,
                        "reps",
                        e.target.value
                      )
                    }
                    className="w-full sm:w-24 px-3 py-1.5 border rounded-md text-sm text-center focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600"
                  />

                  <button
                    onClick={() => {
                      const weight = Number(newSetInputs[exercise.id]?.weight);
                      const reps = Number(newSetInputs[exercise.id]?.reps);
                      if (!weight || !reps) return;
                      createSetById(exercise.id, { weight, reps });
                      setNewSetInputs((prev) => ({
                        ...prev,
                        [exercise.id]: { weight: "", reps: "" },
                      }));
                    }}
                    className="flex items-center justify-center gap-1 w-full sm:w-auto px-3 py-1.5 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition"
                  >
                    <Plus size={16} />
                    追加
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400 mt-4 text-center">
          この日の記録はありません。
        </p>
      )}
    </div>
  );
};

export default WorkoutClient;
