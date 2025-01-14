"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { sendEmail } from '@/actions/email'

const TextNotification = () => {
    const [email, setEmail] = React.useState('')
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(email)
        if (!email) {
            alert('Please enter your email')
            return
        }
        await sendEmail({
            email,
            subject: 'Mazen Connect',
            message: 'Hello, this is a test message from Mazen Connect.',
        })
        alert('Email sent successfully!')
    }
  return (
    <Card>
        <CardHeader>
            <CardTitle className='text-lg font-medium'>Text Notification</CardTitle>
        </CardHeader>
        <CardContent className=''>
            <form onSubmit={submit} className='flex flex-col gap-4'>

                <Input
                    placeholder='Enter your email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                <Button type='submit' className='w-full'>
                    Send
                </Button>
            </form>
        </CardContent>
    </Card>
  )
}

export default TextNotification
