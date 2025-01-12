import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TableRow, TableCell } from '@/components/ui/table'
import { StudentModuleClass } from '@/stores/principalReport/students'
import React, { useEffect } from 'react'

interface ClassRowProps {
  classItem: StudentModuleClass
  isOpen: boolean
  toggleOpen: (classId: number) => void
  updateClass: (classId: number, data: Record<string, any>) => void
}

const ClassRow: React.FC<ClassRowProps> = ({ classItem, toggleOpen, updateClass }) => {
    
    useEffect(() => {
        updateClass(classItem.id, {
          previous: classItem.sections.reduce((acc, section) => acc + section.previous, 0),
            total: classItem.sections.reduce((acc, section) => acc + section.total, 0),
            studentPerSection: classItem.sections.reduce((acc, section) => acc + section.total / classItem.sections.length, 0),
            transfered: classItem.sections.reduce((acc, section) => acc + section.transfered, 0),
            promoted: classItem.sections.reduce((acc, section) => acc + section.promoted, 0),
            left: classItem.sections.reduce((acc, section) => acc + section.left, 0),
            new: classItem.sections.reduce((acc, section) => acc + section.new, 0),
            boys: classItem.sections.reduce((acc, section) => acc + section.boys, 0),
            girls: classItem.sections.reduce((acc, section) => acc + section.girls, 0),
        })

    }, [classItem.sections])

    useEffect(() => {
        updateClass(classItem.id, {     
            total:  classItem.previous - classItem.left + classItem.new,
        })

    }, [classItem.previous, classItem.left, classItem.new])
  return (
    <TableRow>
      <TableCell>{classItem.id}</TableCell>
      <TableCell colSpan={2}>{classItem.name}</TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.previous}
          onChange={(e) => updateClass(classItem.id, { previous: parseInt(e.target.value) })}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.left}
          onChange={(e) => updateClass(classItem.id, { left: parseInt(e.target.value) })}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.new}
          onChange={(e) => updateClass(classItem.id, { new: parseInt(e.target.value) })}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.transfered}
          onChange={(e) => updateClass(classItem.id, { transfered: parseInt(e.target.value) })}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.promoted}
          onChange={(e) => updateClass(classItem.id, { promoted: parseInt(e.target.value) })}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          disabled
          value={classItem.total}
          onChange={(e) => updateClass(classItem.id, { total: parseInt(e.target.value) })}
        />
      </TableCell>

      <TableCell className='flex gap-4'>
        <Input
          className='max-w-14'
          type='number'
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.boys}
          onChange={(e) => updateClass(classItem.id, { boys: parseInt(e.target.value) })}
        />
        /
        <Input
          className='max-w-14'
          type='number'
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.girls}
          onChange={(e) => updateClass(classItem.id, { girls: parseInt(e.target.value) })}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-14'
          type='number'
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.sections.length}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-14'
          type='number'
          min={0}
          disabled
          value={classItem.total / classItem.sections.length}
        />
      </TableCell>

      <TableCell>
        <Button
          size={'sm'}
          className='text-xs'
          onClick={() => toggleOpen(classItem.id)}
          disabled={classItem.sections.length === 0}
        >
          Show/Hide Sections
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default ClassRow
