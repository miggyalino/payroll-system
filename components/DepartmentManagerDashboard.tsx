import { DashboardProps, Session } from '@/types'
import React from 'react'


const DepartmentManagerDashboard = ({ session, employee }: DashboardProps) => {
return (
  <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <h2 className=""><span className="text-md font-bold">Signed in as, </span><span className="text-slate-500">{session?.user.id} - {session?.user.role}</span></h2>
  </div>
)
}

export default DepartmentManagerDashboard