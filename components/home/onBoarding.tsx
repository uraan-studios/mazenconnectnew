
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import OnBoardingInner from './onBoardingInner'
import { Separator } from '../ui/separator'

const OnBoarding =async () => {
  return (
    <Card>
        <CardHeader>
            <CardTitle className='text-lg font-medium'>Onboarding</CardTitle>
        </CardHeader>

        <CardContent className=''>
            <div className='bg-primary/25 rounded-lg p-2 font-semibold'>
                <ol className='list-decimal text-sm p-4'>
                    <li>Add your employee</li>
                    <Separator className='my-4'/>
                    <li>Add your class</li>
                    <Separator className='my-4'/>
                    <li>Test notification</li>
                    <Separator className='my-4'/>
                    <li>Create principal report</li>
                    
                </ol>
            </div>
        </CardContent>      
    </Card>
  )
}

export default OnBoarding
