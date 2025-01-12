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
import { getSectionsByClass } from '@/actions/sections'
import SectionCell from './SectionCell'

const SectionTable = async ({id}: {id: number}) => {
    const sections = await getSectionsByClass(id)
  return (
    <Card>
    <CardHeader>
        <CardTitle>Sections</CardTitle>
        <CardDescription>Manage Sections</CardDescription>
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
                {sections.length > 0 ? (
                    sections.map((item, index) => (
                        <SectionCell key={index} data={item} />
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
    </CardContent>
    </Card>
  )
}

export default SectionTable