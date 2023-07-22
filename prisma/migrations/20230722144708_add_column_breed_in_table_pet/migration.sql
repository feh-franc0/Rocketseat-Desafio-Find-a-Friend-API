/*
  Warnings:

  - You are about to drop the column `race` on the `pet` table. All the data in the column will be lost.
  - You are about to drop the column `species` on the `pet` table. All the data in the column will be lost.
  - Added the required column `breed` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pet" DROP COLUMN "race",
DROP COLUMN "species",
ADD COLUMN     "breed" TEXT NOT NULL;
