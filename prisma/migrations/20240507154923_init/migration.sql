/*
  Warnings:

  - You are about to drop the column `basicPay` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Payroll` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pagibig` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `philhealth` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sss` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "basicPay",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pagibig" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "philhealth" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sss" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
