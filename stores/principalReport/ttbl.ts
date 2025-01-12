import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TTBLModuleSmartBoard {
    campusRequirement: number;
    available: number;
    working: number;
    outOfOrder: number;
}
interface TTBLModuleProjectors {
    campusRequirement: number;
    available: number;
    working: number;
    outOfOrder: number;
}
interface TTBLModuleLaptops {
    campusRequirement: number;
    available: number;
    working: number;
    outOfOrder: number;
}

interface TTBLModule {
    remarks: string;
    smartBoard: TTBLModuleSmartBoard;
    projectors: TTBLModuleProjectors;
    laptops: TTBLModuleLaptops;

    setRemarks: (remarks: string) => void;
    setSmartBoard: (smartBoard: TTBLModuleSmartBoard) => void;
    setProjectors: (projectors: TTBLModuleProjectors) => void;
    setLaptops: (laptops: TTBLModuleLaptops) => void;
}

const useTTBLModule = create<TTBLModule>()(
    persist(
        (set) => ({
            remarks: "",
            smartBoard: {
                campusRequirement: 0,
                available: 0,
                working: 0,
                outOfOrder: 0,
            },
            projectors: {
                campusRequirement: 0,
                available: 0,
                working: 0,
                outOfOrder: 0,
            },
            laptops: {
                campusRequirement: 0,
                available: 0,
                working: 0,
                outOfOrder: 0,
            },

            setRemarks: (remarks: string) => set({ remarks }),
            setSmartBoard: (smartBoard: TTBLModuleSmartBoard) => set({ smartBoard }),
            setProjectors: (projectors: TTBLModuleProjectors) => set({ projectors }),
            setLaptops: (laptops: TTBLModuleLaptops) => set({ laptops }),
        }),
        {
            name: "ttbl-module-storage", // key for storage
            storage: createJSONStorage(() => sessionStorage), // using sessionStorage
        }
    )
);

export default useTTBLModule;
