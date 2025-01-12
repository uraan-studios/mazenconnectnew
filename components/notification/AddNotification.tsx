"use client";
import React, {  useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import { format } from 'date-fns';
import { useNotificationStore } from '@/stores/notification';
import { createNotification } from '@/actions/notification';

const AddNotification = () => {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const notificationStore = useNotificationStore();
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        setError("");

        const response = await createNotification({
            titleContent: notificationStore.titleContent,
            message: notificationStore.message,
            expireAt: notificationStore.expireAt
        });

        setLoading(false)
        if (response.errors) {
            setError(response.errors);
            return;
        }

        router.refresh();
        notificationStore.setTitleContent(""); // Reset the title
        notificationStore.setMessage(""); // Reset the message
        notificationStore.setExpireAt(new Date()); // Reset the date to now (or any default you prefer)
    }

    const handleDateSelect = (date: Date) => {
        notificationStore.setExpireAt(date);
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Notification</CardTitle>
                <CardDescription>
                    {`It'll end up on all Dashboards.`}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4 flex flex-col bg-accent p-4 rounded-xl">

                    <div>
                        <Label>Title</Label>
                        <Input
                            value={notificationStore.titleContent}
                            onChange={(e) => notificationStore.setTitleContent(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label>Message</Label>
                        <Input
                            value={notificationStore.message}
                            onChange={(e) => notificationStore.setMessage(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label>Expiry</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {notificationStore.expireAt ? (
                                        //@ts-expect-error IDK WHY THIS IS WORKING
                                        format(new Date(notificationStore.expireAt), "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                     mode="single"
                                    selected={notificationStore.expireAt}
                                    onSelect={(e) => handleDateSelect(e as Date)} // Use the correct handler
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <Button disabled={loading} type="submit">Add</Button>
                </form>

                {error && (
                    <div className="py-4">
                        <Alert variant={'destructive'}>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Heads up!</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default AddNotification;
