import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generatePayroll(employeeId: number) {
    const employee = await prisma.employee.findUnique({
        where: {
          id: employeeId,
        },
      });

      if (!employee) {
        throw new Error('Employee not found');
    }
    
      // Fetch the earnings and deductions
      const earningsResponse = await fetch(`localhost:3000/api/employees/${employeeId}/earnings`);
      const deductionsResponse = await fetch(`localhost:3000/api/employees/${employeeId}/deductions`);
      const earnings = await earningsResponse.json();
      const deductions = await deductionsResponse.json();

      if(employee.incomeTax === null){
        employee.incomeTax = 0;
      }
    
      // Calculate the total earnings and deductions
      const totalEarnings = employee.basicPay + earnings.reduce((sum: number, earning: { amount: number}) => sum + earning.amount, 0);
      const totalDeductions = (employee.incomeTax || 0) + deductions.reduce((sum:number, deduction: {amount: number}) => sum + deduction.amount, 0);
    
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