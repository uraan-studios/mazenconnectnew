
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
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
import CampusCell from './campusCell'
import { getCampuses } from '@/actions/campus'

const ManageCampusCard = async () => {
    const campuses = await getCampuses()
  return (
    <Card>
                <CardHeader>
                    <CardTitle>Campuses</CardTitle>
                    <CardDescription>Manage Campuses</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
                        <TableHeader className='bg-secondary '>
                            <TableRow>
                                <TableHead className="w-[100px] text-secondary-foreground">ID</TableHead>
                                <TableHead className='text-secondary-foreground'>Name</TableHead>
                                <TableHead className='text-secondary-foreground'>Email</TableHead>
                                <TableHead className='text-secondary-foreground'>City</TableHead>
                                <TableHead className='text-secondary-foreground'>Role</TableHead>
                                <TableHead className='text-right text-secondary-foreground'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {campuses.length > 0 ? (
                                campuses.map((campus, index) => (
                                    <CampusCell key={index} data={campus} />
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">
                                        No Campuses found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={5}>Total Campuses</TableCell>
                                <TableCell className="text-right">{campuses.length}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </CardContent>

                
            </Card>
  )
}

export default ManageCampusCard