/*
  Warnings:

  - You are about to drop the column `staff_pass_id` on the `staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[staff_id]` on the table `staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleId` to the `staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staff_id` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "staff_staff_pass_id_key";

-- AlterTable
ALTER TABLE "staff" DROP COLUMN "staff_pass_id",
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD COLUMN     "staff_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staff_staff_id_key" ON "staff"("staff_id");

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
