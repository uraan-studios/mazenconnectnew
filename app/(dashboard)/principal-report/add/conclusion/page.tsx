import AnimatedHeading from '@/components/general/animatedHeading'
import ConclusionModule from '@/components/principalReport/conclusion/ConclusionModule'
import PrincipalReportNav from '@/components/principalReport/PrincipalReportNav'
import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense } from 'react'

const PRConclusionPage = () => {
  return (
    <div className='py-6'>
    <div>
        <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Submit ' varient='heading' />
        <AnimatedHeading className='font-misologist font-normal' title='Principal Report' varient='heading' />
    </div>

    <PrincipalReportNav/>
    

    <Suspense fallback={
            <Skeleton className="min-h-64 px-6 py-8 space-y-6">
                <Skeleton className='h-6 w-24'/>
                <Skeleton className='h-36 w-full'/>
            </Skeleton>
        }>
        
        <ConclusionModule/>

    </Suspense>
    
</div>
  )
}

export default PRConclusionPage