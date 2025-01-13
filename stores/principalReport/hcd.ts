import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface HCDModule {
  remarks: string;

  preNurseryPlanner: number;
  preNurseryWorksheets: number;
  preNurseryTTBL: number;

  nurseryPlanner: number;
  nurseryWorksheets: number;
  nurseryTTBL: number;

  kindergartenPlanner: number;
  kindergartenWorksheets: number;
  kindergartenTTBL: number;

  grade1Planner: number;
  grade1Worksheets: number;
  grade1TTBL: number;

  grade2Planner: number;
  grade2Worksheets: number;
  grade2TTBL: number;

  grade3Planner: number;
  grade3Worksheets: number;
  grade3TTBL: number;

  grade4Planner: number;
  grade4Worksheets: number;
  grade4TTBL: number;

  grade5Planner: number;
  grade5Worksheets: number;
  grade5TTBL: number;

  grade6Planner: number;
  grade6Worksheets: number;

  grade7Planner: number;
  grade7Worksheets: number;

  grade8Planner: number;
  grade8Worksheets: number;

  setRemarks: (remarks: string) => void;

  setPreNurseryPlanner: (value: number) => void;
  setPreNurseryWorksheets: (value: number) => void;
  setPreNurseryTTBL: (value: number) => void;

  setNurseryPlanner: (value: number) => void;
  setNurseryWorksheets: (value: number) => void;
  setNurseryTTBL: (value: number) => void;

  setKindergartenPlanner: (value: number) => void;
  setKindergartenWorksheets: (value: number) => void;
  setKindergartenTTBL: (value: number) => void;

  setGrade1Planner: (value: number) => void;
  setGrade1Worksheets: (value: number) => void;
  setGrade1TTBL: (value: number) => void;

  setGrade2Planner: (value: number) => void;
  setGrade2Worksheets: (value: number) => void;
  setGrade2TTBL: (value: number) => void;

  setGrade3Planner: (value: number) => void;
  setGrade3Worksheets: (value: number) => void;
  setGrade3TTBL: (value: number) => void;

  setGrade4Planner: (value: number) => void;
  setGrade4Worksheets: (value: number) => void;
  setGrade4TTBL: (value: number) => void;

  setGrade5Planner: (value: number) => void;
  setGrade5Worksheets: (value: number) => void;
  setGrade5TTBL: (value: number) => void;

  setGrade6Planner: (value: number) => void;
  setGrade6Worksheets: (value: number) => void;

  setGrade7Planner: (value: number) => void;
  setGrade7Worksheets: (value: number) => void;

  setGrade8Planner: (value: number) => void;
  setGrade8Worksheets: (value: number) => void;
}

export const useHCDModule = create<HCDModule>()(
  persist(
    (set) => ({
      remarks: "",
      preNurseryPlanner: 0,
      preNurseryWorksheets: 0,
      preNurseryTTBL: 0,
      setPreNurseryPlanner: (value) => set({ preNurseryPlanner: value }),
      setPreNurseryWorksheets: (value) => set({ preNurseryWorksheets: value }),
      setPreNurseryTTBL: (value) => set({ preNurseryTTBL: value }),

      nurseryPlanner: 0,
      nurseryWorksheets: 0,
      nurseryTTBL: 0,
      setNurseryPlanner: (value) => set({ nurseryPlanner: value }),
      setNurseryWorksheets: (value) => set({ nurseryWorksheets: value }),
      setNurseryTTBL: (value) => set({ nurseryTTBL: value }),

      kindergartenPlanner: 0,
      kindergartenWorksheets: 0,
      kindergartenTTBL: 0,
      setKindergartenPlanner: (value) => set({ kindergartenPlanner: value }),
      setKindergartenWorksheets: (value) => set({ kindergartenWorksheets: value }),
      setKindergartenTTBL: (value) => set({ kindergartenTTBL: value }),

      grade1Planner: 0,
      grade1Worksheets: 0,
      grade1TTBL: 0,
      setGrade1Planner: (value) => set({ grade1Planner: value }),
      setGrade1Worksheets: (value) => set({ grade1Worksheets: value }),
      setGrade1TTBL: (value) => set({ grade1TTBL: value }),

      grade2Planner: 0,
      grade2Worksheets: 0,
      grade2TTBL: 0,
      setGrade2Planner: (value) => set({ grade2Planner: value }),
      setGrade2Worksheets: (value) => set({ grade2Worksheets: value }),
      setGrade2TTBL: (value) => set({ grade2TTBL: value }),

      grade3Planner: 0,
      grade3Worksheets: 0,
      grade3TTBL: 0,
      setGrade3Planner: (value) => set({ grade3Planner: value }),
      setGrade3Worksheets: (value) => set({ grade3Worksheets: value }),
      setGrade3TTBL: (value) => set({ grade3TTBL: value }),

      grade4Planner: 0,
      grade4Worksheets: 0,
      grade4TTBL: 0,
      setGrade4Planner: (value) => set({ grade4Planner: value }),
      setGrade4Worksheets: (value) => set({ grade4Worksheets: value }),
      setGrade4TTBL: (value) => set({ grade4TTBL: value }),

      grade5Planner: 0,
      grade5Worksheets: 0,
      grade5TTBL: 0,
      setGrade5Planner: (value) => set({ grade5Planner: value }),
      setGrade5Worksheets: (value) => set({ grade5Worksheets: value }),
      setGrade5TTBL: (value) => set({ grade5TTBL: value }),

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
      name: "hcd-module-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
