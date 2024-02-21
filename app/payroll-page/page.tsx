'use client';
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getPayrolls } from "@/utils/fetchUtils";
import { useEffect, useState } from "react";

  type Payroll = {
    employeeId: number;
    month: string;
    year: number;
    lastName: string;
    firstName: string;
    basicPay: number;
    incomeTax: number;
    totalEarnings: number;
    totalDeductions: number;
    netPay: number;
    position: string;
    department: string;
  };


const PayrollPage = () => {

  const [payrolls, setPayrolls] = useState<Payroll[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPayrolls();
      setPayrolls(data);
    };

    fetchData();
  }, []);

  return (
    <section>
      <Table>
          <TableCaption>Employees</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Basic Pay</TableHead>
              <TableHead>Income Tax</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Total Earnings</TableHead>
              <TableHead>Total Deductions</TableHead>
              <TableHead>Net Pay</TableHead> 
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrolls.map((payroll: any) => (
              <TableRow>
              <TableCell>{payroll.employeeId}</TableCell>
              <TableCell>{`${payroll.month}/${payroll.year}`}</TableCell>
              <TableCell>{payroll.lastName}</TableCell>
              <TableCell>{payroll.firstName}</TableCell>
              <TableCell>{payroll.basicPay}</TableCell>
              <TableCell>{payroll.incomeTax}</TableCell>
              <TableCell>{payroll.position}</TableCell>
              <TableCell>{payroll.department}</TableCell>
              <TableCell>{payroll.basicPay}</TableCell>
              <TableCell>{payroll.incomeTax}</TableCell>
              <TableCell>{payroll.netPay}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
    </section>
  )
}

export default PayrollPage