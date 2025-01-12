import { getEmployeesCount } from '@/actions/prinicpalReport'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import EmployeesTable from './EmployeesTable'

const EmployeesModule = async () => {
    const employees = await getEmployeesCount()
  return (
    <Card>
    <CardHeader>
        <CardTitle>Employees Module</CardTitle>
        <CardDescription>Add Classes and Sections</CardDescription>
    </CardHeader>
    <CardContent>
        <EmployeesTable data= {employees}/>
    </CardContent>
    </Card>
  )
}

export default EmployeesModule