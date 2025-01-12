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
import { getRoles } from '@/actions/roles'
import DeleteDesignation from './DeleteDesignation'
import DeleteDepartment from './DeleteDepartment'
import { Separator } from '@/components/ui/separator'


const EmployeesRoleTable = async() => {
  const roles = await getRoles()
  return (
    <Card>
    <CardHeader>
        <CardTitle>Departments and Roles</CardTitle>
        <CardDescription>Manage Departments and Roles</CardDescription>
    </CardHeader>
    <CardContent>
        {
          roles.map((item) => (
            <>
            <div className='px-4 py-2 mt-4 bg-primary/20 font-semibold rounded-t-lg flex justify-between items-center'>
              {item.name}
              <DeleteDepartment id={item.id}/>
            </div>

            <Table>
              <TableHeader className='bg-secondary '>
                <TableRow>
                  <TableHead className="w-[100px] text-secondary-foreground">ID</TableHead>
                  <TableHead className='text-secondary-foreground'>Name</TableHead>
                  <TableHead className='text-right text-secondary-foreground'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {item.Designation.length > 0 ? (
                  item.Designation.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell className='font-semibold'>{item.name}</TableCell>
                      <TableCell className='text-right space-x-2'>
                        <DeleteDesignation id={item.id}/>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No Departments found.
                    </TableCell>
                  </TableRow>
                )}  
                </TableBody>
            </Table>

            <Separator className='my-6'/>

           </>
          ))
        }
    </CardContent>
    </Card>
  )
}

export default EmployeesRoleTable