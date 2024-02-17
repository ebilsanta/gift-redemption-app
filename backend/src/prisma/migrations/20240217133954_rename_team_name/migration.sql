/*
  Warnings:

  - You are about to drop the column `teamName` on the `redemption` table. All the data in the column will be lost.
  - You are about to drop the column `teamName` on the `staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[team_name]` on the table `redemption` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[team_name]` on the table `staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `team_name` to the `redemption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_name` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "redemption_teamName_key";

-- AlterTable
ALTER TABLE "redemption" DROP COLUMN "teamName",
ADD COLUMN     "team_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "staff" DROP COLUMN "teamName",
ADD COLUMN     "team_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "redemption_team_name_key" ON "redemption"("team_name");

-- CreateIndex
CREATE UNIQUE INDEX "staff_team_name_key" ON "staff"("team_name");
