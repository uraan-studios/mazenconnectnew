import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { getEmployees, getEmployeesByDepartment } from '@/actions/employees'
import DeleteEmployee from './DeleteEmployee'
import { Badge } from '../ui/badge'
import DepartmentEmployees from './DepartmentEmployees'
import { Separator } from '../ui/separator'

const EmployeesTable = async () => {
    const academic = await getEmployeesByDepartment(1,1) // Department ID, Page Number

  return (
    <Card>
      <CardContent>       
        <DepartmentEmployees departmentId={1} departmentName="Academic" />
        <Separator className='my-4'/>
        <DepartmentEmployees departmentId={2} departmentName="Administration" />
        <Separator className='my-4'/>
        <DepartmentEmployees departmentId={3} departmentName="Non-Academics" />
        <Separator className='my-4'/>
      </CardContent>
    </Card>
  )
}

export default EmployeesTable
