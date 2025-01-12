import AnimatedHeading from '@/components/general/animatedHeading'
import AddNotification from '@/components/notification/AddNotification'
import NotificationModule from '@/components/notification/NotificationModule'
import { validateRequest } from '@/lib/validateSessions'
import React from 'react'

const NotificationPage = async() => {
    const session = await validateRequest()
    if(!session.user?.isSuperUser) {
        return (
            <h1>{`You can't access this Page`}</h1>
        )
    }
  return (
    <div className='py-6 space-y-4'>
    <div>
      <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Notify' varient='heading' />
      <AnimatedHeading className='font-misologist font-normal' title='Campuses' varient='heading' />
    </div>

      {/* <EmployeesTable/> */}
      
      <AddNotification/>
      <NotificationModule/>
  </div>
  )
}

export default NotificationPage