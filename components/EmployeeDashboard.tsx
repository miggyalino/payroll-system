import React from 'react'

type Session = {
    user: {
      username: string
      role: string
    }
    token: {
      username: string
      role: string
    }
  };

const EmployeeDashboard = ({ session }: {session: Session | null }) => {
  return (
    <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <h2 className=""><span className="text-md font-bold">Signed in as, </span><span className="text-slate-500">{session?.user.username} - {session?.user.role}</span></h2>
    </div>
  )
}

export default EmployeeDashboard