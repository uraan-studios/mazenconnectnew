"use client"
import React from 'react'
import { Button } from '../ui/button'
import { logout } from '@/actions/auth/logout'
import { LogOutIcon } from 'lucide-react'

const Logout = () => {
  return (
    <form
    onSubmit={()=> logout()}
        // action={logout}
    >

        <Button type='submit'
        className='my-6 w-full flex gap-4'
        >
            Log Out
            <LogOutIcon className='h-4 w-4' />

        </Button>
        </form>
  )
}

export default Logout