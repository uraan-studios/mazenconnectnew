"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, {  useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useWorkLoadModule from '@/stores/principalReport/workload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useTeacherStore from '@/stores/principalReport/teachers';
import useSubjectStore from '@/stores/principalReport/subjects';
import { Switch } from '@/components/ui/switch';


type  staff = {
    id: number;
    name: string;
    campusId: number;
    statusId: number;
    designationId: number;
    salary: number;
    isActive: boolean;
    dateJoined: Date;
}
// type  staff = {
//     id: number;
//     name: string;
//     campusId: number;
//     designationId: number;
//     salary: number;
//     isActive: boolean;
//     dateJoined: Date;
//     statusId: number;
// }

type Subject = {
    id: number;
    name: string;
    gradeId: number;
}

const WorkTable = ({staff, subjects}: {staff: staff[], subjects: Subject[]}) => {
    const store = useWorkLoadModule()
    const teacherStore = useTeacherStore()
    const subjectStore = useSubjectStore()

    useEffect(() => {
        const session = sessionStorage.getItem("workload-module-storage");
        if (!session) {
            store.setStaff(
                staff.map((staffMember) => ({
                    id: staffMember.id,
                    name: staffMember.name,
                    workload: 0,
                    students: 0,
                    isHomeRoom: false
                }))
            );
        }

        const teacherStoreStorage = sessionStorage.getItem("teacher-store-storage");
        if (!teacherStoreStorage) {
            teacherStore.setTeachers(
                staff.map((staffMember) => ({
                    id: staffMember.id,
                    name: staffMember.name,
                }))
            );
        }

        const subjectStoreStorage = sessionStorage.getItem("subject-store-storage");
        if (!subjectStoreStorage) {
            subjectStore.setSubjects(
                subjects.map((subject) => ({
                    id: subject.id,
                    name: subject.name,
                    gradeId: subject.gradeId
                }))
            );
        }
    }, [staff, subjects,teacherStore, subjectStore, store]);

  return (
    <div className='space-y-2'>
   <Card>
    <CardHeader>
        <CardTitle>Teachers WorkLoad</CardTitle>
        <CardDescription>
            Enter the Teachers Workload Details
        </CardDescription>
        <CardContent>
            <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
            <TableHeader className='bg-secondary '>
              <TableRow>
                <TableHead  className='text-secondary-foreground'>Name</TableHead>
                <TableHead  className='text-secondary-foreground w-44'>is Home Room</TableHead>
                <TableHead  className='text-secondary-foreground w-44'>Work Load</TableHead>
                {/* <TableHead  className='text-secondary-foreground w-44'>Students</TableHead> */}
              </TableRow>
            </TableHeader>
            
            <TableBody>
                {
                    store.staff.map((staff, index) => (
                        <TableRow key={index}>
                            <TableCell>{staff.name}</TableCell>
                            <TableCell>
                                <Switch 
                                    checked={staff.isHomeRoom}
                                    onChange={(e) => store.updateStaff(staff.id, {isHomeRoom: staff.isHomeRoom ? false : true})}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type='number'
                                    min={0}
                                    value={staff.workload}
                                    onChange={(e) => store.updateStaff(staff.id, {workload: parseInt(e.target.value, 10) || 0})}
                                />
                            </TableCell>
                            {/* <TableCell>
                                <Input
                                    type='number'
                                    min={0}
                                    value={staff.students}
                                    onChange={(e) => store.updateStaff(staff.id, {students: parseInt(e.target.value, 10) || 0})}
                                />
                            </TableCell> */}
                        </TableRow>
                    ))
                }
            </TableBody>
            </Table>
        </CardContent>
    </CardHeader>
   </Card>

   <Card>
      <CardHeader>
          <CardTitle>Any Remarks</CardTitle>
          <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
      </CardHeader>
      <CardContent>
          <Textarea

          value={store.remarks}
          onChange={(e)=> store.setRemarks(e.target.value)}
          />
      </CardContent>
    </Card>
   </div>

  )
}

export default WorkTable