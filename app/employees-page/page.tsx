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
import Link from "next/link"

const EmployeePage = async () => {
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
          <Link href='/create-employee'>
            Create New Employee
          </Link>
        </Button>
        <Table>
          <TableCaption>Employees</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead> 
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee: any) => (
              <TableRow>
              <TableCell>{employee.employeeID}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.city}</TableCell>
              <TableCell>{employee.country}</TableCell>
              {/* Cannot access the position object and department object */}
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.status}</TableCell>
              <TableCell className="flex gap-4">
                <Button><Link href='/edit-employee'>Edit Employee</Link></Button>
                <Button>Generate Payslip</Button>
              </TableCell>
              
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
  )
}

export default EmployeePage