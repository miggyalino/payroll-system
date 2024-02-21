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

    const incomeTax = employee.incomeTax || 0; // Use a separate variable instead of trying to assign a value to employee.incomeTax
    
    // Calculate the total earnings and deductions
    const totalEarnings = employee.basicPay + earnings.reduce((sum: number, earning: { amount: number}) => sum + earning.amount, 0);
    const totalDeductions = incomeTax + deductions.reduce((sum:number, deduction: {amount: number}) => sum + deduction.amount, 0);
    
    // Calculate the net pay
    const netPay = totalEarnings - totalDeductions;
    
    const newPayroll = await prisma.payroll.create({
        data: {
          employeeId: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          basicPay: employee.basicPay,
          incomeTax: incomeTax,
          totalEarnings: totalEarnings,
          totalDeductions: totalDeductions,
          netPay: netPay,
        },
      });
    
    return newPayroll;
}