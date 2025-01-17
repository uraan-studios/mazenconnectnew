import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RecheckingSubject {
  id: number;
  name: string;
  count: number;
}

interface RecheckingModuleItem {
  classId: number;
  subjects: RecheckingSubject[];
}

interface RecheckingModule {
  rechecking: RecheckingModuleItem[];
  remarks: string;
  setRemarks: (remarks: string) => void;
  setRechecking: (rechecking: RecheckingModuleItem[]) => void;
  addRechecking: (classId: number, subjects: RecheckingSubject[]) => void;
  removeRechecking: (classId: number) => void;
  addClassSubject: (classId: number, subjectId: number, count: number) => void;
  updateRecheckingCount: (classId: number, subjectId: number, count: number) => void;
}

const useRecheckingStore = create<RecheckingModule>()(
  persist(
    (set) => ({
      rechecking: [],
      remarks: "",
      setRemarks: (remarks: string) => set({ remarks }),
      setRechecking: (rechecking: RecheckingModuleItem[]) => set({ rechecking }),
      addRechecking: (classId: number, subjects: RecheckingSubject[]) =>
        set((state) => {
          const existingClass = state.rechecking.find((item) => item.classId === classId);
          if (existingClass) {
            return state; // No changes if classId already exists
          }
          return {
            rechecking: [
              ...state.rechecking,
              { classId, subjects }, // Add the new class and subjects
            ],
          };
        }),
      removeRechecking: (classId: number) =>
        set((state) => ({
          rechecking: state.rechecking.filter((item) => item.classId !== classId),
        })),
      updateRecheckingCount: (classId: number, subjectId: number, count: number) =>
        set((state) => ({
          rechecking: state.rechecking.map((item) =>
            item.classId === classId
              ? {
                  ...item,
                  subjects: item.subjects.map((subject) =>
                    subject.id === subjectId
                      ? { ...subject, count } // Update the count for the specific subject
                      : subject
                  ),
                }
              : item
          ),
        })),
      addClassSubject: (classId: number, subjectId: number, count: number) =>
        set((state) => ({
          rechecking: state.rechecking.map((item) =>
            item.classId === classId
              ? {
                  ...item,
                  subjects: item.subjects.some((subject) => subject.id === subjectId)
                    ? item.subjects // If subject exists, do not add it again
                    : [...item.subjects, { id: subjectId, name: "", count }], // Add new subject with default name
                }
              : item
          ),
        })),
    }),
    {
      name: "rechecking-storage", // Key for storage
      storage: createJSONStorage(() => sessionStorage), // Storage method (sessionStorage here)
    }
  )
);

export default useRecheckingStore;
