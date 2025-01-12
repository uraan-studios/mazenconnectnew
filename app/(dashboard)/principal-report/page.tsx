import AnimatedHeading from '@/components/general/animatedHeading'
import PrincipalReportModule from '@/components/principalReport/module/PrincipalModule'
import { validateRequest } from '@/lib/validateSessions'
import React from 'react'

const PrincipalReportPage = async () => {
  const session = await validateRequest()
  return (
    <div className='py-6'>
      <div>
        <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Manage' varient='heading' />
        <AnimatedHeading className='font-misologist font-normal' title='Principal Report' varient='heading' />
      </div>

      <PrincipalReportModule isAdmin={(session.user?.isSuperUser || false)}/>
    </div>
  )
}

export default PrincipalReportPage