/*
  Warnings:

  - Added the required column `employeeId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "userId" DROP DEFAULT;
DROP SEQUENCE "Employee_userId_seq";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "employeeId" INTEGER NOT NULL;
