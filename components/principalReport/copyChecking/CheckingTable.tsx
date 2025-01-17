"use client";
import useClassStore from '@/stores/principalReport/classes';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useSubjectStore from '@/stores/principalReport/subjects';
import useTeacherStore from '@/stores/principalReport/teachers';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import useRecheckingStore from '@/stores/principalReport/newRechecking';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useStudentModule from '@/stores/principalReport/students';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

type Division = {
    grades: {
        id: number;
        name: string;
    }[]; 
    id: number;
    name: string;
}

type data = {
    ClassSection: {
        id: number;
        name: string;
        classId: number;
    }[];
  } & {
    id: number;
    name: string;
    gradeId: number;
    description: string;
    campusId: number;
  }

const CheckingTable = ({ divisions, data }: { divisions: Division[], data: data[] }) => {
    const studentStore = useStudentModule();
    const classStore = useClassStore();
    const subjectStore = useSubjectStore();
    const teacherStore = useTeacherStore();
    // const recheckingStore = useRecheckingStore();
    const recheckingStore= useRecheckingStore()

    useEffect(() => {
        const session = sessionStorage.getItem("student-module-storage");
        if (!session) {
            classStore.setDivisions(divisions);
            
        }

        const recheckSession = sessionStorage.getItem("rechecking-storage");
        if (!recheckSession) {
            console.log("Adding Rechecking")
            data.map((classItem) => {
                recheckingStore.addRechecking(classItem.id, subjectStore.subjects.filter((subject) => subject.gradeId === classItem.gradeId).map((subject) => ({
                    id: subject.id,
                    name: subject.name,
                    count: 0,
                })))
            })
            
            // studentStore.classes.forEach((classItem) => {
            //     // recheckingStore.addRechecking(classItem., subjectStore.subjects.filter((subject) => subject.gradeId === classItem.id).map((subject) => ({
            //     //     id: subject.id,
            //     //     name: subject.name,
            //     //     count: 0,
            //     // })))
            //     filteredDivisions.forEach((division) => {
            //         // division.grades.filter((grade))
            //     })
            // })
        }
        // filteredDivisions.forEach((division) => {
        //     division.grades.forEach((grade) => {
        //         recheckingStore.addRechecking(grade.id, subjectStore.subjects.filter((subject) => subject.gradeId === grade.id).map((subject) => ({
        //             id: subject.id,
        //             name: subject.name,
        //             count: 0,
        //         })))
                
        //     })
        // })
    }, [divisions, classStore]);

    interface RecheckingSubject {
        id: number;
        name: string;
        count: number;
    }

//    const addClassRow = (classId: number, subjects: RecheckingSubject[]) => {
//        recheckingStore.addRechecking(classId, subjects)
//    }

    // Filter out divisions with no classes
    const filteredDivisions = divisions.filter((division) => {
        const divisionsWithClasses = division.grades.some((grade) => classStore.getClassByGrade(grade.id).length > 0);
        return divisionsWithClasses;
    });

    return (
        <div>
            <div>
            {filteredDivisions.map((division) => (
                <div key={division.id}>
                    <Separator className='my-10'/>

                    <div className="mb-6">
                        <h2 className='bg-primary/30 p-2 font-semibold text-sm text-center rounded-xl'>Division: {division.name}</h2>
                        <Table  className='bg-accent p-6 rounded-md my-4 overflow-clip'>
                            <TableHeader className='bg-secondary'>
                                <TableRow>
                                    <TableHead colSpan={2} className='text-secondary-foreground'>Grade</TableHead>
                                    {
                                        subjectStore.subjects.filter((subject) => subject.gradeId === division.grades[0].id).map((subject) => (
                                            <TableHead className='text-secondary-foreground'>{subject.name}</TableHead>
                                        ))
                                    }
                                    <TableHead className='text-secondary-foreground'>Students</TableHead>
                                    <TableHead className='text-secondary-foreground'>Percentage</TableHead>
                                    
                                        
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {recheckingStore.rechecking.filter((item)=> division.grades.some((grade) => grade.id === data.find((classItem) => classItem.id === item.classId)?.gradeId)).map((gradeItem, index) => (
                                    <TableRow key={index}>
                                        <TableCell colSpan={2}>{division.grades.find((grade) => grade.id === data.find((classItem) => classItem.id === gradeItem.classId)?.gradeId)?.name}</TableCell>
                                        {
                                            
                                            gradeItem.subjects.map((subject) => (
                                                <TableCell>
                                                    <Input 
                                                        type='number'
                                                        min={0}
                                                        value={subject.count}
                                                        onChange={(e) => recheckingStore.updateRecheckingCount(gradeItem.classId, subject.id, parseInt(e.target.value, 10) || 0)}
                                                    />
                                                </TableCell>
                                            ))
                                        }
                                        <TableCell>
                                            {studentStore.getClassStrength(gradeItem.classId)}
                                        </TableCell>
                                        <TableCell>
                                            {((gradeItem.subjects.reduce((acc, subject) => acc + subject.count, 0))/((studentStore.getClassStrength(gradeItem.classId))*(gradeItem.subjects.length)) * 100).toFixed(0) || 0}%
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                     
                    </div>
                </div>
            ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Any Remarks</CardTitle>
                    <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                    value={recheckingStore.remarks}
                    onChange={(e) => recheckingStore.setRemarks(e.target.value)}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default CheckingTable;


// {division.grades.map((grade) => (
//     // <div key={grade.id} className="mb-6">
//     //     {classStore.getClassByGrade(grade.id).map((classItem) => (
//     //         <div key={classItem.id} className="mb-6 bg-primary/10 rounded-md">
//     //             <div className='text-center mt-4 pt-2 px-4  rounded-md flex justify-between items-center'>
//     //                 <p className="font-semibold"></p>
//     //                 <p className="font-semibold">{classItem.name}</p>
//     //                 <Badge variant={'destructive'} className='text-secondary-foreground'>Total Students: {studentStore.getClassStrength(classItem.id)}</Badge>
                      
//     //             </div>

//     //             <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
//     //                 <TableHeader className='bg-secondary'>
//     //                     <TableRow>
//     //                         <TableHead className='text-secondary-foreground'>Teacher</TableHead>
//     //                         <TableHead className='text-secondary-foreground'>Subject</TableHead>
//     //                         <TableHead className='text-secondary-foreground'>Status</TableHead>
//     //                         <TableHead className='text-secondary-foreground'>Percent</TableHead>
//     //                         <TableHead className='text-secondary-foreground text-right'>Delete</TableHead>
//     //                     </TableRow>
//     //                 </TableHeader>
//     //                 <TableBody>
//     //                     {recheckingStore.rechecking
//     //                         .filter((item) => item.classId === classItem.id)
//     //                         .map((item, index) => (
//     //                             <TableRow key={index}>
//     //                                 <TableCell>
//     //                                     {teacherStore.teachers.find(teacher => teacher.id === item.teacherId)?.name || "N/A"}
//     //                                 </TableCell>
//     //                                 <TableCell>
//     //                                     {subjectStore.subjects.find(subject => subject.id === item.subjectId)?.name || "N/A"}
//     //                                 </TableCell>
//     //                                 <TableCell>
//     //                                     <Input
//     //                                         type='number'
//     //                                         min={0}
//     //                                         value={item.count}
//     //                                         onChange={(e) => recheckingStore.updateRecheckingCount(item.classId, item.teacherId, item.subjectId, parseInt(e.target.value, 10) || 0)}
//     //                                     />

//     //                                 </TableCell>
//     //                                 <TableCell>
//     //                                     {(item.count / studentStore.getClassStrength(item.classId) * 100).toFixed(2)}%
//     //                                 </TableCell>
//     //                                 <TableCell className='text-right'>
//     //                                     <Button
//     //                                         onClick={() => recheckingStore.removeRechecking(item.classId, item.teacherId, item.subjectId)}
//     //                                     >Delete</Button>
//     //                                 </TableCell>
//     //                             </TableRow>
//     //                         ))}
//     //                 </TableBody>
//     //             </Table>

//     //             <div className='p-4'>
//     //                 <Label>Add New</Label>
//     //                 <div className="flex justify-between p-4 bg-accent/20 rounded-md">
//     //                     <Select value={selectedTeacherId?.toString()} onValueChange={setSelectedTeacherId}>
//     //                         <SelectTrigger className="w-[180px]">
//     //                             <SelectValue placeholder="Teacher" />
//     //                         </SelectTrigger>
//     //                         <SelectContent>
//     //                             {teacherStore.teachers.map((teacher) => (
//     //                                 <SelectItem value={teacher.id.toString()} key={teacher.id}>
//     //                                     {teacher.name}
//     //                                 </SelectItem>
//     //                             ))}
//     //                         </SelectContent>
//     //                     </Select>

//     //                     <Select value={selectedSubjectId?.toString()} onValueChange={setSelectedSubjectId}>
//     //                         <SelectTrigger className="w-[180px]">
//     //                             <SelectValue placeholder="Subject" />
//     //                         </SelectTrigger>
//     //                         <SelectContent>
//     //                             {subjectStore.subjects
//     //                                 .filter((subject) => subject.gradeId === classItem.gradeId)
//     //                                 .map((subject) => (
//     //                                     <SelectItem key={subject.id} value={subject.id.toString()}>
//     //                                         {subject.name}
//     //                                     </SelectItem>
//     //                                 ))}
//     //                         </SelectContent>
//     //                     </Select>

//     //                     <Input
//     //                         type='number'
//     //                         className='max-w-xs'
//     //                         min={0}
//     //                         value={newCount}
//     //                         onChange={(e) => setNewCount(parseInt(e.target.value, 10) || 0)}
//     //                     />

//     //                     <Button
//     //                         variant={'default'}
//     //                         onClick={() => {
//     //                             if (selectedTeacherId && selectedSubjectId) {
//     //                                 handleAddRechecking(
//     //                                     classItem.id,
//     //                                     parseInt(selectedTeacherId),
//     //                                     parseInt(selectedSubjectId),
//     //                                     newCount // Set status based on the Switch value
//     //                                 );
//     //                             }
//     //                         }}
//     //                     >
//     //                         Add
//     //                     </Button>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //     ))}
//     // </div>

//     <></>
// ))}