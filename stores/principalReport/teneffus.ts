import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TennufusModule {
    number: string;
    ealyYears: number;
    primaryYears: number;
    middleYears: number;

    remarks: string;

    setEalyYears: (ealyYears: number) => void;
    setPrimaryYears: (primaryYears: number) => void;
    setMiddleYears: (middleYears: number) => void;
    setNumber: (number: string) => void;
    setRemarks: (remarks: string) => void;
}

const useTennufusStore = create<TennufusModule>()(
    persist(
        (set) => ({
            number: "",
            remarks: "",
            ealyYears: 0,
            primaryYears: 0,
            middleYears: 0,

            setEalyYears: (ealyYears: number) => set({ ealyYears }),
            setPrimaryYears: (primaryYears: number) => set({ primaryYears }),   
            setMiddleYears: (middleYears: number) => set({ middleYears }),

            setNumber: (number: string) => set({ number }),
            setRemarks: (remarks: string) => set({ remarks }),
        }),
        {
            name: "tennufus-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useTennufusStore;