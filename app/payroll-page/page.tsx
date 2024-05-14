"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { Payroll } from "@/types";
import { getPayrolls } from "@/utils/fetchUtils";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    <Card className="p-4">
      <Table>
        <TableCaption>Employees</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Payroll Period</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Department</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrolls.map((payroll: any) => (
            <TableRow>
              <TableCell>{payroll.employeeId}</TableCell>
              <TableCell>{payroll.createdAt}</TableCell>
              <TableCell>{payroll.employee.lastName}</TableCell>
              <TableCell>{payroll.employee.firstName}</TableCell>
              <TableCell>{payroll.employee.position.title}</TableCell>
              <TableCell>{payroll.employee.position.department.name}</TableCell>
              <TableCell>
                <Link href={`/payroll-page/${payroll.id}`}>
                  <Button>View Payslip</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default PayrollPage;
