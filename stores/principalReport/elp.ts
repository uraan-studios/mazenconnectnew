import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface HCDModule {
  remarks: string;

  grade1Planner: number;
  grade1Worksheets: number;

  grade2Planner: number;
  grade2Worksheets: number;

  grade3Planner: number;
  grade3Worksheets: number;

  grade4Planner: number;
  grade4Worksheets: number;

  grade5Planner: number;
  grade5Worksheets: number;

  grade6Planner: number;
  grade6Worksheets: number;

  grade7Planner: number;
  grade7Worksheets: number;

  grade8Planner: number;
  grade8Worksheets: number;

  setRemarks: (remarks: string) => void;

  setGrade1Planner: (value: number) => void;
  setGrade1Worksheets: (value: number) => void;

  setGrade2Planner: (value: number) => void;
  setGrade2Worksheets: (value: number) => void;

  setGrade3Planner: (value: number) => void;
  setGrade3Worksheets: (value: number) => void;

  setGrade4Planner: (value: number) => void;
  setGrade4Worksheets: (value: number) => void;

  setGrade5Planner: (value: number) => void;
  setGrade5Worksheets: (value: number) => void;

  setGrade6Planner: (value: number) => void;
  setGrade6Worksheets: (value: number) => void;

  setGrade7Planner: (value: number) => void;
  setGrade7Worksheets: (value: number) => void;

  setGrade8Planner: (value: number) => void;
  setGrade8Worksheets: (value: number) => void;
}

export const useELPModule = create<HCDModule>()(
  persist(
    (set) => ({
      remarks: "",
      grade1Planner: 0,
      grade1Worksheets: 0,
      setGrade1Planner: (value) => set({ grade1Planner: value }),
      setGrade1Worksheets: (value) => set({ grade1Worksheets: value }),

      grade2Planner: 0,
      grade2Worksheets: 0,
      setGrade2Planner: (value) => set({ grade2Planner: value }),
      setGrade2Worksheets: (value) => set({ grade2Worksheets: value }),

      grade3Planner: 0,
      grade3Worksheets: 0,
      setGrade3Planner: (value) => set({ grade3Planner: value }),
      setGrade3Worksheets: (value) => set({ grade3Worksheets: value }),

      grade4Planner: 0,
      grade4Worksheets: 0,
      grade4TTBL: 0,
      setGrade4Planner: (value) => set({ grade4Planner: value }),
      setGrade4Worksheets: (value) => set({ grade4Worksheets: value }),

      grade5Planner: 0,
      grade5Worksheets: 0,
      setGrade5Planner: (value) => set({ grade5Planner: value }),
      setGrade5Worksheets: (value) => set({ grade5Worksheets: value }),

      grade6Planner: 0,
      grade6Worksheets: 0,
      setGrade6Planner: (value) => set({ grade6Planner: value }),
      setGrade6Worksheets: (value) => set({ grade6Worksheets: value }),

      grade7Planner: 0,
      grade7Worksheets: 0,
      setGrade7Planner: (value) => set({ grade7Planner: value }),
      setGrade7Worksheets: (value) => set({ grade7Worksheets: value }),

      grade8Planner: 0,
      grade8Worksheets: 0,
      setGrade8Planner: (value) => set({ grade8Planner: value }),
      setGrade8Worksheets: (value) => set({ grade8Worksheets: value }),

      setRemarks: (remarks) => set({ remarks }),
    }),
    {
      name: "elp-module-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
