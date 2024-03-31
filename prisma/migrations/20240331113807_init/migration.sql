/*
  Warnings:

  - You are about to drop the column `description` on the `Leave` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Deduction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Earnings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Leave` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Payroll` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Position` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Salary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Leave" DROP COLUMN "description";

-- CreateIndex
CREATE UNIQUE INDEX "Deduction_id_key" ON "Deduction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Department_id_key" ON "Department"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Earnings_id_key" ON "Earnings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Leave_id_key" ON "Leave"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Payroll_id_key" ON "Payroll"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Position_id_key" ON "Position"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Salary_id_key" ON "Salary"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
