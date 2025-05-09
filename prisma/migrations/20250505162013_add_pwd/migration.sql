-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;

-- CreateTable
CREATE TABLE "SleepDiary" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL,

    CONSTRAINT "SleepDiary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SleepDiary_externalId_key" ON "SleepDiary"("externalId");

-- CreateIndex
CREATE INDEX "User_id_name_email_idx" ON "User"("id", "name", "email");
