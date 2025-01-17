"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useELPModule } from '@/stores/principalReport/elp';
import { Switch } from '@/components/ui/switch';


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