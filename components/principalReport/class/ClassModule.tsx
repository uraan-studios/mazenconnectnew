import { getClassesWSections } from '@/actions/prinicpalReport'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ClassTable from './ClassTable'


const ClassModule = async () => {
    const classes = await getClassesWSections()
  return (
    <Card>
    <CardHeader>
        <CardTitle>Add Class</CardTitle>
        <CardDescription>Add Classes and Sections</CardDescription>
    </CardHeader>
    <CardContent>
        <ClassTable data= {classes}/>
    </CardContent>
    </Card>
  )
}

export default ClassModule