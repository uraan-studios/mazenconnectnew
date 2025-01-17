"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useHCDModule } from '@/stores/principalReport/hcd';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';


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
          
          <Table className='bg-secondary/25 p-6 rounded-md my-4 overflow-clip w-full'>
            <TableHeader className='bg-secondary '>
              <TableRow>
                <TableHead className='text-secondary-foreground'>-</TableHead>
                <TableHead className='text-secondary-foreground'>Workload</TableHead>
                <TableHead className='text-secondary-foreground'>Meetings</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className='text-semibold'>-</TableCell>
                <TableCell>
                  <Input
                    className='max-w-20'
                    type='number'
                    value={store.workload}
                    onChange={(e) => store.setWorkload(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className='max-w-20'
                    type='number'
                    value={store.meetings}
                    onChange={(e) => store.setMeeints(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table className='bg-secondary/25 p-6 rounded-md my-4 overflow-clip'>
            <TableHeader className='bg-secondary '>
              <TableRow>
                <TableHead className='text-secondary-foreground'>-</TableHead>
                <TableHead className='text-secondary-foreground'>Pre-Nursery</TableHead>
                <TableHead className='text-secondary-foreground'>Nursery</TableHead>
                <TableHead className='text-secondary-foreground'>Kindergarten</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              <TableRow>
                <TableCell className='text-semibold'>Planner</TableCell>
                <TableCell>
                  <Switch
                    checked={store.preNurseryPlanner}
                    onCheckedChange={(value) => store.setPreNurseryPlanner(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.nurseryPlanner}
                    onCheckedChange={(value) => store.setNurseryPlanner(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.kindergartenPlanner}
                    onCheckedChange={(value) => store.setKindergartenPlanner(value)}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-semibold">Worksheets</TableCell>
                <TableCell>
                  <Switch
                    checked={store.preNurseryWorksheets}
                    onCheckedChange={(value) => store.setPreNurseryWorksheets(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.nurseryWorksheets}
                    onCheckedChange={(value) => store.setNurseryWorksheets(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.kindergartenWorksheets}
                    onCheckedChange={(value) => store.setKindergartenWorksheets(value)}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-semibold">TTBL</TableCell>
                <TableCell>
                  <Switch
                    checked={store.preNurseryTTBL}
                    onCheckedChange={(value) => store.setPreNurseryTTBL(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.nurseryTTBL}
                    onCheckedChange={(value) => store.setNurseryTTBL(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.kindergartenTTBL}
                    onCheckedChange={(value) => store.setKindergartenTTBL(value)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Separator className='my-6' />

          {/* Primary And Middle Years */}
          <Table className="bg-secondary/25 p-6 rounded-md my-4 overflow-clip">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="text-secondary-foreground">-</TableHead>
                <TableHead className="text-secondary-foreground">Grade 1</TableHead>
                <TableHead className="text-secondary-foreground">Grade 2</TableHead>
                <TableHead className="text-secondary-foreground">Grade 3</TableHead>
                <TableHead className="text-secondary-foreground">Grade 4</TableHead>
                <TableHead className="text-secondary-foreground">Grade 5</TableHead>
                <TableHead className="text-secondary-foreground">Grade 6</TableHead>
                <TableHead className="text-secondary-foreground">Grade 7</TableHead>
                <TableHead className="text-secondary-foreground">Grade 8</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="text-semibold">Planner</TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade1Planner}
                    onCheckedChange={(value) => store.setGrade1Planner(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade2Planner}
                    onCheckedChange={(value) => store.setGrade2Planner(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade3Planner}
                    onCheckedChange={(value) => store.setGrade3Planner(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade4Planner}
                    onCheckedChange={(value) => store.setGrade4Planner(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade5Planner}
                    onCheckedChange={(value) => store.setGrade5Planner(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade6Planner}
                    onCheckedChange={(value) => store.setGrade6Planner(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade7Planner}
                    onCheckedChange={(value) => store.setGrade7Planner(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade8Planner}
                    onCheckedChange={(value) => store.setGrade8Planner(value)}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-semibold">Worksheets</TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade1Worksheets}
                    onCheckedChange={(value) => store.setGrade1Worksheets(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade2Worksheets}
                    onCheckedChange={(value) => store.setGrade2Worksheets(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade3Worksheets}
                    onCheckedChange={(value) => store.setGrade3Worksheets(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade4Worksheets}
                    onCheckedChange={(value) => store.setGrade4Worksheets(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade5Worksheets}
                    onCheckedChange={(value) => store.setGrade5Worksheets(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade6Worksheets}
                    onCheckedChange={(value) => store.setGrade6Worksheets(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade7Worksheets}
                    onCheckedChange={(value) => store.setGrade7Worksheets(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade8Worksheets}
                    onCheckedChange={(value) => store.setGrade8Worksheets(value)}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-semibold">TTBL</TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade1TTBL}
                    onCheckedChange={(value) => store.setGrade1TTBL(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade2TTBL}
                    onCheckedChange={(value) => store.setGrade2TTBL(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade3TTBL}
                    onCheckedChange={(value) => store.setGrade3TTBL(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade4TTBL}
                    onCheckedChange={(value) => store.setGrade4TTBL(value)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={store.grade5TTBL}
                    onCheckedChange={(value) => store.setGrade5TTBL(value)}
                  />
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
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
          value={store.remarks}
          onChange={(value)=> store.setRemarks(value.target.value)}
          />
      </CardContent>
      </Card>
    </div>
  )
}

export default HCDModule