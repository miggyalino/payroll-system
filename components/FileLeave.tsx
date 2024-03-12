import React from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from './ui/button'

type FileLeaveProps = {
    id: number | undefined
    employeeId: string | undefined
}


const FileLeave = ({ id, employeeId }: FileLeaveProps) => {
  return (
    <form action="">
        <div className='flex flex-col gap-2'>
            
            <label htmlFor="" className='font-bold'>ID</label>
            <input type="text" value={employeeId} disabled/>
            <div className='flex gap-2'>
                <div>
                    <label htmlFor="" className='font-bold'>Start Date</label>
                    <Calendar
                        className="rounded-md border"
                    />
                </div>
            <div>
                    <label htmlFor="" className='font-bold'>End Date</label>
                    <Calendar
                        className="rounded-md border"
                    />
            </div>
            </div>
            <label htmlFor="" className='font-bold'>Reason</label>
            <input type="text" />
            <Button type='submit'>File Leave</Button>
        </div>
    </form>
  )
}

export default FileLeave