import { DashboardProps, Employee } from '@/types';
import { fetchUserEmployee } from '@/utils/fetchUtils';
import { useEffect, useState } from 'react'

const EmployeeDashboard = ({ session, employee }: DashboardProps) => {

  return (
    <div>
        {session && session.user && (
        <h2 className="">
          <span className="text-md font-bold">Signed in as, </span>
          <span className="text-slate-500">
            {session.user.username} - {session.user.role}
          </span>
        </h2>
        )}

        {employee && (
          <>
            <h2>Employee ID: {employee.employeeId}</h2>
            <h2>Name: {employee.lastName}, {employee.firstName} {employee.middleName}</h2>
            <h2>Department: {employee.position.department.name}</h2>
            <h2>Position: {employee.position.title}</h2>
            <h2>Contact Number: {employee.contactNumber}</h2>
            <h2>Address: {employee.zipCode} {employee.streetAddress}, {employee.barangay}, {employee.city}, {employee.province}, {employee.country}</h2>
          </>
        )}
    </div>
  )
}

export default EmployeeDashboard