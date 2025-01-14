"use client"
import React from 'react'
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
import { deleteNotification } from '@/actions/notification'
  


const DeleteNotification = ({id}: {id: number}) => {
    const router = useRouter()

    const onSubmit = async () => {
        const result = await deleteNotification(id)
        if (result.success) {
            router.refresh()
        }
        else {
            alert('Failed to delete Notification')
        }
    }
  return (
    <AlertDialog>
    <AlertDialogTrigger>
        <div className='bg-destructive py-1 px-4 rounded-xl hover:bg-primary text-primary-foreground'>Delete</div>
    </AlertDialogTrigger>
    <AlertDialogContent className='bg-card text-card-foreground'>
        <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone.This will permanently delete the notitification.
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <form action={onSubmit}>

        <AlertDialogAction
            type='submit'
        >
            Continue
            </AlertDialogAction>
        </form>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>

  )
}

export default DeleteNotification