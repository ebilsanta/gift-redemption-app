/*
  Warnings:

  - You are about to drop the column `roleId` on the `staff` table. All the data in the column will be lost.
  - Added the required column `role_id` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_roleId_fkey";

-- AlterTable
ALTER TABLE "staff" DROP COLUMN "roleId",
ADD COLUMN     "role_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
