"use client"
import { addDepartment } from '@/actions/roles'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDepartmentStore } from '@/stores/roles'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const AddDepartment = () => {
    const store = useDepartmentStore()
    const router = useRouter()
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        const response = await addDepartment({name:store.name})
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
        <CardTitle>Add Department</CardTitle>
        <CardDescription>Add Department</CardDescription>
    </CardHeader>
    <CardContent>
        <form className='space-y-6'
            onSubmit={onSubmit}
        >
            <div className="">
                <Label>Department Name</Label>
                <Input 
                    value={store.name}
                    onChange={(e) => store.setName(e.target.value)}
                    placeholder='Class Name'
                    />
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
  

            <Button disabled={loading}>Add Department</Button>
        </form>
    </CardContent>
    </Card>
  )
}

export default AddDepartment