import { hashSync } from "bcrypt-ts-edge";

export const sampleData = {
  users: [
    {
      name: "John Doe",
      email: "admin@example.com",
      password: hashSync("123456", 10),
      exercises: [
        {
          name: "Bench Press",
          categoryColor: "#FF6B6B",
          muscle: "Chest",
          date: new Date("2025-10-08"),
          sets: [
            { weight: 80, reps: 10 },
            { weight: 85, reps: 8 },
          ],
        },
        {
          name: "Squat",
          categoryColor: "#4ECDC4",
          muscle: "Legs",
          date: new Date("2025-10-07"),
          sets: [
            { weight: 100, reps: 10 },
            { weight: 110, reps: 8 },
          ],
        },
      ],
    },
    {
      name: "Jane Smith",
      email: "user@example.com",
      password: hashSync("123456", 10),
      exercises: [
        {
          name: "Deadlift",
          categoryColor: "#FFD93D",
          muscle: "Back",
          date: new Date("2025-10-06"),
          sets: [
            { weight: 90, reps: 8 },
            { weight: 95, reps: 6 },
          ],
        },
        {
          name: "Overhead Press",
          categoryColor: "#6A5ACD",
          muscle: "Shoulders",
          date: new Date("2025-10-05"),
          sets: [
            { weight: 40, reps: 10 },
            { weight: 45, reps: 8 },
          ],
        },
      ],
    },
  ],
};
