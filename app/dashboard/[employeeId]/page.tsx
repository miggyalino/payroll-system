'use client';

import AdministratorDashboard from '@/components/AdministratorDashboard';
import DepartmentManagerDashboard from '@/components/DepartmentManagerDashboard';
import EmployeeDashboard from '@/components/EmployeeDashboard';
import PayrollManagerDashboard from '@/components/PayrollManagerDashboard';
import { Employee, Session } from '@/types';
import { fetchSession, fetchUserEmployee } from '@/utils/fetchUtils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Dashboard = ({ params } : { params: { employeeId: number }}) => {

    const [session, setSession] = useState<Session | null>(null);
    const [employee, setEmployee] = useState<Employee>();
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

    useEffect(() => {
        fetchUserEmployee(params.employeeId).then(employee => {
            setEmployee(employee);
        });
    }, []);
    
  return (
    <div>
        {
        session?.user.role === 'Administrator' ? <AdministratorDashboard session={session} employee={employee} /> :
        session?.user.role === 'Payroll Manager' ? <PayrollManagerDashboard session={session} employee={employee} /> :
        session?.user.role === 'Department Manager' ? <DepartmentManagerDashboard session={session} employee={employee} /> :
        session?.user.role === 'Employee' ? <EmployeeDashboard session={session} employee={employee} /> : null
        }
    </div>
  )
}

export default Dashboard