"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Dumbbell } from "lucide-react";

interface WorkoutCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  workoutDates?: Date[];
}

export const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({
  selectedDate,
  onDateSelect,
  workoutDates,
}) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  });

  // 月の日数と初日曜日を取得
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0=日曜
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  // カレンダーの日付要素を作成
  const days: React.ReactNode[] = [];

  // 空セル
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-12 w-12" />);
  }

  // 日付ボタン
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const isSelected = date.toDateString() === selectedDate.toDateString();
    const isWorkoutDay = workoutDates?.some(
      (d) => d.toDateString() === date.toDateString()
    );
    days.push(
      <button
        key={day}
        onClick={() => onDateSelect(date)}
        className={`relative h-12 w-12 rounded-full flex items-center justify-center text-base transition-colors duration-200
      ${
        isSelected
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
      >
        {day}
        {isWorkoutDay && (
          <Dumbbell
            size={20}
            className="absolute bottom-1 right-1 text-red-500"
          />
        )}
      </button>
    );
  }

  const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-4 transition-colors duration-300">
      {/* 月タイトルとナビゲーション */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
          {currentMonth.getFullYear()}年 {monthNames[currentMonth.getMonth()]}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1,
                  1
                )
              )
            }
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <ChevronLeft
              size={20}
              className="text-gray-700 dark:text-gray-300"
            />
          </button>
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1,
                  1
                )
              )
            }
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <ChevronRight
              size={20}
              className="text-gray-700 dark:text-gray-300"
            />
          </button>
        </div>
      </div>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-center text-sm text-gray-500 dark:text-gray-400 justify-items-center">
        <div>日</div>
        <div>月</div>
        <div>火</div>
        <div>水</div>
        <div>木</div>
        <div>金</div>
        <div>土</div>
      </div>

      {/* 日付グリッド */}
      <div className="grid grid-cols-7 gap-1 justify-items-center">
        {days.map((dayNode, index) => (
          <div key={index}>{dayNode}</div>
        ))}
      </div>
    </div>
  );
};
