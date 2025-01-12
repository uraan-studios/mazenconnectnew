"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useTennufusStore from '@/stores/principalReport/teneffus';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const TeneffusModule = () => {
    const store = useTennufusStore();
  return (
    <div className="space-y-6">

      <Card>
      <CardHeader>
          <CardTitle>Teneffus Module</CardTitle>
          <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div> 
          <Label>Early Year Sessions</Label>
          <Input
          type='number'
          value={store.ealyYears}
          onChange={(e) => store.setEalyYears(parseInt(e.target.value))}
          min={0}
          />
        </div>

        <div>
          <Label>Primary Year Sessions</Label>
          <Input
          type='number'
          value={store.primaryYears}
          onChange={(e) => store.setPrimaryYears(parseInt(e.target.value))}
          min={0}
          />
        </div>

        <div> 
          <Label>Middle Year Sessions</Label>
          <Input
          type='number'
          value={store.middleYears}
          onChange={(e) => store.setMiddleYears(parseInt(e.target.value))}
          min={0}
          />
        </div>


        <div>

        <Label>Remarks</Label>
        <Textarea
          value={store.remarks}
          onChange={(e)=> store.setRemarks(e.target.value)}
          />
        </div>
      </CardContent>
      </Card>



    </div>  )
}

export default TeneffusModule