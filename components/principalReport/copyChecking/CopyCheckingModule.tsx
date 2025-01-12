// "use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useClassStore from '@/stores/principalReport/classes';
import { getGrades } from '@/actions/grade';
import CheckingTable from './CheckingTable';
import { Textarea } from '@/components/ui/textarea';

const CopyCheckingModule = async () => {
    // const classes = useClassStore()
    const grades = await getGrades()
  return (
    <div className="space-y-6">

      <Card>
      <CardHeader>
          <CardTitle>Rechecking Module</CardTitle>
          <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
      </CardHeader>
      <CardContent>
        <CheckingTable divisions={grades} />
      </CardContent>
      </Card>






    </div>
  )
}

export default CopyCheckingModule