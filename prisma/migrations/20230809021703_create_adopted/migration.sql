/*
  Warnings:

  - You are about to drop the column `adopteds` on the `pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pet" DROP COLUMN "adopteds",
ADD COLUMN     "adopted" BOOLEAN NOT NULL DEFAULT false;
