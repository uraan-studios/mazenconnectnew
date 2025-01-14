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
import { deleteDesignation } from '@/actions/roles'
  


const DeleteDesignation = ({id}: {id: number}) => {
    const onSubmit = async () => {
        const result = await deleteDesignation(id)
        if (result.success) {
            alert('Designation deleted successfully')
        }
        else {
            alert('Failed to delete designation')
        }
    }
  return (
    <AlertDialog>
  <AlertDialogTrigger>
    <div className='bg-destructive py-1 px-4 rounded-xl hover:bg-primary text-primary-foreground'>remove</div>
  </AlertDialogTrigger>
  <AlertDialogContent className='bg-card text-card-foreground'>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.This will permanently delete the designation.
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

export default DeleteDesignation