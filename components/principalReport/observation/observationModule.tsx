"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import useObservationModule from "@/stores/principalReport/observationModule";
import useTeacherStore from "@/stores/principalReport/teachers";
import useSubjectStore from "@/stores/principalReport/subjects";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useClassStore from "@/stores/principalReport/classes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ObservationModule = () => {
  const store = useObservationModule();
  const teacherStore = useTeacherStore();
  const subjectStore = useSubjectStore();
  const classStore = useClassStore();

  const [newActivity, setNewActivity] = useState({
    id: 0,
    teacherId: 0,
    grade: 0,
    subjectId: 0,
    subjectName: "",
    walkThrough: "",
    informed: "",
    uninformed: "",
  });

  const [selectedGrade, setSelectedGrade] = useState(0);

  return (
    <div>
      <Separator className="my-6 opacity-25" />
      <Card>
        <CardHeader>
          <CardTitle>Observation Record</CardTitle>
          <CardDescription>
            Enter the Observation Record Details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="bg-accent p-6 rounded-md my-4 overflow-clip">
            <TableHeader className="bg-secondary ">
              <TableRow>
                <TableHead className="text-secondary-foreground">No.</TableHead>
                <TableHead className="text-secondary-foreground"> Name</TableHead>
                <TableHead className="text-secondary-foreground w-44">Grade</TableHead>
                <TableHead className="text-secondary-foreground w-44">Subject</TableHead>
                <TableHead className="text-secondary-foreground ">Walk Through</TableHead>
                <TableHead className="text-secondary-foreground ">Informed</TableHead>
                <TableHead className="text-secondary-foreground ">UnInformed</TableHead>
                <TableHead className="text-secondary-foreground text-right">Delete</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {store.observationRecords.map((observationRecord, index) => (
                <TableRow key={index}>
                  <TableCell>{observationRecord.teacherId}</TableCell>
                  <TableCell>
                    {teacherStore.getName(observationRecord.teacherId)}
                  </TableCell>
                  <TableCell>{observationRecord.grade}</TableCell>
                  <TableCell>
                    {subjectStore.getName(observationRecord.subjectId)}
                  </TableCell>
                  <TableCell>{observationRecord.walkThrough}</TableCell>
                  <TableCell>{observationRecord.informed}</TableCell>
                  <TableCell>{observationRecord.uninformed}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      onClick={() =>
                        store.removeObservationRecord(observationRecord.id)
                      }
                      variant={"destructive"}
                    >
                      <Trash2 className="h-6 w-6 text-white" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>
          <Table className="bg-accent p-6 rounded-md my-4 overflow-clip">
            <TableBody>
              <TableRow>
                <TableCell>-</TableCell>
                {/* Select Teacher */}
                <TableCell>
                  <Select
                    onValueChange={(value) =>
                      setNewActivity({
                        ...newActivity,
                        teacherId: parseInt(value, 10),
                      })
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherStore.teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id.toString()}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* Select Grade */}

                 {/* {classStore.classes.map((classItem) => (
                        <p>{classItem.name} - {classItem.gradeId}</p>
                      ))} */}
                <TableCell>
                  <Select
                    onValueChange={(value) => {
                      const gradeId = parseInt(value, 10);
                      setNewActivity({ ...newActivity, grade: gradeId });
                      setSelectedGrade(gradeId);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {classStore.classes.map((classItem) => {
                        // Add a check for gradeId
                        const gradeId = classItem.gradeId;
                        if (gradeId !== undefined) {
                          return (
                            <SelectItem key={classItem.id} value={gradeId.toString()}>
                              {classItem.name} - {gradeId}
                            </SelectItem>
                          );
                        }
                        return null; // Or you can handle missing gradeId differently
                      })}
                    </SelectContent>
                  </Select>
                </TableCell>


                {/* Select Subject */}
                <TableCell>
                  <Select
                    onValueChange={(value) =>
                      setNewActivity({
                        ...newActivity,
                        subjectId: parseInt(value, 10),
                      })
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectStore.subjects
                        .filter((subject) => subject.gradeId === selectedGrade)
                        .map((subject) => (
                          <SelectItem key={subject.id} value={subject.id.toString()}>
                            {subject.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* Walk Through */}
                <TableCell>
                  <Input
                    type="text"
                    placeholder="Enter Walk Through"
                    value={newActivity.walkThrough}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        walkThrough: e.target.value,
                      })
                    }
                  />
                </TableCell>

                {/* Informed */}
                <TableCell>
                  <Input
                    type="text"
                    placeholder="Enter Informed"
                    value={newActivity.informed}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        informed: e.target.value,
                      })
                    }
                  />
                </TableCell>

                {/* Uninformed */}
                <TableCell>
                  <Input
                    type="text"
                    placeholder="Enter Uninformed"
                    value={newActivity.uninformed}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        uninformed: e.target.value,
                      })
                    }
                  />
                </TableCell>

                <TableCell className="text-right space-x-2">
                  <Button
                    onClick={() =>
                      store.addObservationRecord({
                        ...newActivity,
                        id: store.observationRecords.length + 1,
                      })
                    }
                    variant={"default"}
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ObservationModule;
