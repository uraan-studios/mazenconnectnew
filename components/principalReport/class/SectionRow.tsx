import { Input } from '@/components/ui/input'
import { TableRow, TableCell } from '@/components/ui/table'
import { StudentModuleSection } from '@/stores/principalReport/students'
import React, { useEffect } from 'react'

interface SectionRowProps {
  section: StudentModuleSection
  classId: number
  updateSection: (classId: number, sectionId: number, data: Record<string, any>) => void
}

const SectionRow: React.FC<SectionRowProps> = ({ section, classId, updateSection }) => {

    useEffect(() => {
      
    updateSection(classId, section.id, {
        total: section.previous - section.left + section.new,
    })
    
    }, [section.previous, section.left, section.new, section.transfered, section.promoted])
    
    
  return (
    <TableRow className='bg-primary/15'>
      <TableCell>{section.id}</TableCell>
      <TableCell colSpan={2}>{section.name}</TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          value={section.previous}
          onChange={(e) => updateSection(classId, section.id, { previous: parseInt(e.target.value) })}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          value={section.left}
          onChange={(e) => updateSection(classId, section.id, { left: parseInt(e.target.value) })}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          value={section.new}
          onChange={(e) => updateSection(classId, section.id, { new: parseInt(e.target.value) })}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          value={section.transfered}
          onChange={(e) => updateSection(classId, section.id, { transfered: parseInt(e.target.value) })}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          value={section.promoted}
          onChange={(e) => updateSection(classId, section.id, { promoted: parseInt(e.target.value) })}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          disabled
          value={section.total}
          onChange={(e) => updateSection(classId, section.id, { total: parseInt(e.target.value) })}
        />
      </TableCell>

      <TableCell className='flex gap-2'>
        <Input
          className='max-w-16'
          type='number'
          min={0}
          value={section.boys}
          onChange={(e) => updateSection(classId, section.id, { boys: parseInt(e.target.value) })}
        />
        /
        <Input
          className='max-w-16'
          type='number'
          min={0}
          value={section.girls}
          onChange={(e) => updateSection(classId, section.id, { girls: parseInt(e.target.value) })}
        />
      </TableCell>
    </TableRow>
  )
}

export default SectionRow
