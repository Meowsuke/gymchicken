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
    <div className="bg-white rounded-2xl p-6 mb-4">
      <h3 className="text-base font-medium mb-2">種目を選択</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category)}
            className="flex items-center gap-2 p-2 rounded-lg border hover:bg-gray-50 transition-colors flex-auto min-w-[80px]"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <div className="text-left">
              <p className="font-medium text-xs">{category.name}</p>
              <p className="text-[10px] text-gray-500">{category.muscle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
