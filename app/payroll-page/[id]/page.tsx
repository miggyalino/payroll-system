import { Card } from "@/components/ui/card";
import prisma from "@/prisma/client";
import {
  fetchPayrollDetail,
  getDeductions,
  getEarnings,
} from "@/utils/fetchUtils";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Deduction, Earning } from "@/types";

const PayrollDetail = async ({ params }: { params: { id: number } }) => {
  const payrollData = await fetchPayrollDetail(params.id);
  const earnings = await getEarnings(payrollData.employeeId);
  const deductions = await getDeductions(payrollData.employeeId);
  return (
    <div className="flex flex-col w-[1000px]">
      <p className="font-bold text-2xl">Employee Payslip</p>
      <Card className="p-4 mt-2">
        <p>
          <span className="font-bold">Name: </span>{" "}
          {payrollData.employee.lastName}, {payrollData.employee.firstName}
        </p>
        <p>
          <span className="font-bold">Start Date: </span>
          {payrollData.startDate.split("T")[0]}
        </p>
        <p>
          <span className="font-bold">End Date: </span>
          {payrollData.endDate.split("T")[0]}
        </p>
        <p>
          <span className="font-bold">Department: </span>
          {payrollData.employee.position.department.name}
        </p>
        <p>
          <span className="font-bold">Position: </span>
          {payrollData.employee.position.title}
        </p>
      </Card>
      <div className="flex">
        <Card className="mt-2 p-4 w-[500px]">
          <p className="font-bold text-xl">Earnings</p>
          <Table>
            <TableCaption>Additional Earnings</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {earnings?.map((earning: Earning) => (
                <TableRow>
                  <TableCell>{earning.earningType}</TableCell>
                  <TableCell>{earning.value}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Total Earnings</TableCell>
                <TableCell>{payrollData.totalEarnings}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
        <Card className="mt-2 p-4 w-[500px]">
          <p className="font-bold text-xl">Deductions</p>
          <Table>
            <TableCaption>Additional Deductions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deductions?.map((deduction: Deduction) => (
                <TableRow>
                  <TableCell>{deduction.deductionType}</TableCell>
                  <TableCell>{deduction.value}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Total Deductions</TableCell>
                <TableCell>{payrollData.totalDeductions}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
      <Card className="mt-2 p-4 w-[1000px]">
        <p className="font-bold text-xl">Government Taxes</p>
        <Table>
          <TableCaption>Employees</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Income Tax</TableCell>
              <TableCell>PHP {payrollData.incomeTax}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SSS</TableCell>
              <TableCell>PHP {payrollData.sss}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pag-ibig</TableCell>
              <TableCell>PHP {payrollData.pagibig}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PhilHealth</TableCell>
              <TableCell>PHP {payrollData.philhealth}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Total Taxes</TableCell>
              <TableCell className="font-bold">
                PHP{" "}
                {payrollData.philhealth +
                  payrollData.sss +
                  payrollData.pagibig +
                  payrollData.incomeTax}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <Card className="mt-4">
        <p className="font-bold text-xl">
          Net Pay: <span>PHP {payrollData.netPay}</span>
        </p>
      </Card>
    </div>
  );
};

export default PayrollDetail;
