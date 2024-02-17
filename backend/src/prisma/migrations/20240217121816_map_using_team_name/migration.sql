/*
  Warnings:

  - You are about to drop the column `teamId` on the `redemption` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `staff` table. All the data in the column will be lost.
  - You are about to drop the `team` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[teamName]` on the table `redemption` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamName` to the `redemption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamName` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "redemption" DROP CONSTRAINT "redemption_teamId_fkey";

-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_teamId_fkey";

-- DropIndex
DROP INDEX "redemption_teamId_key";

-- AlterTable
ALTER TABLE "redemption" DROP COLUMN "teamId",
ADD COLUMN     "teamName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "staff" DROP COLUMN "teamId",
ADD COLUMN     "teamName" TEXT NOT NULL;

-- DropTable
DROP TABLE "team";

-- CreateIndex
CREATE UNIQUE INDEX "redemption_teamName_key" ON "redemption"("teamName");

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_teamName_fkey" FOREIGN KEY ("teamName") REFERENCES "redemption"("teamName") ON DELETE RESTRICT ON UPDATE CASCADE;
