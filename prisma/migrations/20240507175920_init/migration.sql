/*
  Warnings:

  - You are about to drop the column `month` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Payroll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "month",
DROP COLUMN "year";
