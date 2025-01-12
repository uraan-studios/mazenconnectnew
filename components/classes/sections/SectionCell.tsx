import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react'
import DeleteSection from './DeleteSection';

type data = {
    id: number;
    name: string;
    classId: number;
}

const SectionCell = ({data}: {data: data}) => {
  return (
    <TableRow>
    <TableCell>{data.id}</TableCell>
    <TableCell className='font-semibold'>{data.name}</TableCell>
    <TableCell className='text-right space-x-2'>
        <DeleteSection id={data.id}/>
    </TableCell>

</TableRow>
  )
}

export default SectionCell