"use client"
import useEmployeeModule from '@/stores/principalReport/employees';
import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';


type data= {
    Designation: ({
        _count: {
            Staff: number;
        };
    } & {
        id: number;
        name: string;
        departmentId: number;
    })[];
} & {
    id: number;
    name: string;
}

const EmployeesTable = ({data}:{data:data[]}) => {
    const store = useEmployeeModule()

    useEffect(() => {
        const session = sessionStorage.getItem("employee-module-storage")
        if(!session) {
           store.setDepartments(
            data.map((item)=> ({
                id: item.id,
                name: item.name,
                designations: item.Designation.map((designation)=>({
                    id: designation.id,
                    name: designation.name,
                    departmentId: designation.departmentId,
                    previous: 0,
                    left: 0,
                    new: 0,
                    total: designation._count.Staff,
                }))
            }))
           )
        }
    }, [data])


  return (
    <>
    <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
    <TableHeader className='bg-secondary '>
        <TableRow>
            <TableHead>ID</TableHead>
            <TableHead colSpan={2}>Designation</TableHead>
            <TableHead>Prev</TableHead>
            <TableHead>Left</TableHead>
            <TableHead>New</TableHead>
            <TableHead>Total</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
  {store.departments.map((department) => (
    <React.Fragment key={department.id}>
      <TableRow>
        <TableCell colSpan={7} className="bg-primary/15 text-center">
          {department.name}
        </TableCell>
      </TableRow>
      {department.designations.map((designation) => (
        <TableRow key={designation.id}>
          <TableCell>{designation.id}</TableCell>
          <TableCell colSpan={2}>{designation.name}</TableCell>
          <TableCell>
            <Input
              className="max-w-20"
              type="number"
              min={0}
              value={designation.previous}
              onChange={(e) =>
                store.updateDesignation(department.id, designation.id, {
                  previous: parseInt(e.target.value, 10),
                })
              }
            />
          </TableCell>
          <TableCell>
            <Input
              className="max-w-20"
              type="number"
              min={0}
              value={designation.left}
              onChange={(e) =>
                store.updateDesignation(department.id, designation.id, {
                  left: parseInt(e.target.value, 10),
                })
              }
            />
          </TableCell>
          <TableCell>
            <Input
              className="max-w-20"
              type="number"
              min={0}
              value={designation.new}
              onChange={(e) =>
                store.updateDesignation(department.id, designation.id, {
                  new: parseInt(e.target.value, 10),
                })
              }
            />
          </TableCell>
          <TableCell>{designation.total}</TableCell>
        </TableRow>
      ))}
    </React.Fragment>
  ))}
</TableBody>

    </Table>

    <Card>
      <CardHeader>
          <CardTitle>Any Remarks</CardTitle>
          <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
      </CardHeader>
      <CardContent>
          <Textarea
          value={store.remarks}
          onChange={(e)=> store.setRemarks(e.target.value)}
          />
      </CardContent>
      </Card>
    </>
  )
}

export default EmployeesTable