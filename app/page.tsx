export default async function Home() {

  return (
    <main className="flex flex-col">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className='flex flex-col p-10 bg-slate-200 rounded-lg shadow-md gap-4'>
        <h3 className="text-lg">Quicklinks</h3>
        <div className='flex flex-col flex-wrap'>
          <a href="/create-employee" className="text-blue-500 text-sm">Add new employee</a>
          <a href="/company-page" className="text-blue-500 text-sm">Add new departments and position</a>
          <a href="/leave-page" className="text-blue-500 text-sm">Request a leave (to change pa ang link)</a>
          <a href="/payroll-page" className="text-blue-500 text-sm">Go to your payroll</a>
        </div>
      </div>
      
    </main>
  );
}

