import React from 'react'
import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react";
import { activeEmployeesCount, leftEmployeesCount } from '@/actions/employees';

const DashCounts = async () => {
    const activeEmployees = await activeEmployeesCount()
    const leftEmployees = await leftEmployeesCount()

  return (
    <div className='flex  gap-4 w-full'>
        <div className="bg-primary/10 p-4 border rounded-md space-y-2 w-full">
            <p className="text-sm font-semibold">On Track</p>
            <div className="flex gap-4 items-end">
                <ArrowUpRightIcon className="h-8 w-8 text-green-500" />
                <h2 className="text-5xl font-semibold">{activeEmployees}</h2>
            </div>
                <p className="text-sm opacity-45">Total  Employees</p>
        </div>

        <div className="bg-primary/10 p-4 border rounded-md space-y-2 w-full">
            <p className="text-sm font-semibold">...</p>
            <div className="flex gap-4 items-end">
                <ArrowDownRightIcon className="h-8 w-8 text-destructive" />
                <h2 className="text-5xl font-semibold">{leftEmployees}</h2>
            </div>
                <p className="text-sm opacity-45">Employees Left this Month</p>
        </div>
    </div>
  )
}

export default DashCounts