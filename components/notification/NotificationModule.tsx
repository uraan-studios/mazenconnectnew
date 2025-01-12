import { getAllnotifications } from '@/actions/notification'
import React from 'react'
import DeleteNotification from './DeleteNotification'

const NotificationModule = async () => {
    const notifications = await getAllnotifications()

  return (
    <div>
        <h2 className="text-xl font-semibold">Live Notifications</h2>
        {
            notifications.map((notification, index) => (
                <div className='flex justify-between items-center bg-accent text-accent-foreground px-4 py-2 my-2 rounded-xl' key={index}>
                    <p className='text-lg font-semibold'>{notification.title}</p>
                    <p>{notification.message}</p>
                    <DeleteNotification id={notification.id}/>
                </div>
            ))
        }
    </div>
  )
}

export default NotificationModule