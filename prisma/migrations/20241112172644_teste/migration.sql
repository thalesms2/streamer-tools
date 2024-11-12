-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Theme" ADD VALUE 'HANNA';
ALTER TYPE "Theme" ADD VALUE 'SATO';

-- AlterTable
ALTER TABLE "Streamer" ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "font" TEXT;
