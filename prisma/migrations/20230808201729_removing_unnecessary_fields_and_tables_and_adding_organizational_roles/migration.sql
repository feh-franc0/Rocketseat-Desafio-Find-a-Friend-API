/*
  Warnings:

  - You are about to drop the `adopted` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'COMPANY');

-- DropForeignKey
ALTER TABLE "adopted" DROP CONSTRAINT "adopted_client_id_fkey";

-- DropForeignKey
ALTER TABLE "adopted" DROP CONSTRAINT "adopted_org_id_fkey";

-- DropForeignKey
ALTER TABLE "adopted" DROP CONSTRAINT "adopted_pet_id_fkey";

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'COMPANY';

-- AlterTable
ALTER TABLE "pet" ADD COLUMN     "adopteds" BOOLEAN DEFAULT false;

-- DropTable
DROP TABLE "adopted";

-- DropTable
DROP TABLE "client";
