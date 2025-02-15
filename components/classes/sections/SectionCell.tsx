"use client"
import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react'
import DeleteSection from './DeleteSection';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { updateSectionById } from '@/actions/class';
import { useRouter } from 'next/navigation';

type data = {
    id: number;
    name: string;
    classId: number;
}

const SectionCell = ({data}: {data: data}) => {
  const [name, setName] = React.useState(data.name)
  const [change, setChange] = React.useState(false)


  React.useEffect(() => {
    setName(data.name)
  }, [data])

  return (
    <TableRow>
    <TableCell>{data.id}</TableCell>
    <TableCell className='font-semibold'>
      <Input
        value={name}
        disabled={!change}
        onChange={(e) => setName(e.target.value)}
      />
    </TableCell>
    <TableCell className='text-right space-x-2'>
      <div className="flex gap-2 items-end justify-end">
        {
          change && (
            <div 
              onClick={() => {
                updateSectionById(data.id, name)
                setChange(false)
              }}
            className='bg-secondary py-1 px-4 rounded-xl hover:bg-primary text-primary-foreground'>
              Save
            </div>
          )
        }
        {
          change && (
            <div
              onClick={() => {
                setChange(false)
                setName(data.name)
              }}
              className='bg-secondary py-1 px-4 rounded-xl hover:bg-primary text-primary-foreground'>
              Cancel
            </div>
          )
        }
        {!change && <div 
          onClick={() => {
            setChange(true)
          }}
          className='bg-secondary py-1 px-4 rounded-xl hover:bg-primary text-primary-foreground'>
            Edit
        </div>}
        <DeleteSection id={data.id}/>
      </div>
        
    </TableCell>

</TableRow>
  )
}

export default SectionCell