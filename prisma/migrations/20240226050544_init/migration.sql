/*
  Warnings:

  - You are about to drop the column `userId` on the `Employee` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Employee_userId_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "userId";
