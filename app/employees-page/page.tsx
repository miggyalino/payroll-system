'use client';
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
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
import { fetchEmployees, fetchSession } from "@/utils/fetchUtils"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Employee, Session } from "@/types";



const handleSubmit = async (employee: Employee) => {
  try {
    const response = await fetch('/api/payroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employeeId: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        basicPay: employee.basicPay,
        incomeTax: employee.incomeTax,
        netPay: employee.basicPay - employee.incomeTax,
      }),
    });

    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }

    toast('Payroll generated successfully')
  } catch (error) {
    console.error('Error:', error);
  }
};

const EmployeePage = () => {

  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    fetchSession().then(session => {
      if (!session) {
        router.push('/api/auth/signin');
      } else if (session.user.role !== 'Administrator') {
        router.push('/');
      }
      else {
        setSession(session);
      }
    });
  }, [session]);

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };

    fetchData();
  }, []);

  return (
    session ? (
      <main>
        <div className="rounded-lg shadow-lg bg-white p-4 overflow-auto">
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
              <TableCell>{employee.employeeId}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.city}</TableCell>
              <TableCell>{employee.country}</TableCell>
              <TableCell>{employee.position.title}</TableCell>
              <TableCell>{employee.position.department.name}</TableCell>
              <TableCell>{employee.status}</TableCell>
              <TableCell className="flex gap-4">
                <Button><Link href={`/edit-employee/${employee.id}`}>Edit Employee</Link></Button>
                <Button onClick={() => handleSubmit(employee)}>Generate Payslip</Button>
              </TableCell>
              
            </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </main>
    ) : null  
  )
}

export default EmployeePage