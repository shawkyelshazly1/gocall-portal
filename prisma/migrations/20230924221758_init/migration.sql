-- CreateEnum
CREATE TYPE "VacationRequestStatus" AS ENUM ('pending', 'approved', 'denied');

-- CreateEnum
CREATE TYPE "VacationReason" AS ENUM ('businessTrip', 'annual', 'cl', 'sick');

-- AlterEnum
ALTER TYPE "Position" ADD VALUE 'it';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "vacationBalance" INTEGER NOT NULL DEFAULT 21;

-- CreateTable
CREATE TABLE "VacationRequest" (
    "id" SERIAL NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "reason" "VacationReason" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvalStatus" "VacationRequestStatus" NOT NULL DEFAULT 'pending',
    "userId" INTEGER NOT NULL,
    "approvedBy" INTEGER,

    CONSTRAINT "VacationRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VacationRequest" ADD CONSTRAINT "VacationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacationRequest" ADD CONSTRAINT "VacationRequest_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
