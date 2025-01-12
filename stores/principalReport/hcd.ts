import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface HCDModule {
    meetings: number;
    workload: number;
    reamrks: string;

    setMeetings: (meetings: number) => void;
    setWorkload: (workload: number) => void;
    setReamrks: (reamrks: string) => void;
}

export const useHCDModule = create<HCDModule>()(
    persist(
        (set) => ({
            meetings: 0,
            workload: 0,
            reamrks: "",

            setMeetings: (meetings: number) => set({ meetings }),
            setWorkload: (workload: number) => set({ workload }),
            setReamrks: (reamrks: string) => set({ reamrks }),
        }),
        {
            name: "hcd-module-storage", // key for the persisted state
            storage: createJSONStorage(() => sessionStorage),  // Use localStorage for persistence (can also use sessionStorage)
        }
    )
);