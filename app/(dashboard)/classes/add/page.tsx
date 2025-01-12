
import { getGrades } from '@/actions/grade'
import AddClass from '@/components/classes/add/Class'
import ClassTable from '@/components/classes/ClassTable'
import AddSection from '@/components/classes/sections/AddSection'
import AnimatedHeading from '@/components/general/animatedHeading'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense } from 'react'


const ClassesAddPage = async () => {
  const division = await getGrades()


  return (
    <div className='py-6 space-y-4'>
    <div>
      <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Add' varient='heading' />
      <AnimatedHeading className='font-misologist font-normal' title='Campus Classes' varient='heading' />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/classes">Classes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <Suspense fallback={
            <Skeleton className="min-h-64 px-6 py-8 space-y-6">
                <Skeleton className='h-6 w-24'/>
                <Skeleton className='h-36 w-full'/>
            </Skeleton>
        }>
      <div className='flex gap-4'>
        <AddClass divs = {division}/>
        <AddSection classId={undefined}/>
      </div>
    </Suspense>
    <Suspense fallback={
            <Skeleton className="min-h-64 px-6 py-8 space-y-6">
                <Skeleton className='h-6 w-24'/>
                <Skeleton className='h-36 w-full'/>
            </Skeleton>
        }>
      <ClassTable/>
    </Suspense>



  </div>
  )
}

export default ClassesAddPage