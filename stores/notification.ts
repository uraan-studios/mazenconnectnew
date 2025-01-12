import { create } from "zustand";

interface NotificationState {
    titleContent: string;
    message: string;
    expireAt: Date; // Expiry date should be of type Date
    setTitleContent: (titleContent: string) => void;
    setMessage: (message: string) => void;
    setExpireAt: (expireAt: Date) => void;
}

// Function to get the date for tomorrow
const getTomorrowDate = (): Date => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow's date
    return tomorrow;
};

export const useNotificationStore = create<NotificationState>()(
    (set) => ({
        titleContent: "",
        message: "",
        expireAt: getTomorrowDate(), // Set to tomorrow's date
        setTitleContent: (titleContent: string) => set(() => ({ titleContent })),
        setMessage: (message: string) => set(() => ({ message })),
        setExpireAt: (expireAt: Date) => set(() => ({ expireAt })),
    })
);
