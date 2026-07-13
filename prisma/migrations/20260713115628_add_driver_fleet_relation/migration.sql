-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fleetId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fleetId_fkey" FOREIGN KEY ("fleetId") REFERENCES "Fleet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
