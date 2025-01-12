import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ActivityModuleActivity {
    id: number;
    name: string;
    description: string;
    date: string; // Added date field (ISO format or any date string format)
}

interface ActivityModule {
    activities: ActivityModuleActivity[];
    remarks: string;

    setActivities: (activities: ActivityModuleActivity[]) => void;
    setRemarks: (remarks: string) => void;

    addActivity: (newActivity: ActivityModuleActivity) => void;
    updateActivity: (activityId: number, updatedActivity: Partial<ActivityModuleActivity>) => void;
    removeActivity: (activityId: number) => void;
}

const useActivityStore = create<ActivityModule>()(
    persist(
        (set) => ({
            activities: [],
            remarks: "",

            setActivities: (activities: ActivityModuleActivity[]) => set({ activities }),
            setRemarks: (remarks: string) => set({ remarks }),

            addActivity: (newActivity: ActivityModuleActivity) =>
                set((state) => ({
                    activities: [...state.activities, newActivity],
                })),

            updateActivity: (activityId: number, updatedActivity: Partial<ActivityModuleActivity>) =>
                set((state) => ({
                    activities: state.activities.map((act) =>
                        act.id === activityId ? { ...act, ...updatedActivity } : act
                    ),
                })),

            removeActivity: (activityId: number) =>
                set((state) => ({
                    activities: state.activities.filter((act) => act.id !== activityId),
                })),
        }),
        {
            name: "activity-module-storage", // name of the item in storage
            storage: createJSONStorage(() => sessionStorage), // using sessionStorage
        }
    )
);

export default useActivityStore;
