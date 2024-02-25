import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-wrap flex-row gap-4'>
        <div className='flex flex-col p-10 bg-slate-200 rounded-lg shadow-md gap-4'>
            <h2 className="font-bold text-2xl">Leave Request</h2>

            <form>
                <Button>New Request</Button>
            </form>
        </div>
    </div>
  )
}

export default page