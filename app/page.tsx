'use client';
import AdministratorDashboard from "@/components/AdministratorDashboard";
import DepartmentManagerDashboard from "@/components/DepartmentManagerDashboard";
import EmployeeDashboard from "@/components/EmployeeDashboard";
import PayrollManagerDashboard from "@/components/PayrollManagerDashboard";
import { fetchSession } from "@/utils/fetchUtils";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


export default function Home() {

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
  
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    fetchSession().then(session => {
      if (!session) {
        router.push('/api/auth/signin');
      } else {
        setSession(session);
      }
    });
  }, [session]);
  

  return (
    <main className="flex flex-col">

      <div>
        {
        session?.user.role === 'Administrator' ? <AdministratorDashboard session={session} /> :
        session?.user.role === 'Payroll Manager' ? <PayrollManagerDashboard session={session} /> :
        session?.user.role === 'Department Manager' ? <DepartmentManagerDashboard session={session} /> :
        session?.user.role === 'Employee' ? <EmployeeDashboard session={session} /> : null
        }
      </div>
      
    </main>
  );
}

