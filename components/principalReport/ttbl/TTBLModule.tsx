"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import useTTBLModule from '@/stores/principalReport/ttbl';
import ContentModule from './content/ContentModule';
import { Separator } from '@/components/ui/separator';


const TTBLModule = () => {
  const store = useTTBLModule()
  return (
    <div className="space-y-6">

      <Card>
      <CardHeader>
          <CardTitle>TTBL Module</CardTitle>
          <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
      </CardHeader>
      <CardContent>
          <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
            <TableHeader className='bg-secondary '>
              <TableRow>
                <TableHead  className='text-secondary-foreground'>Item</TableHead>
                <TableHead  className='text-secondary-foreground'>Campus Requirements</TableHead>
                <TableHead  className='text-secondary-foreground'>Available</TableHead>
                <TableHead  className='text-secondary-foreground'>Working</TableHead>
                <TableHead  className='text-secondary-foreground'>Out of Order</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              <TableRow>
                <TableCell>Smart Board</TableCell>
                <TableCell>
                  <Input
                    type='number'
min= {0}
                    value={store.smartBoard.campusRequirement}
                    onChange={(e) => store.setSmartBoard({...store.smartBoard, campusRequirement: parseInt(e.target.value, 10) || 0})}
                  />
                </TableCell>

                <TableCell>
                  <Input
                    type='number'
min= {0}
                    value={store.smartBoard.available}
                    onChange={(e) => store.setSmartBoard({...store.smartBoard, available: parseInt(e.target.value, 10) || 0})}
                  />
                </TableCell>

                <TableCell>
                  <Input
                    type='number'
min= {0}
                    value={store.smartBoard.working}
                    onChange={(e) => store.setSmartBoard({...store.smartBoard, working: parseInt(e.target.value, 10) || 0})}
                  />
                </TableCell>

                <TableCell>
                  <Input
                    type='number'
min= {0}
                    value={store.smartBoard.outOfOrder}
                    onChange={(e) => store.setSmartBoard({...store.smartBoard, outOfOrder: parseInt(e.target.value, 10) || 0})}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Projectors</TableCell>
                <TableCell>
                  <Input
                    type='number'
min= {0}
                    value={store.projectors.campusRequirement}
                    onChange={(e) => store.setProjectors({...store.projectors, campusRequirement: parseInt(e.target.value, 10) || 0})}
                  />
                </TableCell>

                <TableCell>
                  <Input
                    type='number'
min= {0}
                    value={store.projectors.available}
                    onChange={(e) => store.setProjectors({...store.projectors, available: parseInt(e.target.value, 10) || 0})}
                  />
                </TableCell>

                <TableCell>
                  <Input
                    type='number'
min= {0}
                    value={store.projectors.working}
                    onChange={(e) => store.setProjectors({...store.projectors, working: parseInt(e.target.value, 10) || 0})}
                  />
                </TableCell>

                <TableCell>
                  <Input
                    type='number'
min= {0}
                    value={store.projectors.outOfOrder}
                    onChange={(e) => store.setProjectors({...store.projectors, outOfOrder: parseInt(e.target.value, 10) || 0})}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Laptops</TableCell>
                <TableCell>
                  <Input
                    type='number'
min= {0}
                    value={store.laptops.campusRequirement}
                    onChange={(e) => store.setLaptops({...store.laptops, campusRequirement: parseInt(e.target.value, 10) || 0})}
                  />
                </TableCell>

                <TableCell>
                  <Input
                    type='number'
min= {0}
                    value={store.laptops.available}
                    onChange={(e) => store.setLaptops({...store.laptops, available: parseInt(e.target.value, 10) || 0})}
                  />
                </TableCell>

                <TableCell>
                  <Input
                    type='number'
min= {0}
                    value={store.laptops.working}
                    onChange={(e) => store.setLaptops({...store.laptops, working: parseInt(e.target.value, 10) || 0})}
                  />
                </TableCell>

                <TableCell>
                  <Input
                    type='number'
min= {0}
                    value={store.laptops.outOfOrder}
                    onChange={(e) => store.setLaptops({...store.laptops, outOfOrder: parseInt(e.target.value, 10) || 0})}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
      </CardContent>
      </Card>

      <Card>
      <CardHeader>
          <CardTitle>TTBL Remarks</CardTitle>
          <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
      </CardHeader>
      <CardContent>
          <Textarea
          value={store.remarks}
          onChange={(e)=> store.setRemarks(e.target.value)}
          />
      </CardContent>
      </Card>

      <ContentModule/>
      
      <Separator className='my-4'/>

      <Card>
      <CardHeader>
          <CardTitle>TTBI Remarks</CardTitle>
          <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
      </CardHeader>
      <CardContent>
          <Textarea
          value={store.TTBIremarks}
          onChange={(e)=> store.setTTBIremarks(e.target.value)}
          />
      </CardContent>
      </Card>

    </div>
  )
}

export default TTBLModule