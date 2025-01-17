import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface HCDModule {
  remarks: string;

  grade1Planner: boolean;
  grade1Worksheets: boolean;

  grade2Planner: boolean;
  grade2Worksheets: boolean;

  grade3Planner: boolean;
  grade3Worksheets: boolean;

  grade4Planner: boolean;
  grade4Worksheets: boolean;

  grade5Planner: boolean;
  grade5Worksheets: boolean;

  grade6Planner: boolean;
  grade6Worksheets: boolean;

  grade7Planner: boolean;
  grade7Worksheets: boolean;

  grade8Planner: boolean;
  grade8Worksheets: boolean;

  setRemarks: (remarks: string) => void;

  setGrade1Planner: (value: boolean) => void;
  setGrade1Worksheets: (value: boolean) => void;

  setGrade2Planner: (value: boolean) => void;
  setGrade2Worksheets: (value: boolean) => void;

  setGrade3Planner: (value: boolean) => void;
  setGrade3Worksheets: (value: boolean) => void;

  setGrade4Planner: (value: boolean) => void;
  setGrade4Worksheets: (value: boolean) => void;

  setGrade5Planner: (value: boolean) => void;
  setGrade5Worksheets: (value: boolean) => void;

  setGrade6Planner: (value: boolean) => void;
  setGrade6Worksheets: (value: boolean) => void;

  setGrade7Planner: (value: boolean) => void;
  setGrade7Worksheets: (value: boolean) => void;

  setGrade8Planner: (value: boolean) => void;
  setGrade8Worksheets: (value: boolean) => void;
}

export const useELPModule = create<HCDModule>()(
  persist(
    (set) => ({
      remarks: "",
      grade1Planner: false,
      grade1Worksheets: false,
      setGrade1Planner: (value) => set({ grade1Planner: value }),
      setGrade1Worksheets: (value) => set({ grade1Worksheets: value }),

      grade2Planner: false,
      grade2Worksheets: false,
      setGrade2Planner: (value) => set({ grade2Planner: value }),
      setGrade2Worksheets: (value) => set({ grade2Worksheets: value }),

      grade3Planner: false,
      grade3Worksheets: false,
      setGrade3Planner: (value) => set({ grade3Planner: value }),
      setGrade3Worksheets: (value) => set({ grade3Worksheets: value }),

      grade4Planner: false,
      grade4Worksheets: false,
      grade4TTBL: false,
      setGrade4Planner: (value) => set({ grade4Planner: value }),
      setGrade4Worksheets: (value) => set({ grade4Worksheets: value }),

      grade5Planner: false,
      grade5Worksheets: false,
      setGrade5Planner: (value) => set({ grade5Planner: value }),
      setGrade5Worksheets: (value) => set({ grade5Worksheets: value }),

      grade6Planner: false,
      grade6Worksheets: false,
      setGrade6Planner: (value) => set({ grade6Planner: value }),
      setGrade6Worksheets: (value) => set({ grade6Worksheets: value }),

      grade7Planner: false,
      grade7Worksheets: false,
      setGrade7Planner: (value) => set({ grade7Planner: value }),
      setGrade7Worksheets: (value) => set({ grade7Worksheets: value }),

      grade8Planner: false,
      grade8Worksheets: false,
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
