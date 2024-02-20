'use client';

import { getEmployee } from "@/utils/fetchUtils"
import React, { useEffect } from 'react'

const EditEmployeePage =  ({ params }: { params : { employeeId : number }}) => {

  type Employee = {
    employeeID: number;
    lastName: string;
    firstName: string;
    city: string;
    country: string;
    position: {
      title: string;
      department: {
        name: string;
      };
    };
    status: string;
  };

  const [employee, setEmployee] = React.useState<Employee>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmployee(params.employeeId)
      setEmployee(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Edit Employee</h1>
      <form>
        <label>
          First Name:
          <input type="text" value={employee?.firstName} />
        </label>
        <label>
          Last Name:
          <input type="text" value={employee?.lastName} />
        </label>
        <label>
          City:
          <input type="text" value={employee?.city} />
        </label>
        <label>
          Country:
          <input type="text" value={employee?.country} />
        </label>
        <label>
          Position:
          <input type="text" value={employee?.position.title} />
        </label>
        <label>
          Department:
          <input type="text" value={employee?.position.department.name} />
        </label>
        <label>
          Status:
          <input type="text" value={employee?.status} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default EditEmployeePage