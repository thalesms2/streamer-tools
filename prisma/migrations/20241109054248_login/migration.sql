/*
  Warnings:

  - You are about to drop the column `userName` on the `Streamer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Streamer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isAdmin` to the `Streamer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Streamer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `Streamer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Streamer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('PINK', 'DARK', 'BLACKNWHITE');

-- DropIndex
DROP INDEX "Streamer_userName_key";

-- AlterTable
ALTER TABLE "Streamer" DROP COLUMN "userName",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "theme" "Theme" NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Streamer_username_key" ON "Streamer"("username");
