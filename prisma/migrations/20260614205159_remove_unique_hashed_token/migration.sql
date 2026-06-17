/*
  Warnings:

  - Made the column `name` on table `Presentation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "RefreshToken_hashedToken_key";

-- AlterTable
ALTER TABLE "Presentation" ALTER COLUMN "name" SET NOT NULL;
