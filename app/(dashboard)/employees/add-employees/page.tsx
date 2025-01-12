
import { getStatus } from '@/actions/employees'
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



const AddEmployeesPage = async() => {
  const roles = await getRoles()
  const status = await getStatus()
  return (
    <div className='py-6 space-y-4'>
    <div>
      <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Add' varient='heading' />
      <AnimatedHeading className='font-misologist font-normal' title='Employees' varient='heading' />
    
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
            <BreadcrumbPage>Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

  <AddEmployees roles={roles} statusOptions={status}/>
  <EmployeesTable/>

  </div>
  )
}

export default AddEmployeesPage