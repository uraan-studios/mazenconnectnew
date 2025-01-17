"use client";
import React, { useEffect, useState } from 'react';
import { getEmployeesByDepartment } from '@/actions/employees'; // Your action
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DeleteEmployee from './DeleteEmployee';

interface DepartmentEmployeesProps {
  departmentId: number;
  departmentName: string;
}

const DepartmentEmployees: React.FC<DepartmentEmployeesProps> = ({ departmentId, departmentName }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [staff, setStaff] = useState<any[]>([]); // Adjust the type if needed
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchEmployees = async () => {
      const { employees, totalPages } = await getEmployeesByDepartment(departmentId, page);
      setStaff(employees);
      setTotalPages(totalPages);
    };

    fetchEmployees();
  }, [departmentId, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className='mt-4'>

        <div className='px-4 py-2 bg-primary/20 font-semibold text-sm rounded-t-lg text-center'>
                      {departmentName}
        </div>
        <Table>
          <TableHeader className="bg-secondary">
            <TableRow>
              <TableHead className="w-[100px] text-secondary-foreground">ID</TableHead>
              <TableHead className="text-secondary-foreground">Name</TableHead>
              <TableHead className="text-secondary-foreground">Designation</TableHead>
              <TableHead className="text-secondary-foreground">Status</TableHead>
              <TableHead className="text-right text-secondary-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((staffMember, index) => (
              <TableRow key={index}> 
              {/* // ADD INDEX OR COUNT INSTEAD OF IDS */}
                <TableCell>{staffMember.id}</TableCell>
                <TableCell className='font-semibold'>{staffMember.name}</TableCell>
                <TableCell >{staffMember.designation.name}</TableCell>
                <TableCell>
                  <Badge variant="default">{staffMember.status.name}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {/* Add your actions here */}
                  <DeleteEmployee id={staffMember.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4 bg-secondary/20">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="px-4 py-2 bg-secondary text-white rounded-md"
          >
            Previous
          </button>
          <span className="self-center text-secondary-foreground text-xs">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-secondary text-white rounded-md"
          >
            Next
          </button>
        </div>

    </div>
  );
};

export default DepartmentEmployees;
