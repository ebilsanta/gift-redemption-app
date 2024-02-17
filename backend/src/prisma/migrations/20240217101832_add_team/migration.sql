/*
  Warnings:

  - You are about to drop the column `team_name` on the `redemption` table. All the data in the column will be lost.
  - You are about to drop the column `team_name` on the `staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teamId]` on the table `redemption` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamId` to the `redemption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "redemption_team_name_key";

-- AlterTable
ALTER TABLE "redemption" DROP COLUMN "team_name",
ADD COLUMN     "teamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "staff" DROP COLUMN "team_name",
ADD COLUMN     "teamId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "team_name" TEXT NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "team_team_name_key" ON "team"("team_name");

-- CreateIndex
CREATE UNIQUE INDEX "redemption_teamId_key" ON "redemption"("teamId");

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "redemption" ADD CONSTRAINT "redemption_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
