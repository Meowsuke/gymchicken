"use client";

import React from "react";
interface ExerciseCategory {
  id: string;
  name: string;
  muscle: string;
  color: string;
}

interface ExerciseSelectorProps {
  categories: ExerciseCategory[];
  onSelect: (category: ExerciseCategory) => void;
}

export const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({
  categories,
  onSelect,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-4 transition-colors duration-300">
      <h3 className="text-base font-medium mb-2 text-gray-800 dark:text-gray-100">
        種目を選択
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category)}
            className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-auto min-w-[80px]"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <div className="text-left">
              <p className="font-medium text-xs text-gray-800 dark:text-gray-100">
                {category.name}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                {category.muscle}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
