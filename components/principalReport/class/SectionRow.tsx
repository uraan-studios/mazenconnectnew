import { Input } from '@/components/ui/input';
import { TableRow, TableCell } from '@/components/ui/table';
import { StudentModuleSection } from '@/stores/principalReport/students';
import React, { useEffect } from 'react';

interface SectionRowProps {
  section: StudentModuleSection;
  classId: number;
  updateSection: (classId: number, sectionId: number, data: Partial<StudentModuleSection>) => void;
}

const SectionRow: React.FC<SectionRowProps> = ({ section, classId, updateSection }) => {
  // Calculate the total whenever the relevant fields change
  useEffect(() => {
    const total = section.previous - section.left + section.new;
    updateSection(classId, section.id, { total });
  }, [section.previous, section.left, section.new, classId, section.id, updateSection]);

  const handleInputChange = (field: keyof StudentModuleSection) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0; // Ensure we have a valid number
    updateSection(classId, section.id, { [field]: value });
  };

  return (
    <TableRow className='bg-primary/15'>
      <TableCell>-</TableCell>
      <TableCell colSpan={2}>{section.name}</TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          value={section.previous}
          onChange={handleInputChange('previous')}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          value={section.left}
          onChange={handleInputChange('left')}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          value={section.new}
          onChange={handleInputChange('new')}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          value={section.transfered}
          onChange={handleInputChange('transfered')}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          value={section.promoted}
          onChange={handleInputChange('promoted')}
        />
      </TableCell>

      <TableCell>
        <Input
          className='max-w-20'
          type='number'
          min={0}
          disabled
          value={section.total}
        />
      </TableCell>

      <TableCell className='flex gap-2'>
        <Input
          className='max-w-16'
          type='number'
          min={0}
          value={section.boys}
          onChange={handleInputChange('boys')}
        />
        /
        <Input
          className='max-w-16'
          type='number'
          min={0}
          value={section.girls}
          onChange={handleInputChange('girls')}
        />
      </TableCell>
    </TableRow>
  );
};

export default SectionRow;