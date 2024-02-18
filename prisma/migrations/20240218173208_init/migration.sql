/*
  Warnings:

  - A unique constraint covering the columns `[payrollNumber]` on the table `Payroll` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `basicPay` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incomeTax` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netPay` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - The required column `payrollNumber` was added to the `Payroll` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `totalDeductions` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalEarnings` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payroll" ADD COLUMN     "basicPay" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "incomeTax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "netPay" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "payrollNumber" TEXT NOT NULL,
ADD COLUMN     "totalDeductions" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalEarnings" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payroll_payrollNumber_key" ON "Payroll"("payrollNumber");
