import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <h2 className=""><span className="text-md font-bold">Signed in as, </span><span className="text-slate-500">{session?.user.username}</span></h2>
      </div>

      <div className="flex">
        <div>

        </div>
      </div>
      
    </main>
  );
}

