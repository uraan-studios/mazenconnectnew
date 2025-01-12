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
  


const DeleteEmployee = ({id}: {id: number}) => {
    const router = useRouter()

    const onSubmit = async () => {
        const result = await deleteEmployee(id)
        if (result.success) {
            router.refresh()
        }
        else {
            alert('Failed to delete Employee')
        }
    }
  return (
    <AlertDialog>
  <AlertDialogTrigger>
    <Button variant="destructive">Mark Left</Button>
  </AlertDialogTrigger>
  <AlertDialogContent className='bg-card text-card-foreground'>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.This will permanently delete the department.
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

export default DeleteEmployee