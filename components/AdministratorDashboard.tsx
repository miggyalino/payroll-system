import { DashboardProps } from '@/types';
import React from 'react'


const AdministratorDashboard = ({ session, employee }: DashboardProps) => {
return (
  <div>
      <div className='mb-4'>
        {session && session.user && (
          <h2 className="">
            <span className="text-md font-bold">Signed in as, </span>
            <span className="text-slate-500">
              {session.user.username} - {session.user.role}
            </span>
          </h2>
          )}
      </div>
        
        <div className='flex flex-col gap-1 p-5 bg-slate-200 rounded-lg shadow-md h-full'>
          <h2 className='text-2xl font-bold'>My Details</h2>
            {employee && (
                <>
                  <h2><span className='font-bold'>Employee ID:</span> {employee.employeeId}</h2>
                  <h2><span className='font-bold'>Name:</span> {employee.lastName}, {employee.firstName} {employee.middleName}</h2>
                  <h2><span className='font-bold'>Department:</span> {employee.position.department.name}</h2>
                  <h2><span className='font-bold'>Position:</span> {employee.position.title}</h2>
                  <h2><span className='font-bold'>Contact Number:</span> {employee.contactNumber}</h2>
                  <h2><span className='font-bold'>Address:</span> {employee.zipCode} {employee.streetAddress}, {employee.barangay}, {employee.city}, {employee.province}, {employee.country}</h2>
                </>
              )}
        </div>
      </div>
)
}

export default AdministratorDashboard