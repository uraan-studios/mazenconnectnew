"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useHCDModule } from '@/stores/principalReport/hcd';
import { Separator } from '@/components/ui/separator';
import { useELPModule } from '@/stores/principalReport/elp';


const ELPModule = () => {
  const store = useELPModule()
  return (
    <div className="space-y-6">

      <Card>
      <CardHeader>
          <CardTitle>ELP Module</CardTitle>
          <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
      </CardHeader>
      <CardContent>

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
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade1Planner}
                    onChange={(e) => store.setGrade1Planner(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade2Planner}
                    onChange={(e) => store.setGrade2Planner(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade3Planner}
                    onChange={(e) => store.setGrade3Planner(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade4Planner}
                    onChange={(e) => store.setGrade4Planner(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade5Planner}
                    onChange={(e) => store.setGrade5Planner(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade6Planner}
                    onChange={(e) => store.setGrade6Planner(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade7Planner}
                    onChange={(e) => store.setGrade7Planner(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade8Planner}
                    onChange={(e) => store.setGrade8Planner(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-semibold">Worksheets</TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade1Worksheets}
                    onChange={(e) => store.setGrade1Worksheets(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade2Worksheets}
                    onChange={(e) => store.setGrade2Worksheets(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade3Worksheets}
                    onChange={(e) => store.setGrade3Worksheets(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade4Worksheets}
                    onChange={(e) => store.setGrade4Worksheets(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade5Worksheets}
                    onChange={(e) => store.setGrade5Worksheets(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade6Worksheets}
                    onChange={(e) => store.setGrade6Worksheets(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade7Worksheets}
                    onChange={(e) => store.setGrade7Worksheets(parseInt(e.target.value, 10) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="max-w-20"
                    type="number"
                    value={store.grade8Worksheets}
                    onChange={(e) => store.setGrade8Worksheets(parseInt(e.target.value, 10) || 0)}
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
          value={store.remarks}
          onChange={(e)=> store.setRemarks(e.target.value)}
          />
      </CardContent>
      </Card>
    </div>
  )
}

export default ELPModule