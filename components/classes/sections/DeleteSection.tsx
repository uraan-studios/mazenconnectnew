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
import { deleteSection } from '@/actions/class'
  


const DeleteSection = ({id}: {id: number}) => {
    const router = useRouter()

    const onSubmit = async () => {
        const result = await deleteSection(id)
        if (result.success) {
            router.refresh()
        }
        else {
            alert('Failed to delete Section')
        }
    }
  return (
    <AlertDialog>
  <AlertDialogTrigger>
    <div className='bg-destructive py-1 px-4 rounded-xl hover:bg-primary text-primary-foreground'>Delete Section</div>
  </AlertDialogTrigger>
  <AlertDialogContent className='bg-card text-card-foreground'>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.This will permanently delete the Section.
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

export default DeleteSection