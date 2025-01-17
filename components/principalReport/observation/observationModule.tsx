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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

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

  const [selectedGrade, setSelectedGrade] = useState(0);
  const [open, setOpen] = React.useState(false)

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
                  {/* <Select
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
                  </Select> */}

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-[200px] justify-between"
                            >
                              {newActivity.teacherId
                                ? teacherStore.teachers.find((teach) => teach.id === newActivity.teacherId)?.name
                                : "Select Teacher..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search Teacher..." />
                              <CommandList>
                                <CommandEmpty>No Teacher found.</CommandEmpty>
                                <CommandGroup>
                                  {teacherStore.teachers.map((teach) => (
                                    <CommandItem
                                      key={teach.id}
                                      value={teach.name + teach.id}
                                      onSelect={(currentValue: string) => {
                                        setNewActivity({
                                          ...newActivity,
                                          teacherId: teacherStore.teachers.find((teach) => teach.name + teach.id === currentValue)?.id || 0,
                                        })
                                        setOpen(false)
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                         ( teach.name + teach.id) === (teach.name + newActivity.teacherId) ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                    </PopoverContent>
                </Popover> 

                {
                  newActivity.teacherId
                }
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
