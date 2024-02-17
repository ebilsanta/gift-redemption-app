/*
  Warnings:

  - You are about to drop the column `redeemedAt` on the `redemption` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "redemption" DROP COLUMN "redeemedAt",
ADD COLUMN     "redeemed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "staff" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
