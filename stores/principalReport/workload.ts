import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Staff {
    id: number;
    name: string;
    workload: number;
    isHomeRoom: boolean;
    students: number;
}

interface WorkLoadModule {
    staff: Staff[];
    remarks: string

    setRemarks: (remarks: string) => void;
    setStaff: (staff: Staff[]) => void; // Corrected type
    addStaff: (staff: Staff) => void;
    updateStaff: (staffId: number, updatedStaff: Partial<Staff>) => void;
    removeStaff: (staffId: number) => void;
}

const useWorkLoadModule = create<WorkLoadModule>()(
    persist(
        (set) => ({
            staff: [],
            remarks: "",
            setRemarks: (remarks: string) => set({ remarks }),
            setStaff: (staff: Staff[]) => set({ staff }), // Now accepts an array of Staff
            addStaff: (staff: Staff) => set((state) => ({ staff: [...state.staff, staff] })),
            updateStaff: (staffId: number, updatedStaff: Partial<Staff>) =>
                set((state) => ({
                    staff: state.staff.map((staff) =>
                        staff.id === staffId ? { ...staff, ...updatedStaff } : staff
                    ),
                })),
            removeStaff: (staffId: number) =>
                set((state) => ({
                    staff: state.staff.filter((staff) => staff.id !== staffId),
                })),
        }),
        {
            name: "workload-module-storage", // key for the persisted state
            storage: createJSONStorage(() => sessionStorage),  // Use localStorage for persistence (can also use sessionStorage)
        }
    )
);

export default useWorkLoadModule;
