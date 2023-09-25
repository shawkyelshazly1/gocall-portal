/*
  Warnings:

  - The values [businessTrip,cl] on the enum `VacationReason` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VacationReason_new" AS ENUM ('business_trip', 'annual', 'casual', 'sick');
ALTER TABLE "VacationRequest" ALTER COLUMN "reason" TYPE "VacationReason_new" USING ("reason"::text::"VacationReason_new");
ALTER TYPE "VacationReason" RENAME TO "VacationReason_old";
ALTER TYPE "VacationReason_new" RENAME TO "VacationReason";
DROP TYPE "VacationReason_old";
COMMIT;
