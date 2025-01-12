"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CalendarIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { useEmployeeStore } from '@/stores/employee'
import { createEmployee } from '@/actions/employees'
import { format } from 'date-fns';



type Roles = {
  id: number
  name: string
  Designation: {
    id: number
    name: string
    departmentId: number
  }[]
}

type StatusOption = {
  id: number
  name: string
}

const AddEmployees = ({ roles, statusOptions }: { roles: Roles[]; statusOptions: StatusOption[] }) => {
  const employeeStore = useEmployeeStore()
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const [filteredDesignations, setFilteredDesignations] = useState<Roles['Designation']>([])
  const [selectedDepartment, setSelectedDepartment] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  
  // Example status options

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Create employee logic here
    const response = await createEmployee({
      name: employeeStore.name,
      designation: employeeStore.designation,
      salary: employeeStore.salary,
      status: employeeStore.status,
      dateJoined: employeeStore.datejoined
    })

    setLoading(false)


    if (response.errors) {
      setError(response.errors)
      return
    }

    router.refresh()
    employeeStore.setName("")
    employeeStore.setDesignation("0")
    employeeStore.setSalary("0")
    employeeStore.setStatus("0")
  }

  useEffect(() => {
    // Filter designations based on selected department
    const allDesignations = roles.flatMap(role => role.Designation) // Combine all designations across roles
    if (selectedDepartment === 0) {
      setFilteredDesignations(allDesignations)
    } else {
      const filtered = allDesignations.filter(designation => designation.departmentId === selectedDepartment)
      setFilteredDesignations(filtered)
    }
  }, [selectedDepartment, roles])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Employee</CardTitle>
        <CardDescription>
          Please ensure accurate entries as this will affect all reports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-2 flex justify-between w-full items-end bg-accent p-4 rounded-xl">

          <div>
            <Label>Name</Label>
            <Input
              value={employeeStore.name}
              onChange={(e) => employeeStore.setName(e.target.value)}
            />
          </div>

          <div>
            <Label>Department</Label>
            <Select
              value={selectedDepartment.toString()}
              onValueChange={(value) => setSelectedDepartment(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"0"}>Select Department</SelectItem>
                {roles.map(dep => (
                  <SelectItem key={dep.id} value={dep.id.toString()}>{dep.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Designation</Label>
            <Select
              value={employeeStore.designation.toString()}
              onValueChange={(value) => employeeStore.setDesignation(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"0"}>Select Designation</SelectItem>
                {filteredDesignations.map(des => (
                  <SelectItem key={des.id} value={des.id.toString()}>{des.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Salary</Label>
            <Input
              value={employeeStore.salary}
              onChange={(e) => employeeStore.setSalary(e.target.value)}
              type="number"
            />
          </div>

          <div>
            <Label>Date Joined</Label>
            <Input
              type="date"
              value={employeeStore.datejoined ? employeeStore.datejoined.toISOString().split('T')[0] : ""}
              onChange={(e) => employeeStore.setDateJoined(new Date(e.target.value))}
            />
          </div>


          <div>
            <Label>Status</Label>
            <Select
              value={employeeStore.status.toString()}
              onValueChange={(value) => employeeStore.setStatus(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"0"}>Select Status</SelectItem>
                {statusOptions.map(status => (
                  <SelectItem key={status.id} value={status.id.toString()}>{status.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button disabled= {loading} type="submit">Add</Button>
        </form>

        <div className="py-4">
          {error && (
            <Alert variant={'destructive'}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default AddEmployees
