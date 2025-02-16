"use client"
import { createSection } from '@/actions/sections';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSectionStore } from '@/stores/section';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type data = {
    ClassSection: {
        id: number;
        name: string;
        classId: number;
    }[];
} & {
    id: number;
    name: string;
    description: string;
    campusId: number;
}

const SectionForm = ({data, classId}: {data: data[], classId?: number}) => {
    const store = useSectionStore()
    const router = useRouter()
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState(false)


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

    
        const response = await createSection({
            name: store.name,
            class: store.classId || classId || 0 // Default value (0) or any appropriate number
        });
        setLoading(false)

        if (response.errors) {
            setError(response.errors);
            return;
        }
    
        router.refresh();
        store.setName("");
    }
    
  return (
    <Card className='w-1/3 mx-auto'>
    <CardHeader>
        <CardTitle>Create a new Section</CardTitle>
        <CardDescription>Fill up the required fields</CardDescription>
    </CardHeader>
    <CardContent>
        <form className='space-y-6'
            onSubmit={onSubmit}
        >
            <div className="">
                <Label>Section Name</Label>
                <Input 
                    value={store.name}
                    onChange={(e) => store.setName(e.target.value)}
                    placeholder='Class Name'
                    />
            </div>

            <div>
                <Label className=''>Class</Label>
                <Select 
                value={classId?.toString() ||store.classId.toString()}
                disabled={!!classId}
                onValueChange={(value) => store.setClassId(parseInt(value))}
                >
                <SelectTrigger className="">
                <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem  value={"0"}>
                        Select Class
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
  

            <Button disabled={loading} type="submit" >{loading ? "Loading..." : "Add Section"}</Button>
        </form>
    </CardContent>
    </Card>
  )
}

export default SectionForm