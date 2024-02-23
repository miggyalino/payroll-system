'use client';

import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const CompanyPage = () => {


  // Setting up interfaces--------------------------------------
  interface Department {
    id: string;
    name: string;
  }



  // Initializing use state hooks -----------------------------
  const [departmentName, setDepartmentName] = useState('')
  const [departments, setDepartments] = useState<Department[]>([])



  //Fetch departments-------------------------------------------------
  const fetchDepartments = async () => {

    const response = await fetch("http://localhost:3000/api/department", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setDepartments(data);
    return data;
  };


  //Client side rendering for departments dropdown---------------------
  useEffect(() => {
    fetchDepartments().catch(error => console.log(error));
  }, []);


  //Post function for adding departments--------------------------------
  const submitDepartment = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      await fetch ('http://localhost:3000/api/department', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: departmentName
        })
      })
    } catch (error){
      console.log(error);
    }
  };



  return (

    <div className='flex flex-wrap flex-row gap-4'>
      <div className='flex flex-col p-10 bg-slate-200 rounded-lg shadow-md gap-4'>
        <h2 className="font-bold text-2xl">Departments</h2>

        {/* form for adding departments */}
        <form onSubmit={submitDepartment}>
          <div className="flex gap-4">
            <input type="text" value = {departmentName} onChange={(e) => setDepartmentName(e.target.value)} className='rounded-lg'/>
            <Button type="submit">Add</Button>
          </div>
        </form> 

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Departments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department)=> (  
              <TableRow key={department.id}>
                <TableCell>{department.id}</TableCell>
                <TableCell>{department.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className='flex flex-col p-10 bg-slate-200 rounded-lg shadow-md gap-4'>
        <h2 className="font-bold text-2xl">Positions</h2>

        {/* form for adding positions */}
        <form>
          <div className="flex gap-4">
            <input type="text" className='rounded-lg'/>
            <select value={departmentName} onChange={(e) => setDepartmentName((e.target.value))} className='rounded-lg'>
              <option value="" selected>Select a department</option>
              {departments.map((department,key) => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </select>
            <Button type="submit">Add</Button>
          </div>
        </form> 

      </div>

    </div>
    





  )
}

export default CompanyPage