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
import { getClasses } from '@/actions/class'
import ClassCell from './ClassCell'

const ClassTable = async () => {
    const classes = await getClasses()

  return (
    <Card>
    <CardHeader>
        <CardTitle>All Classes of the Campus</CardTitle>
        <CardDescription>Manage Classes and Sections</CardDescription>
    </CardHeader>
    <CardContent>
        <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
            <TableHeader className='bg-secondary '>
                <TableRow>
                    <TableHead className="w-[100px] text-secondary-foreground">ID</TableHead>
                    <TableHead className='text-secondary-foreground'>Name</TableHead>
                    <TableHead className='text-right text-secondary-foreground'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {classes.length > 0 ? (
                    classes.map((item, index) => (
                        <ClassCell key={index} data={item} />
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center">
                            No Classes found.
                        </TableCell>
                    </TableRow>
                )}
        </TableBody>
        </Table>
    </CardContent>
    </Card>
  )
}

export default ClassTable