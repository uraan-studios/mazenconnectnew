import React from 'react'

import {
    Card,
    CardContent,

} from "@/components/ui/card"

import DepartmentEmployees from './DepartmentEmployees'

const EmployeesTable = async () => {

  return (
    <>
    <Card>
      <CardContent>       
        <DepartmentEmployees departmentId={1} departmentName="Academic" />
      </CardContent>
    </Card>
    <Card>
      <CardContent>       
        <DepartmentEmployees departmentId={2} departmentName="Administration" />
      </CardContent>
    </Card>
    <Card>
      <CardContent>       
        <DepartmentEmployees departmentId={3} departmentName="Non-Academics" />
      </CardContent>
    </Card>
    </>
  )
}

export default EmployeesTable
