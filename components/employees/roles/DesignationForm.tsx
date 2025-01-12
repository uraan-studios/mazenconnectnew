"use client"
import { addDesignation } from '@/actions/roles';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDesignationStore } from '@/stores/roles';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type data = {
    Designation: {
        name: string;
        id: number;
        departmentId: number;
    }[];
} & {
    name: string;
    id: number;
}

const DesignationForm = ({data}: {data: data[]}) => {
    const store = useDesignationStore()
    const router = useRouter()
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState(false)


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setLoading(true)


        const response = await addDesignation({name:store.name, departmentId: store.departmentId})
        setLoading(false)

        if (response.errors) {
            setError(response.errors)
            return;
        }

        router.refresh()
        store.setName("")
    }
  return (
    <Card>
    <CardHeader>
        <CardTitle>Create a new Designation</CardTitle>
        <CardDescription>Fill the Fields</CardDescription>
    </CardHeader>
    <CardContent>
        <form className='space-y-6'
            onSubmit={onSubmit}
        >
            <div className="">
                <Label>Designation Name</Label>
                <Input 
                    value={store.name}
                    onChange={(e) => store.setName(e.target.value)}
                    placeholder='Teacher'
                    />
            </div>

            <div>
                <Label className=''>Department</Label>
                <Select 
                value={store.departmentId.toString()}
                onValueChange={(value) => store.setDepartmentId(parseInt(value))}
                >
                <SelectTrigger className="">
                <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem  value={"0"}>
                        Select Department
                    </SelectItem>
                {
                    data.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                    </SelectItem>
                    ))
                }
                </SelectContent>
            </Select>
            </div>

                      
                {error &&
                    <Alert variant={'destructive'}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                    </Alert>
                }
  

            <Button disabled={loading}>Add Designation</Button>
        </form>
    </CardContent>
    </Card>
  )
}

export default DesignationForm