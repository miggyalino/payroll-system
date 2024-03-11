import { Employee, Session } from '@/types';
import { fetchUserEmployee } from '@/utils/fetchUtils';
import { useEffect, useState } from 'react'


const EmployeeDashboard = ({ session }: {session: Session | null }) => {

  const [employee, setEmployee] = useState<Employee>();

  useEffect(() => {
    const fetchEmployee = async () => {
      if(session){
        const data = await fetchUserEmployee(session.user.username);
        setEmployee(data);
      }
    };

    fetchEmployee();
    console.log(employee)
  }, [session]);


  return (
    <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <h2 className=""><span className="text-md font-bold">Signed in as, </span><span className="text-slate-500">{session?.user.username} - {session?.user.role}</span></h2>
        
    </div>
  )
}

export default EmployeeDashboard