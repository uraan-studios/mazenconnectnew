
import { thisMonthPrincipalReport } from '@/actions/prinicpalReport'
import AnimatedHeading from '@/components/general/animatedHeading'
import ClassModule from '@/components/principalReport/class/ClassModule'
import PrincipalReportNav from '@/components/principalReport/PrincipalReportNav'
import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense } from 'react'

const AddPrincipalReportPage = async () => {
  const  report = await thisMonthPrincipalReport()
//   if (report !== null) {
//     return <div>Report already submitted</div>
//   }

  return (
    <div className='bg-secondary/30 p-6  rounded-xl'>
        <div>
            <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Student Details' varient='heading' />
            <AnimatedHeading className='font-misologist font-normal' title='Principal Report' varient='heading' />
        </div>

        <PrincipalReportNav/>

        <Suspense fallback={
            <Skeleton className="min-h-64 px-6 py-8 space-y-6">
                <Skeleton className='h-6 w-24'/>
                <Skeleton className='h-36 w-full'/>
            </Skeleton>
        }>
            <ClassModule/>
        </Suspense>
        

    </div>

)}

export default AddPrincipalReportPage