"use client"
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useStudentModule from '@/stores/principalReport/students';
import React, { useEffect, useState } from 'react'
import ClassRow from './ClassCell';
import SectionRow from './SectionRow';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import useClassStore from '@/stores/principalReport/classes';
import { Button } from '@/components/ui/button';
import { getPRClassPrevById } from '@/actions/prinicpalReport';


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

const ClassTable = ({data}:{data:data[]}) => {
    const store = useStudentModule()
    const classStore = useClassStore()

    useEffect(() => {
      const session = sessionStorage.getItem("student-module-storage");
  
      if (!session) {
          // Initialize `classes` only if no data exists in session storage
          store.setClasses(
              data.map((item) => ({
                  id: item.id,
                  name: item.name,
                  previous: 0,
                  left: 0,
                  new: 0,
                  transfered: 0,
                  promoted: 0,
                  total: 0,
                  boys: 0,
                  girls: 0,
                  sectionCount: item.ClassSection.length,
                  studentPerSection: 0,
                  sections: item.ClassSection.map((section) => ({
                      id: section.id,
                      name: section.name,
                      previous: 0,
                      left: 0,
                      new: 0,
                      transfered: 0,
                      promoted: 0,
                      total: 0,
                      boys: 0,
                      girls: 0,
                  })),
              }))
          );
      }
  
      const classStoreStorage = sessionStorage.getItem("class-module-storage");
      if (!classStoreStorage) {
          classStore.setClasses(
              data.map((item) => ({
                  id: item.id,
                  name: item.name,
                  gradeId: item.gradeId,
                  sections: item.ClassSection.map((section) => ({
                      id: section.id,
                      name: section.name,
                  })),
              }))
          );
      }
  }, [data, classStore, store]);
  


    const [openSections, setOpenSections] = useState<Record<number, boolean>>({})

    const toggleOpen = (classId: number) => {
      setOpenSections((prevState) => ({
        ...prevState,
        [classId]: !prevState[classId],
      }))
    }

    const loadPrevRecord = async () => {
      const prev = await getPRClassPrevById();

      console.log(prev)
      if (!prev?.PRstudent?.PRstudentClassCell) return;
  
      prev.PRstudent.PRstudentClassCell.forEach((classData) => {
        store.updateClassPrev(classData.classId, classData.total)

        if (classData.PRstudentSectionCell.length === 0) {
          if (store.getSectionCount(classData.classId) > 0){
            const secID = store.getFirstSectionId(classData.classId)
            store.updateSectionPrev(classData.classId, secID, classData.total)
          }
        };

        classData.PRstudentSectionCell.forEach((sectionData) => {
          store.updateSectionPrev(classData.classId, sectionData.sectionId, sectionData.total)
        })

        

      })
  };
  
  


  return (
    <>
    <Button onClick={loadPrevRecord}>Load Previous Record</Button>
    <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
        <TableHeader className='bg-secondary '>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead colSpan={2}>Name</TableHead>
                <TableHead>Prev</TableHead>
                <TableHead>Left</TableHead>
                <TableHead>New</TableHead>
                <TableHead>Transfered</TableHead>
                <TableHead>Prompted</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Boys / Girls</TableHead>
                <TableHead>Sections</TableHead>
                <TableHead>Students/Sec</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          
          {
          store.classes.map((classItem) => (
            <React.Fragment key={classItem.id}>
              <ClassRow
                classItem={classItem}
                isOpen={openSections[classItem.id]}
                toggleOpen={toggleOpen}
                updateClass={store.updateClass}
              />
              {openSections[classItem.id] &&
                classItem.sections.map((section) => (
                  <SectionRow
                    key={section.id}
                    section={section}
                    classId={classItem.id}
                    updateSection={store.updateSection}
                  />
                ))}
            </React.Fragment>
          ))}
        </TableBody>

    </Table>
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
    </>
  )
}

export default ClassTable