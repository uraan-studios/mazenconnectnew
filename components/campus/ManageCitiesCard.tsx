import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import CityCell from './cityCell'
import { getCities } from '@/actions/cities'



const ManageCitiesCard = async () => {
    const cities = await getCities()
  return (
    <Card>
                <CardHeader>
                    <CardTitle>Cities</CardTitle>
                    <CardDescription>Manage Cities</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table className='bg-secondary/15 p-6 rounded-md my-4 overflow-clip'>
                        <TableHeader className='bg-secondary '>
                            <TableRow>
                                <TableHead className="w-[100px] text-secondary-foreground">Serial</TableHead>
                                <TableHead className='text-secondary-foreground'>City</TableHead>
                                <TableHead className='text-right text-secondary-foreground'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cities.length > 0 ? (
                                cities.map((city) => (
                                    <CityCell key={city.id} data={city} />
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">
                                        No cities found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2}>Total Cities</TableCell>
                                <TableCell className="text-right">{cities.length}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </CardContent>

                
            </Card>
  )
}

export default ManageCitiesCard