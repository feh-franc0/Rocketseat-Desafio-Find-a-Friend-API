/*
  Warnings:

  - You are about to drop the column `id_org` on the `adopted` table. All the data in the column will be lost.
  - You are about to drop the column `id_pet` on the `adopted` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `adopted` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `adopted` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pet_id` to the `adopted` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adopted" DROP COLUMN "id_org",
DROP COLUMN "id_pet",
ADD COLUMN     "client_id" TEXT NOT NULL,
ADD COLUMN     "org_id" TEXT NOT NULL,
ADD COLUMN     "pet_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pet" ADD COLUMN     "org_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adopted" ADD CONSTRAINT "adopted_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adopted" ADD CONSTRAINT "adopted_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adopted" ADD CONSTRAINT "adopted_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
