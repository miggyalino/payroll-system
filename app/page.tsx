import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export default async function Home() {

  const fetchEmployees = await fetch("http://localhost:3000/api/employees", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const employees = await fetchEmployees.json()

  return (
    <main>
      <Button>
        Create New Employee
      </Button>
      <Table>
        <TableCaption>Employees</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Status</TableHead> 
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee: any) => (
            <TableRow>
            <TableCell className="font-medium">{employee.employeeID}</TableCell>
            <TableCell>{employee.lastName}</TableCell>
            <TableCell>{employee.firstName}</TableCell>
            <TableCell>{employee.status}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>

      

    </main>
  );
}

