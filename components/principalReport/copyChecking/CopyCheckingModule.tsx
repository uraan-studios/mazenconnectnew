// "use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getGrades } from '@/actions/grade';
import CheckingTable from './CheckingTable';
import { getClassesWSections } from '@/actions/prinicpalReport';

const CopyCheckingModule = async () => {
    // const classes = useClassStore()
    const grades = await getGrades()
        const classes = await getClassesWSections()
    
    
  return (
    <div className="space-y-6">

      <Card>
      <CardHeader>
          <CardTitle>Rechecking Module</CardTitle>
          <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
      </CardHeader>
      <CardContent>
        <CheckingTable divisions={grades}  data={classes} />
      </CardContent>
      </Card>






    </div>
  )
}

export default CopyCheckingModule