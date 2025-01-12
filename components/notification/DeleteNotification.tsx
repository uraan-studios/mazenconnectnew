"use client"
import { Button } from '@/components/ui/button'
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
import { deleteEmployee } from '@/actions/employees'
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
        <Button variant="destructive">Delete</Button>
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