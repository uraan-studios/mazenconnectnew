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
    <Button variant="destructive">Delete</Button>
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