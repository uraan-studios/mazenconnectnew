"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from "@/components/ui/switch"
import useTTblContentModule from '@/stores/principalReport/ttblContent';

const ContentModule = () => {
  const store = useTTblContentModule();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>TTBL Content</CardTitle>
        <CardDescription>Submit if you received content from the TTBL</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
          <TableHeader className='bg-secondary'>
            <TableRow>
              <TableHead className='text-secondary-foreground'>Subject</TableHead>
              <TableHead className='text-secondary-foreground'></TableHead>
              <TableHead className='text-secondary-foreground'>CLLE</TableHead>
              <TableHead className='text-secondary-foreground'>CLLU</TableHead>
              <TableHead className='text-secondary-foreground'>MD</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Pre-Nursery</TableCell>
              <TableCell>
                <Switch
                  checked={store.preNurseryCLLE}
                  onCheckedChange={(value) => store.setPreNurseryCLLE(value)}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={store.preNurseryCLLU}
                  onCheckedChange={(value) => store.setPreNurseryCLLU(value)}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={store.preNurseryMD}
                  onCheckedChange={(value) => store.setPreNurseryMD(value)}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>Nursery</TableCell>
              <TableCell>
                <Switch
                  checked={store.nurseryCLLE}
                  onCheckedChange={(value) => store.setNurseryCLLE(value)}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={store.nurseryCLLU}
                  onCheckedChange={(value) => store.setNurseryCLLU(value)}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={store.nurseryMD}
                  onCheckedChange={(value) => store.setNurseryMD(value)}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>Kindergarten</TableCell>
              <TableCell>
                <Switch
                  checked={store.kindergartenCLLE}
                  onCheckedChange={(value) => store.setKindergartenCLLE(value)}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={store.kindergartenCLLU}
                  onCheckedChange={(value) => store.setKindergartenCLLU(value)}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={store.kindergartenMD}
                  onCheckedChange={(value) => store.setKindergartenMD(value)}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ContentModule;
