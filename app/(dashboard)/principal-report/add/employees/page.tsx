
import AnimatedHeading from '@/components/general/animatedHeading'
import EmployeesModule from '@/components/principalReport/employees/EmployeesModule'
import PrincipalReportNav from '@/components/principalReport/PrincipalReportNav'
import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense } from 'react'

const AddPrincipalReportPage = async () => {
  return (
    <div className='bg-secondary/30 p-6  rounded-xl'>
        <div>
            <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Employee Details ' varient='heading' />
            <AnimatedHeading className='font-misologist font-normal' title='Principal Report' varient='heading' />
        </div>

        <PrincipalReportNav/>
        
      <Suspense fallback={
            <Skeleton className="min-h-64 px-6 py-8 space-y-6">
                <Skeleton className='h-6 w-24'/>
                <Skeleton className='h-36 w-full'/>
            </Skeleton>
        }>
        

        <EmployeesModule/>
    </Suspense>  

    </div>

)}

export default AddPrincipalReportPage