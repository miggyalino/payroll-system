'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

// Fields: First Name, Middle Name, Last Name, Street Address, Barangay, City, Province, Country, Zip Code, Status, Department, Position, Basic Pay, Income Tax
// DropDown for Status: Active, Inactive
// CRUD Table for Earnings and Deductions
// Button: Save, Cancel
// Additional Notes: Selecting a department should populate the positions dropdown with the positions available in that department

const CreateEmployeePage = () => {

  // Setting up Interfaces
  interface Department {
    id: string;
    name: string;
  }
  
  interface Position {
    id: string;
    name: string;
    departmentId: string;
  }
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
  const [status, setStatus] = useState('Active');
  const [department, setDepartment] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [basicPay, setBasicPay] = useState<number>(0);
  const [incomeTax, setIncomeTax] = useState<number>(0);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  // Initializing Router
  const router = useRouter();

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

  
   // Send a POST request to your API to create a new employee...
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await fetch('/api/employees', {
        method: 'POST',
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
          position,
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
          
        <div className='flex'>

          {/* Name Form */}
          <div className='flex flex-col'>
            <label>
              First Name:
              <input type="text" className='border-2 rounded-full' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>
              Middle Name:
              <input type="text" className='border-2 rounded-full' value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
            </label>
            <label>
              Last Name:
              <input type="text" className='border-2 rounded-full' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
          </div>
          
          {/* Address Form */}
          <div className='flex flex-col'>
            <label>
              Street Address:
              <input type="text" className='border-2 rounded-full' value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
            </label>
            <label>
              Barangay:
              <input type="text" className='border-2 rounded-full' value={barangay} onChange={(e) => setBarangay(e.target.value)} />
            </label>
            <label>
              City:
              <input type="text" className='border-2 rounded-full' value={city} onChange={(e) => setCity(e.target.value)} />
            </label>
            <label>
              Province:
              <input type="text" className='border-2 rounded-full' value={province} onChange={(e) => setProvince(e.target.value)} />
            </label>
            <label>
              Country:
              <input type="text" className='border-2 rounded-full' value={country} onChange={(e) => setCountry(e.target.value)} />
            </label>
            <label>
              ZIP Code:
              <input type="text" className='border-2 rounded-full' value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
            </label>
          </div>
          

          {/* Employee Pay and Position Form */}
          <div className='flex flex-col'>
            <label>
              Basic Pay:
              <input type="text" className='border-2 rounded-full' value={basicPay} onChange={(e) => setBasicPay(parseFloat(e.target.value))} />
            </label>

            <label>
              Income Tax:
              <input type="text" className='border-2 rounded-full' value={incomeTax} onChange={(e) => setIncomeTax(parseFloat(e.target.value))} />
            </label>

            <label>
              Department:
              <select value={department} onChange={(e) => setDepartment(parseInt(e.target.value))}>
                <option value="" selected>Select a department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>{department.name}</option>
                ))}
              </select>
            </label>

            <label>
              Position:
              <select value={position} onChange={(e) => setPosition(parseInt(e.target.value))}>
                {/* Ignore Error It works fine */}
                {positions && positions.map((position) => (
                  <option key={position.id} value={position.id}>{position.title}</option>
                ))}
              </select>
            </label>

            <label>
              Status:
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Active">Active</option>
                <option value="Resigned">Resigned</option>
                <option value="AWOL">AWOL</option>
              </select>
            </label>

          </div>

        </div>
        
        

        {/* Add a table for earnings and deductions... */}
        <div className='flex gap-4'>
          <button type='submit'>
            Create
          </button>
          
          <Button variant='destructive'>
            <Link href='/employees-page'>
              Cancel
            </Link>
          </Button>
        </div>
        
        
      </form>
    </div>
  )
}

export default CreateEmployeePage