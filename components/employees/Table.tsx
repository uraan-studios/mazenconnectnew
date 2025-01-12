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

import { getEmployees } from '@/actions/employees'
import DeleteEmployee from './DeleteEmployee'
import { Badge } from '../ui/badge'

const EmployeesTable = async () => {
    const data = await getEmployees()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campus Employees</CardTitle>
        <CardDescription>Manage Employees</CardDescription>
      </CardHeader>
      <CardContent>
        {data.map((item) => (
          <div key={item.name}>
            <div className='p-4 bg-primary/20 font-semibold rounded-t-lg text-center'>
              {item.name}
            </div>
            <Table>
              <TableHeader className='bg-secondary'>
                <TableRow>
                  <TableHead className="w-[100px] text-secondary-foreground">ID</TableHead>
                  <TableHead className='text-secondary-foreground'>Name</TableHead>
                  <TableHead className='text-secondary-foreground'>Designation</TableHead>
                  <TableHead className='text-secondary-foreground'>Status</TableHead>
                  <TableHead className='text-right text-secondary-foreground'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {item.Designation.map((designation) => (
                  designation.Staff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>{staff.id}</TableCell>
                      <TableCell>{staff.name}</TableCell>
                      <TableCell>{designation.name}</TableCell>
                      <TableCell>
                        <Badge variant={'default'}>
                          {staff.status.name}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right space-x-2'>
                        <DeleteEmployee id={staff.id} />
                      </TableCell>
                    </TableRow>
                  ))
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default EmployeesTable
