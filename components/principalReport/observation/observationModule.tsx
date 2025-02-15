"use client";
import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ObservationModule = () => {
  const store = useObservationModule();
  const teacherStore = useTeacherStore();

  const [newActivity, setNewActivity] = useState({
    id: 0,
    teacherId: 0,
    walkThrough: "",
    informed: "",
    uninformed: "",
  });

  const [availableTeachers, setAvailableTeachers] = useState(teacherStore.teachers);

  useEffect(() => {
    // Update available teachers whenever the observation records change
    const usedTeacherIds = store.observationRecords.map(record => record.teacherId);
    setAvailableTeachers(teacherStore.teachers.filter(teacher => !usedTeacherIds.includes(teacher.id)));
  }, [store.observationRecords, teacherStore.teachers]);

  const handleAddObservationRecord = () => {
    if (newActivity.teacherId === 0) return; // Ensure a teacher is selected

    store.addObservationRecord({
      ...newActivity,
      id: store.observationRecords.length + 1,
    });

    // Reset the form
    setNewActivity({
      id: 0,
      teacherId: 0,
      walkThrough: "",
      informed: "",
      uninformed: "",
    });
  };

  const handleRemoveObservationRecord = (id: number) => {
    store.removeObservationRecord(id);
  };

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
                  <TableCell>{observationRecord.walkThrough}</TableCell>
                  <TableCell>{observationRecord.informed}</TableCell>
                  <TableCell>{observationRecord.uninformed}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      onClick={() => handleRemoveObservationRecord(observationRecord.id)}
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
                      {availableTeachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id.toString()}>
                          {teacher.name}
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
                    onClick={handleAddObservationRecord}
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