import React from 'react'
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '../ui/button';
import Link from 'next/link';
import DeleteClass from './DeleteClass';


type data = {
    ClassSection: {
        id: number;
        name: string;
        classId: number;
    }[];
} & {
    id: number;
    name: string;
    campusId: number;
    description: string;
}

const ClassCell = ({data}: {data: data}) => {
  return (
    <>
    <TableRow>
        <TableCell>{data.id}</TableCell>
        <TableCell className='font-semibold'>{data.name}</TableCell>
        <TableCell className='text-right space-x-2'>
            <DeleteClass id={data.id}/>
            <Link href={`/classes/sections/${data.id}/${data.name}`}>
                <Button size={'sm'} variant={'outline'}>View Sections</Button>
            </Link>

        </TableCell>

    </TableRow>
    
{/* 
    <TableRow className='bg-primary/15 hover:bg-primary/20'>
        <TableCell className='flex justify-end'>
            <CornerDownRightIcon className='h-5 opacity-50' />
        </TableCell>
        <TableCell colSpan={2}>
            <SectionTable id={data.id}/>
        </TableCell>
    </TableRow> */}

</>
  )
}

export default ClassCell