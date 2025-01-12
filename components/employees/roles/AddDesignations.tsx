import React from 'react'
import { getRoles } from '@/actions/roles'
import DesignationForm from './DesignationForm'

const AddDesignation = async () => {
    const deps = await getRoles()
  return (
    <DesignationForm data={deps} />
  )
}

export default AddDesignation