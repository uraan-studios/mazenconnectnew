import React from 'react'

import { getTeachers } from '@/actions/prinicpalReport'
import WorkTable from './WorkTable'
import ObservationModule from '../observation/observationModule'
import { getSubjects } from '@/actions/subjects'

const WorkLoadModule = async() => {
const staff = await getTeachers()
const subjects = await getSubjects()

  return (
    <div>
        <WorkTable staff={staff} subjects={subjects}/>

        <ObservationModule/>
    </div>
  )
}

export default WorkLoadModule