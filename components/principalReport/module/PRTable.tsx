import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DeleteReport from './DeleteReport';

type reports = {
    id: number
    campusId: number
    createdAt: Date 
    studentRemarks: string | null
    staffRemarks: string | null
    workloadRemarks: string | null
    ttblRemarks: string | null
    parentFeedback: string | null
    campus: {
      id: string
      fkId: number
      email: string
      name: string
      phone: string | null
      isSuperUser: boolean
      password: string
      cityId: number
      createdAt: Date 
      updatedAt: Date
    }
  }
  

const PRTable = ({reports}: {reports: reports[]}) => {
  return (
    <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
    <TableHeader className='bg-secondary '>
        <TableRow>
            <TableHead>ID</TableHead>
            <TableHead colSpan={2}>Campus</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Month</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
    {
        reports.map((report, index) => (
            <TableRow key={index}>
                <TableCell >{report.id}</TableCell>
                <TableCell colSpan={2}>{report.campus.name}</TableCell>
                <TableCell >{report.createdAt.toDateString()}</TableCell>
                <TableCell >{new Date(new Date(report.createdAt).setMonth(new Date(report.createdAt).getMonth() - 1)).toLocaleString('default', { month: 'long' })}</TableCell>
                <TableCell className='text-right space-x-2'>
                    <Link href={`/principal-report/${report.id}/?campusId=${report.campusId}`}>
                        <Button variant={'default'}>View</Button>
                    </Link>
                    <DeleteReport id={report.id}/>

                </TableCell>

            </TableRow>
        ))
    }
  </TableBody>
    </Table>
  )
}

export default PRTable