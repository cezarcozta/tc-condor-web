/*
  Warnings:

  - You are about to drop the `SleepEntries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SleepEntries" DROP CONSTRAINT "SleepEntries_userId_fkey";

-- DropTable
DROP TABLE "SleepEntries";

-- CreateTable
CREATE TABLE "sleep_entries" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "sleepDurationInMinutes" INTEGER NOT NULL,
    "timeToBed" TEXT NOT NULL,
    "wakesUp" INTEGER NOT NULL,
    "tookMedication" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sleep_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sleep_entries_externalId_key" ON "sleep_entries"("externalId");

-- CreateIndex
CREATE INDEX "sleep_entries_userId_createdAt_idx" ON "sleep_entries"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "sleep_entries" ADD CONSTRAINT "sleep_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
