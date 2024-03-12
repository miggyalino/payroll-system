import { DashboardProps } from '@/types';
import React from 'react'


const PayrollManagerDashboard = ({ session, employee }: DashboardProps) => {
return (
  <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <h2 className=""><span className="text-md font-bold">Signed in as, </span><span className="text-slate-500">{session?.user.username} - {session?.user.role}</span></h2>
  </div>
)
}

export default PayrollManagerDashboard