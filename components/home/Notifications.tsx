"use client";
import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {  Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getNotifications } from '@/actions/notification';

// Define the Notification type
type Notification = {
    id: number;
    title: string;
    message: string | null;
    createdAt: Date;
    expireAt: Date | null;
  };
  
  const NotificationsComp = () => {
    // Use the Notification type for the state
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [notifications, setNotifications] = useState<Notification[]>([]);
  
    // Fetch notifications whenever the selected date changes
    useEffect(() => {
      const fetchNotifications = async () => {
        const result = await getNotifications(selectedDate);
        if (result.length === 0) {
          return;
        }
        setNotifications(result); // Set the fetched notifications
      };
  
      fetchNotifications();
    }, [selectedDate]);

  return (
    <div className=" rounded-md space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(e)=> setSelectedDate(e as Date)} // Update date when selected
        className="rounded-md border bg-primary/10"
      />

      <ScrollArea className="h-[350px] max-w-72 rounded-md border p-4 bg-primary/10">
        <h2 className="text-lg font-semibold">Notifications</h2>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Alert key={notification.id} className="bg-card text-card-foreground max-w-72 my-2">
              <Bell className="h-4 w-4" />
              <AlertTitle>{notification.title}</AlertTitle>
              <AlertDescription className="text-xs">
                {notification.message}
              </AlertDescription>
            </Alert>
          ))
        ) : (
          <Alert className="bg-card text-card-foreground max-w-72 my-2">
            <Bell className="h-4 w-4" />
            <AlertTitle>No notifications</AlertTitle>
            <AlertDescription className="text-xs">
              No notifications available for the selected date.
            </AlertDescription>
          </Alert>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationsComp;
