/*
  Warnings:

  - You are about to drop the `staff_team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "staff_team";

-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "staff_pass_id" TEXT NOT NULL,
    "team_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staff_staff_pass_id_key" ON "staff"("staff_pass_id");
