'use client';

import { fetchSession } from "@/utils/fetchUtils";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";


export default function Home() {

  const router = useRouter();
  
  useEffect(() => {
    fetchSession().then(session => {
      if (!session) {
        router.push('/api/auth/signin');
      } else {
        router.push(`/dashboard/${session.user.id}`)
      }
    });
  }, []);
  

  return (
    <main className="flex flex-col">
    </main>
  );
}

