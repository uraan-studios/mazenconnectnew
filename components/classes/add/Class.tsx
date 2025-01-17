"use client"
import { createClass } from '@/actions/class'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useClassStore } from '@/stores/class'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectGroup, SelectLabel } from '@radix-ui/react-select'


type Division = {
    grades: {
        id: number;
        name: string;
    }[];
} & {
    id: number;
    name: string;
}

const AddClass = ({divs}: {divs: Division[]}) => {
    const store = useClassStore()
    const router = useRouter()
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState(false)


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const response = await createClass({name:store.name, gradeId: store.gradeId})
        setLoading(false)

        if (response.errors) {
            setError(response.errors)
            return;
        }

        router.refresh()
        store.setName("")
    }
  return (
    <Card className='w-1/3'>
    <CardHeader>
        <CardTitle>Create a new Class</CardTitle>
        <CardDescription>Fill up the required fields</CardDescription>
    </CardHeader>
    <CardContent>
        <form className='space-y-6'
            onSubmit={onSubmit}
        >
            {/* <div className="">
                <Label>Class Name</Label>
                <Input 
                    value={store.name}
                    disabled={true}
                    onChange={(e) => store.setName(e.target.value)}
                    placeholder='Class Name'
                    />
            </div> */}

            <div>
                <Label className=''>Grade</Label>
                <Select 

                    value={store.gradeId.toString()}
                    onValueChange={(value) => {
                        store.setGradeId(parseInt(value))
                        store.setName(divs.map((item)=> (item.grades.find((grade) => grade.id === parseInt(value))?.name || "")).join(""))
                    }}
                    
                >
                <SelectTrigger className="">
                <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem  value={"0"}>
                        Select Grade
                    </SelectItem>
                {
                    divs.map((item) => (
                    item.grades.length > 0 &&
                    <SelectGroup key={item.id}>
                        <SelectLabel className='bg-primary/20 text-sm px-2 mt-2 text-center'>{item.name}</SelectLabel>
                        {
                            item.grades.map((grade) => (
                            <SelectItem key={grade.id} value={grade.id.toString()}>
                                {grade.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>

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
  

            <Button disabled= {loading} type='submit'>{loading ? "Loading..." : "Add Class"}</Button>
        </form>
    </CardContent>
    </Card>
  )
}

export default AddClass