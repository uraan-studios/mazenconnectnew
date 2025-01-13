import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface RecheckingModuleItem {
    classId: number;
    teacherId: number;
    subjectId: number;
    count: number;
}

interface RecheckingModule {
    rechecking: RecheckingModuleItem[];
    remarks: string;
    setRemarks: (remarks: string) => void;
    setRechecking: (rechecking: RecheckingModuleItem[]) => void;
    addRechecking: (classId: number, teacherId: number, subjectId: number, count: number) => void;
    removeRechecking: (classId: number, teacherId: number, subjectId: number) => void;
    updateRecheckingCount: (classId: number, teacherId: number, subjectId: number, count: number) => void;
}

const useRecheckingStore = create<RecheckingModule>()(
    persist(
        (set, get) => ({
            rechecking: [],
            remarks: "",
            setRemarks: (remarks: string) => set({ remarks }),
            setRechecking: (rechecking: RecheckingModuleItem[]) => set({ rechecking }),
            addRechecking: (classId: number, teacherId: number, subjectId: number, count: number) =>
                set((state) => ({
                    rechecking: [...state.rechecking, { classId, teacherId, subjectId, count: count }],
                })),
            updateRecheckingCount: (classId: number, teacherId: number, subjectId: number, count: number) =>
                set((state) => ({
                    rechecking: state.rechecking.map((item) =>
                        item.classId === classId && item.teacherId === teacherId && item.subjectId === subjectId
                            ? { ...item, count: count }
                            : item
                    ),
                })),
            removeRechecking: (classId: number, teacherId: number, subjectId: number) =>
                set((state) => ({
                    rechecking: state.rechecking.filter(
                        (item) => item.classId !== classId || item.teacherId !== teacherId || item.subjectId !== subjectId
                    ),
                })),
        }),
        {
            name: "rechecking-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useRecheckingStore;