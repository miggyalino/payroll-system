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
import { useRouter } from 'next/navigation';


const CompanyPage = () => {


  // Setting up interfaces--------------------------------------
  interface Department {
    id: string;
    name: string;
  }
  interface Position {
    id: string;
    title: string;
  }



  // Initializing use state hooks -----------------------------
  const [departmentName, setDepartmentName] = useState('')
  const [departments, setDepartments] = useState<Department[]>([])
  const [departmentDropDown, setDepartmentDropDown] = useState<number>()

  const [positionName, setPositionName] = useState('')
  const [positions, setPositions] = useState<Position[]>([])

  const router = useRouter()



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

  //Fetch positions-------------------------------------------------
  const fetchPositions = async (departmentID: number) => {

    const response = await fetch(`http://localhost:3000/api/department/${departmentID}/positions`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setPositions(data);
    return data;
  };


  //Client side rendering for departments dropdown---------------------
  useEffect(() => {
    fetchDepartments().catch(error => console.log(error));
  }, []);

  //Client side rendering for positions dropdown-----------------------
  useEffect(() => {
    if (departmentDropDown) {
      fetchPositions(departmentDropDown).catch(error => console.log(error));
    }
  }, [departmentDropDown]);


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
      router.refresh();
    } catch (error){
      console.log(error);
    }
  };

    //Post function for adding position--------------------------------
    const submitPosition = async (event: React.FormEvent<HTMLFormElement>) => {
      try {
        await fetch (`http://localhost:3000/api/department/${departmentDropDown}/positions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: positionName
          })
        })
        router.refresh();
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
            <input type="text" value = {departmentName} onChange={(e) => setDepartmentName(e.target.value)} className='rounded-lg px-2'/>
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
        <form onSubmit={submitPosition}>
          <div className="flex gap-4">
            <input type="text" value = {positionName} onChange={(e) => setPositionName(e.target.value)} className='rounded-lg px-2'/>
            <select value={departmentDropDown} onChange={(e) => setDepartmentDropDown(parseInt(e.target.value))} className='rounded-lg'>
              <option value="" selected>Select department</option>
              {departments.map((department,key) => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </select>
            <Button type="submit">Add</Button>
          </div>
        </form> 

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Positions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position)=> (  
              <TableRow key={position.id}>
                <TableCell>{position.id}</TableCell>
                <TableCell>{position.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>

    </div>
    





  )
}

export default CompanyPage