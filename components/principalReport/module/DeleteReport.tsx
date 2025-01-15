"use client"
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { deletePrincipalReport } from '@/actions/prinicpalReport'

const DeleteReport = ({id}: {id: number}) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        setLoading(true)
        const result = await deletePrincipalReport(id)
        if (!result!.errors) {
            setLoading(false)
            router.replace('/principal-report')
            router.refresh()
        }
        else {
                setLoading(false)
            alert('Failed to delete Report')
        }
    }

    return  loading ? ( <div className='flex justify-center items-center'>
        <div className='flex justify-center items-center'>
            <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary-foreground'></div>
        </div>
    </div>) :
   (
    <AlertDialog>
    <AlertDialogTrigger>
    <div className='bg-destructive py-1 px-4 rounded-xl hover:bg-primary text-primary-foreground'>Delete REPORT</div>
    </AlertDialogTrigger>
    <AlertDialogContent className='bg-card text-card-foreground'>
        <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone.This will permanently delete the Report.
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
            onClick={onSubmit} 
            type='submit'
        >
            Continue
        </AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>

  )
}

export default DeleteReport