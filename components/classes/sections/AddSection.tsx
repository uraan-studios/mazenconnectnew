import { getClasses } from '@/actions/class'
import React from 'react'
import SectionForm from './SectionForm'

const AddSection = async ({classId}: {classId: number | undefined}) => {
    const classes = await getClasses()
  return (

    
    <SectionForm data={classes} classId={classId}/>
  )
}

export default AddSection