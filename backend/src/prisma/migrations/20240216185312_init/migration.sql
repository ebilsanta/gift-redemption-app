-- CreateTable
CREATE TABLE "staff_team" (
    "id" SERIAL NOT NULL,
    "staff_pass_id" TEXT NOT NULL,
    "team_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staff_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "redemption" (
    "id" SERIAL NOT NULL,
    "team_name" TEXT NOT NULL,
    "redeemedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "redemption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staff_team_staff_pass_id_key" ON "staff_team"("staff_pass_id");

-- CreateIndex
CREATE UNIQUE INDEX "redemption_team_name_key" ON "redemption"("team_name");
