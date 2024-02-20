'use client';

import { Button } from "@/components/ui/button";
import { getEmployee } from "@/utils/fetchUtils"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'

const EditEmployeePage =  ({ params }: { params : { employeeId : number }}) => {

  // Initializing Router
  const router = useRouter();

  // Interfaces
  interface Department {
    id: string;
    name: string;
  }
  
  interface Position {
    id: string;
    name: string;
    title: string;
    departmentId: string;
  }

  type Employee = {
    employeeID: number;
    lastName: string;
    firstName: string;
    middleName: string;
    streetAddress: string;
    barangay: string;
    province: string;
    zipCode: string;
    city: string;
    country: string;
    basicPay: number;
    incomeTax: number;
    position: {
      title: string;
      department: {
        id: number;
        name: string;
      };
    };
    status: string;
  };

  // Initializing States
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [barangay, setBarangay] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [status, setStatus] = useState('');
  const [department, setDepartment] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [basicPay, setBasicPay] = useState<number>(0);
  const [incomeTax, setIncomeTax] = useState<number>(0);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [employee, setEmployee] = React.useState<Employee>();
  

  // Fetch Departments
  const fetchDepartments = async () => {
    const response = await fetch("http://localhost:3000/api/department", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    setDepartments(data);
    return data;
  };

  // fetch Positions function
  const fetchPositions = async (departmentId: number) => {
    const response = await fetch(`http://localhost:3000/api/department/${departmentId}/positions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    setPositions(data);
    return data;
  };

  // client side rendering for departments dropdown
  useEffect(() => {
    fetchDepartments().catch(error => console.log(error));
  }, []);

  // client side rendering for positions dropdown
  useEffect(() => {
    if (department) {
      fetchPositions(department).catch(error => console.log(error));
    }
  }, [department]);

  // Fetch Employee
  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmployee(params.employeeId)
      setEmployee(data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      await fetch(`/api/employees/${params.employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          middleName,
          lastName,
          streetAddress,
          barangay,
          city,
          province,
          country,
          zipCode,
          status,
          position: position ? {
            ...position,
            department: position.department ? {
              ...position.department,
              name: departmentName, // replace with your state variable for the department name
            } : undefined,
          } : undefined,
          basicPay,
          incomeTax,
        }),
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h2 className='text-xl font-bold mb-2'>{`${employee?.lastName}, ${employee?.firstName}`}</h2>
        <div className='flex gap-12 p-10 bg-slate-200 rounded-lg shadow-md'>
          {/* Name Form */}
          <div className='flex flex-col'>
            <label className='flex flex-col'>
              First Name:
              <input type="text" className='border-2 rounded-full' value={employee?.firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label className='flex flex-col'>
              Middle Name:
              <input type="text" className='border-2 rounded-full' value={employee?.middleName} onChange={(e) => setMiddleName(e.target.value)} />
            </label>
            <label className='flex flex-col'>
              Last Name:
              <input type="text" className='border-2 rounded-full' value={employee?.lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
          {/* Address Form */}
            <label className='flex flex-col'>
              Street Address:
              <input type="text" className='border-2 rounded-full' value={employee?.streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
            </label>
            <label className='flex flex-col'>
              Barangay:
              <input type="text" className='border-2 rounded-full' value={employee?.barangay} onChange={(e) => setBarangay(e.target.value)} />
            </label>
            <label className='flex flex-col'>
              City:
              <input type="text" className='border-2 rounded-full' value={employee?.city} onChange={(e) => setCity(e.target.value)} />
            </label>
            <label className='flex flex-col'>
              Province:
              <input type="text" className='border-2 rounded-full' value={employee?.province} onChange={(e) => setProvince(e.target.value)} />
            </label>
            <label className='flex flex-col'>
              Country:
              <input type="text" className='border-2 rounded-full' value={employee?.country} onChange={(e) => setCountry(e.target.value)} />
            </label>
            <label className='flex flex-col'>
              ZIP Code:
              <input type="text" className='border-2 rounded-full' value={employee?.zipCode} onChange={(e) => setZipCode(e.target.value)} />
            </label>
          </div>

          {/* Employee Pay and Position Form */}
          <div className='flex flex-col'>
            <label className='flex flex-col'>
              Basic Pay:
              <input type="text" className='border-2 rounded-full' value={employee?.basicPay} onChange={(e) => setBasicPay(parseFloat(e.target.value))} />
            </label>

            <label className='flex flex-col'>
              Income Tax:
              <input type="text" className='border-2 rounded-full' value={employee?.incomeTax} onChange={(e) => setIncomeTax(parseFloat(e.target.value))} />
            </label>

            <label className='flex flex-col'>
              Department:
              <select value={department} onChange={(e) => setDepartment(parseInt(e.target.value))}>
                <option value={employee?.position.department.name} selected>{employee?.position.department.name}</option>
                {departments.map((department,key) => (
                  <option key={department.id} value={department.id}>{department.name}</option>
                ))}
              </select>
            </label>

            <label className='flex flex-col'>
              Position:
              <select value={position} onChange={(e) => setPosition(parseInt(e.target.value))}>
              <option key={employee?.position.id} value={employee?.position.id}>{employee?.position.title}</option>
                {positions && positions.map((position,key) => (
                  <option key={position.id} value={position.id}>{position.title}</option>
                ))}
              </select>
            </label>

            <label className='flex flex-col'>
              Status:
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Active">Active</option>
                <option value="Resigned">Resigned</option>
                <option value="AWOL">AWOL</option>
              </select>
            </label>
          </div>

          {/* Earnings Table*/}
          <div>
             <h2 className='font-bold text-lg'>Earnings</h2>     
          </div>

          {/* Deductions Table*/}
          <div>
            <h2 className='font-bold text-lg'>Deductions</h2>      
          </div>
        </div>
        
        

        {/* Add a table for earnings and deductions... */}
        <div className='flex gap-4 mt-4'>
          <Button type='submit'>
            Save Changes
          </Button>
          
          <Link href='/employees-page'>
            <Button>
              Back to Employees Page
            </Button>
          </Link>
          
        </div>
        
        
      </form>
    </div>
  )
}

export default EditEmployeePage