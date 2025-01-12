import { getMonthlyReports } from '@/actions/newPrincipalReport'
import React from 'react'

const YearlyReports = async () => {
 const reports = await getMonthlyReports()

  return (
    <div>

  </div>
  )
}

export default YearlyReports