"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useHCDModule } from '@/stores/principalReport/hcd';


const HCDModule = () => {
  const store = useHCDModule()
  return (
    <div className="space-y-6">

      <Card>
      <CardHeader>
          <CardTitle>HCD Module</CardTitle>
          <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
      </CardHeader>
      <CardContent>
          <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
            <TableHeader className='bg-secondary '>
              <TableRow>
                <TableHead  className='text-secondary-foreground'>ID</TableHead>
                <TableHead  className='text-secondary-foreground'>Meeintgs</TableHead>
                <TableHead  className='text-secondary-foreground'>WorkLoad</TableHead>

              </TableRow>
            </TableHeader>
            
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                  <Input
                  className='max-w-20'
                    type='number'
                    value={store.meetings}
                    onChange={(e) => store.setMeetings(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>

                <TableCell>
                  <Input
                   className='max-w-20'
                    type='number'
                    value={store.workload}
                    onChange={(e) => store.setWorkload(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
              </TableRow>

              
            </TableBody>
          </Table>
      </CardContent>
      </Card>

      <Card>
      <CardHeader>
          <CardTitle>Any Remarks</CardTitle>
          <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
      </CardHeader>
      <CardContent>
          <Textarea
          value={store.reamrks}
          onChange={(e)=> store.setReamrks(e.target.value)}
          />
      </CardContent>
      </Card>
    </div>
  )
}

export default HCDModule