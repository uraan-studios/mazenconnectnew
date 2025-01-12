import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SWOTModule {
    strength: string;
    weakness: string;
    opportunity: string;
    threat: string;
    setStrength: (strength: string) => void;
    setWeakness: (weakness: string) => void;
    setOpportunity: (opportunity: string) => void;
    setThreat: (threat: string) => void;
}

const useSWOTModule = create<SWOTModule>()(
    persist(
        (set) => ({
            strength: "",
            weakness: "",
            opportunity: "",
            threat: "",

            setStrength: (strength: string) => set({ strength }),
            setWeakness: (weakness: string) => set({ weakness }),
            setOpportunity: (opportunity: string) => set({ opportunity }),
            setThreat: (threat: string) => set({ threat }),
        }),
        {
            name: "swot-module-storage", // key for the persisted state
            storage: createJSONStorage(() => sessionStorage),  // Use localStorage for persistence (can also use sessionStorage)
        }
    )
);

export default useSWOTModule;