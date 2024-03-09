'use client';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

const fetchSession = async () => {
  const session = await fetch('http://localhost:3000/api/session', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await session.json();
  return data;
}

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
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <h2 className=""><span className="text-md font-bold">Signed in as, </span><span className="text-slate-500">{session?.user.username} - {session?.user.role}</span></h2>
      </div>

      <div className="flex">
        <div>

        </div>
      </div>
      
    </main>
  );
}

