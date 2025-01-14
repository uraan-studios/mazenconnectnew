"use server"

import { db } from "@/lib/db"
import { validateRequest } from "@/lib/validateSessions";
import { z } from "zod";
import { getCampusEmails } from "./campus";
import { sendEmail } from "./email";

export const getNotifications = async (date: Date) => {
    const session = await validateRequest();
    if (!session.user) {
        return [];
    }

    // Create a new Date object for start and end of the day to avoid mutating the original date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // 00:00:00

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // 23:59:59

    // Query notifications between startOfDay and endOfDay
    const notifications = await db.notification.findMany({
        where: {
            createdAt: {
                  // Notification created before or at end of the day
            },
            expireAt: {
                gte: startOfDay,  // Notification expires after or on start of the day
            },
        },
    });

    return notifications;
};


const notificationSchema = z.object({
    titleContent: z.string().min(1, 'Notification title is required').max(100, 'Notification title is too long'),
    message: z.string().min(1, 'Notification message is required').max(100, 'Notification message is too long'),
    expireAt: z.date()
});

export const createNotification = async (data: z.infer<typeof notificationSchema>) => {
    const session = await validateRequest()
    if (!session.user) {
        return {
            errors: "You must be logged in to create a department."
        }
    }
    
    try {
        await db.notification.create({
            data: {
                title: data.titleContent,
                message: data.message,
                expireAt: data.expireAt
            }
        })

        const emails = await getCampusEmails()
        for (const email of emails) {
            await sendEmail({
                email: email.email,
                subject: 'Notification',
                message: data.message
            })
        }

        return { success: true }; 

    } catch (error) {
        // Return the first error message from the general errors
        return {
            errors: "Failed to create department. Please try again later.",
        };
    }
}

export const deleteNotification = async (id: number) => {
    const {session} = await validateRequest()
    if (!session) return {success: false}

    console.log("deleting")
    await db.notification.delete({
        where: {
            id: id
        }
    })

    return {success: true}

    
}

export const getAllnotifications = async () => {
    return await db.notification.findMany({
        where: {
            expireAt: {
                gt: new Date()
            }
        }
    })
}