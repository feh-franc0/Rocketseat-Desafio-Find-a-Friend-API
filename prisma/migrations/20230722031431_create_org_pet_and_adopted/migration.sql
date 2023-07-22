/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "species" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "feature" TEXT NOT NULL,

    CONSTRAINT "pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adopted" (
    "id" TEXT NOT NULL,
    "id_pet" TEXT NOT NULL,
    "id_org" TEXT NOT NULL,
    "was_adopted" BOOLEAN NOT NULL,

    CONSTRAINT "adopted_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");
