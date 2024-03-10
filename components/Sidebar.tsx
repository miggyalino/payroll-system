'use client';

import { NAVBAR_ITEMS_ADMIN, NAVBAR_ITEMS_DEPARTMENT_MANAGER, NAVBAR_ITEMS_EMPLOYEE, NAVBAR_ITEMS_PAYROLL_MANAGER } from '@/constants'
import { fetchSession } from '@/utils/fetchUtils';
import { BookUser, Building2, HandCoins, LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

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

const Sidebar = () => {

    const [session, setSession] = useState<Session | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchSession().then(session => {
            setSession(session);
        });
    }, [session]);

    const NAVBAR_ITEMS = 
    session?.user.role === 'Administrator' ? NAVBAR_ITEMS_ADMIN :
    session?.user.role === 'Payroll Manager' ? NAVBAR_ITEMS_PAYROLL_MANAGER :
    session?.user.role === 'Department Manager' ? NAVBAR_ITEMS_DEPARTMENT_MANAGER :
    session?.user.role === 'Employee' ? NAVBAR_ITEMS_EMPLOYEE : []

  return (
    <nav className="flex flex-col  text-white">
        <div className="flex items-center gap-2 p-8">
            <HandCoins size={32} color="#281cce" strokeWidth={2.25} />
            <h1 className="text-lg font-bold">Payroll Management</h1>
        </div>
        <div className="flex flex-col justify-center gap-5 px-10 py-10">
            {NAVBAR_ITEMS.map((item) => (
            <div className="flex flex-row justify-between items-center">
            {item.icon === 'dashboard-icon' ? <LayoutGrid size={20}/> : 
                item.icon === 'company-icon' ? <Building2 size={20}/> : 
                item.icon === 'employee-icon' ? <BookUser size={20}/> : 
                item.icon === 'payroll-icon' ? <HandCoins size={20}/> : null}
            <Link href={item.href} className="text-base">
                {item.title}
            </Link>
            </div>
            ))}
        </div>
 
          </nav>
  )
}

export default Sidebar