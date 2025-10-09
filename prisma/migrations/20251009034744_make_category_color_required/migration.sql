/*
  Warnings:

  - Made the column `categoryColor` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `muscle` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `Set` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reps` on table `Set` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `VerificationToken` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Exercise" ALTER COLUMN "categoryColor" SET NOT NULL,
ALTER COLUMN "muscle" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Set" ALTER COLUMN "weight" SET NOT NULL,
ALTER COLUMN "reps" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."VerificationToken" ALTER COLUMN "userId" SET NOT NULL;
