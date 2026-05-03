/*
  Warnings:

  - You are about to drop the column `heashedToken` on the `RefreshToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashedToken]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedToken` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "RefreshToken_heashedToken_key";

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "heashedToken",
ADD COLUMN     "hashedToken" TEXT NOT NULL,
ALTER COLUMN "revokeAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_hashedToken_key" ON "RefreshToken"("hashedToken");
