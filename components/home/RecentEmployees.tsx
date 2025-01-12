import { recentEmployees } from '@/actions/employees'
import React from 'react'
import { User2 } from 'lucide-react'
import { Badge } from '../ui/badge'

const RecentEmployees = async () => {
    const employees = await recentEmployees()
  return (
    <div className="bg-primary/10 p-4 border rounded-md space-y-2 w-full">
        <h2 className="text-lg font-semibold">Recent Employees</h2>
        {
            employees.map((employee) => (
                <div key={employee.id} className="bg-card p-4 border rounded-md space-y-2 w-full flex items-center justify-between gap-4 text-card-foreground">

                    <div className="rounded-full flex items-center justify-center overflow-clip h-12 w-12 bg-primary">
                        <User2 className="h-8 w-8 text-primary-foreground" />
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold">{employee.name}</h3>
                        <p className="text-xs ">{new Date(employee.dateJoined).toDateString()}</p>
                    </div>
                    <div className="flex-grow"></div>
                    
                    <Badge variant={'outline'} className="text-xs" color="green">
                        {employee.designation.name}
                    </Badge>
                        
                </div>
            ))
        }
    </div>
  )
}

export default RecentEmployees