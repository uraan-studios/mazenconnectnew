import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableRow, TableCell } from '@/components/ui/table';
import { StudentModuleClass } from '@/stores/principalReport/students';
import React, { useEffect } from 'react';

interface UpdateClassData {
  previous?: number;
  total?: number;
  studentPerSection?: number;
  transfered?: number;
  promoted?: number;
  left?: number;
  new?: number;
  boys?: number;
  girls?: number;
}

interface ClassRowProps {
  classItem: StudentModuleClass;
  isOpen: boolean;
  toggleOpen: (classId: number) => void;
  updateClass: (classId: number, data: UpdateClassData) => void;
}

const ClassRow: React.FC<ClassRowProps> = ({ classItem, toggleOpen, updateClass }) => {
  // Update class data when sections change
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
    });
  }, [classItem.sections, classItem.id, updateClass]); // Added missing dependencies

  // Update total when previous, left, or new changes
  useEffect(() => {
    updateClass(classItem.id, {
      total: classItem.previous - classItem.left + classItem.new,
    });
  }, [classItem.previous, classItem.left, classItem.new, classItem.id, updateClass]); // Added missing dependencies

  const handleInputChange = (field: keyof UpdateClassData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0; // Ensure we have a valid number
    updateClass(classItem.id, { [field]: value });
  };

  return (
    <TableRow>
      <TableCell>{classItem.id}</TableCell>
      <TableCell colSpan={2}>{classItem.name}</TableCell>

      <TableCell>
        <Input
          className="max-w-20"
          type="number"
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.previous}
          onChange={handleInputChange('previous')}
        />
      </TableCell>

      <TableCell>
        <Input
          className="max-w-20"
          type="number"
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.left}
          onChange={handleInputChange('left')}
        />
      </TableCell>

      <TableCell>
        <Input
          className="max-w-20"
          type="number"
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.new}
          onChange={handleInputChange('new')}
        />
      </TableCell>

      <TableCell>
        <Input
          className="max-w-20"
          type="number"
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.transfered}
          onChange={handleInputChange('transfered')}
        />
      </TableCell>

      <TableCell>
        <Input
          className="max-w-20"
          type="number"
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.promoted}
          onChange={handleInputChange('promoted')}
        />
      </TableCell>

      <TableCell>
        <Input
          className="max-w-20"
          type="number"
          min={0}
          disabled
          value={classItem.total}
        />
      </TableCell>

      <TableCell className="flex gap-4">
        <Input
          className="max-w-14"
          type="number"
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.boys}
          onChange={handleInputChange('boys')}
        />
        /
        <Input
          className="max-w-14"
          type="number"
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.girls}
          onChange={handleInputChange('girls')}
        />
      </TableCell>

      <TableCell>
        <Input
          className="max-w-14"
          type="number"
          min={0}
          disabled={classItem.sections.length > 0}
          value={classItem.sections.length}
        />
      </TableCell>

      <TableCell>
        <Input
          className="max-w-14"
          type="number"
          min={0}
          disabled
          value={classItem.total / classItem.sections.length}
        />
      </TableCell>

      <TableCell>
        <Button
          size={'sm'}
          className="text-xs"
          onClick={() => toggleOpen(classItem.id)}
          disabled={classItem.sections.length === 0}
        >
          Show/Hide Sections
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ClassRow;