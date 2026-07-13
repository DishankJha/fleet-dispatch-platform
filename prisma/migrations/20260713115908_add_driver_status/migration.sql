-- CreateEnum
CREATE TYPE "DriverStatus" AS ENUM ('AVAILABLE', 'ON_TRIP', 'OFFLINE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "DriverStatus" NOT NULL DEFAULT 'AVAILABLE';
