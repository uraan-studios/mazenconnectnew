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
import { deleteDepartment } from '@/actions/roles'
import { useRouter } from 'next/navigation'
  


const DeleteDepartment = ({id}: {id: number}) => {
  const router = useRouter()

    const onSubmit = async () => {
        const result = await deleteDepartment(id)
        if (result.success) {
            alert('Department deleted successfully')
            router.refresh()
        }
        else {
            alert('Failed to delete designation')
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

export default DeleteDepartment