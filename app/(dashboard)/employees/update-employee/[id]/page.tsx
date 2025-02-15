
import { getEmployeeById, getStatus } from '@/actions/employees'
import { getRoles } from '@/actions/roles'
import AddEmployees from '@/components/employees/AddEmployees'
import EmployeesTable from '@/components/employees/Table'
import AnimatedHeading from '@/components/general/animatedHeading'
import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import UpdateEmployee from '@/components/employees/UpdateEmployee'



const AddEmployeesPage = async (params: {params: {id: string}}) => {
  const roles = await getRoles()
  const status = await getStatus()

  const employee = await getEmployeeById(parseInt(params.params.id))
  return (
    <div className='py-6 space-y-4'>
    <div>
      <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Edit' varient='heading' />
      <AnimatedHeading className='font-misologist font-normal' title='Employee' varient='heading' />
    
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/employees">Employees</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{params.params.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    
    {
      employee === null ? (
        <div className='text-red-500'>Employee data is missing</div>
      ) : 'errors' in employee ? (
        <div className='text-red-500'>{employee.errors}</div>
      ) : (
        <UpdateEmployee employee={employee} roles={roles} statusOptions={status} />
      )
    }

  
  </div>
  )
}

export default AddEmployeesPage