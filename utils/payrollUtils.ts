import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generatePayroll(employeeId: number) {
    const employee = await prisma.employee.findUnique({
        where: {
          id: employeeId,
        },
      });
    
      // Fetch the earnings and deductions
      const earningsResponse = await fetch(`/api/employees/${employeeId}/earnings`);
      const deductionsResponse = await fetch(`/api/employees/${employeeId}/deductions`);
      const earnings = await earningsResponse.json();
      const deductions = await deductionsResponse.json();
    
      // Calculate the total earnings and deductions
      const totalEarnings = employee.basicPay + earnings.reduce((sum, earning) => sum + earning.amount, 0);
      const totalDeductions = employee.incomeTax + deductions.reduce((sum, deduction) => sum + deduction.amount, 0);
    
      // Calculate the net pay
      const netPay = totalEarnings - totalDeductions;
    
      // Create a new Payroll instance with the Employee data
      const newPayroll = await prisma.payroll.create({
        data: {
          employeeId: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          basicPay: employee.basicPay,
          incomeTax: employee.incomeTax,
          totalEarnings: totalEarnings,
          totalDeductions: totalDeductions,
          netPay: netPay,
        },
      });
    
      return newPayroll;
  }