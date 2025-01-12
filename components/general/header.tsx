import { validateRequest } from '@/lib/validateSessions'
import Image from 'next/image'
import React from 'react'
import Logout from './Logout'
import { Button } from '../ui/button'
import { HelpCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { SidebarTrigger } from '../ui/sidebar'
import SessionExpiry from './SessionExpiry'

const Header = async () => {
    const request = await validateRequest()
  return (
    <div className='top-0 left-0 z-50 absolute h-20 w-full bg-white dark:bg-black text-secondary-foreground'>
    <div className='bg-secondary/15 w-full flex justify-between items-center'>
      {/* Light theme image */}
      <div className="mx-4 space-x-4 flex items-center gap-4">
        <SidebarTrigger/>
        <SessionExpiry sessionExpiry={request.session?.expiresAt}/>
      </div>

      {/* Session expiration */}



      <div className="flex items-center my-2 mx-4 gap-4 h-12">
         <div>
            <p className='text-[12px] -mb-1 opacity-60'>Reporting Month:</p>
            <h4 className='font-semibold t'>{new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'long' })}</h4>
        </div>

        <Link href={'/docs'}>
            <Button variant={'outline'} className='gap-2'>
                Get Help
                <HelpCircleIcon className='h-4 w-4' />
            </Button>
        </Link>
        
        <Button variant={'outline'} className='gap-2'>
            <div className="rounded-full h-7 w-7 bg-accent flex items-center justify-center font-bold">
                {request.user?.name[0]}
            </div>
            <div className='h-full pb-2 -mt-2 text-start'>
                <p className='text-normal'>{request.user?.name}</p>
                <p className='text-[10px] font-light -my-1'>{request.user?.isSuperUser ? 'Admin' : 'User'}</p>
            </div>
        </Button>


        <Logout/>
      </div>
    </div>
    </div>
  )
}

export default Header
