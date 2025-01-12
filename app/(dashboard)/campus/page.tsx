import ManageCampusCard from '@/components/campus/ManageCampusCard'
import ManageCitiesCard from '@/components/campus/ManageCitiesCard'
import { Separator } from '@/components/ui/separator'
import React, { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import AnimatedHeading from '@/components/general/animatedHeading'
import { validateRequest } from '@/lib/validateSessions'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

const CampusPage = async() => {
    const session = await validateRequest()
    if(!session.user?.isSuperUser) {
        return (
            <h1>{`You can't access this Page`}</h1>
        )
    }

  return (
    <div className='py-6'>
            <div className="mb-4">
            <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Manage' varient='heading' />
            <AnimatedHeading className='font-misologist font-normal' title='Campuses' varient='heading' />
           
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/campus">Campus</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbPage>List</BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>

            </div>
        <div className='flex gap-4'>
            <div className="flex-grow">
                <Suspense fallback={
                    <Skeleton className="min-h-64 px-6 py-8 space-y-6">
                        <Skeleton className='h-6 w-24'/>
                        <Skeleton className='h-36 w-full'/>
                    </Skeleton>
                }>
                    <ManageCampusCard/>
                </Suspense>
            </div>
            
           
        </div>

        <Separator className='my-6 opacity-25'/>

        <div className='flex gap-4'>
            <div className="flex-grow">
                <Suspense fallback={
                    <Skeleton className="min-h-64 px-6 py-8 space-y-6">
                        <Skeleton className='h-6 w-24'/>
                        <Skeleton className='h-36 w-full'/>
                    </Skeleton>
                }>
                    <ManageCitiesCard/>
                </Suspense>
            </div>

          
        </div>
    </div>
  )
}

export default CampusPage