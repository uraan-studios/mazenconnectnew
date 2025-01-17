import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface HCDModule {
  remarks: string;
  workload: number;
  meetings: number;

  preNurseryPlanner: boolean;
  preNurseryWorksheets: boolean;
  preNurseryTTBL: boolean;

  nurseryPlanner: boolean;
  nurseryWorksheets: boolean;
  nurseryTTBL: boolean;

  kindergartenPlanner: boolean;
  kindergartenWorksheets: boolean;
  kindergartenTTBL: boolean;

  grade1Planner: boolean;
  grade1Worksheets: boolean;
  grade1TTBL: boolean;

  grade2Planner: boolean;
  grade2Worksheets: boolean;
  grade2TTBL: boolean;

  grade3Planner: boolean;
  grade3Worksheets: boolean;
  grade3TTBL: boolean;

  grade4Planner: boolean;
  grade4Worksheets: boolean;
  grade4TTBL: boolean;

  grade5Planner: boolean;
  grade5Worksheets: boolean;
  grade5TTBL: boolean;

  grade6Planner: boolean;
  grade6Worksheets: boolean;

  grade7Planner: boolean;
  grade7Worksheets: boolean;

  grade8Planner: boolean;
  grade8Worksheets: boolean;

  setRemarks: (remarks: string) => void;
  setWorkload: (workload: number) => void;
  setMeeints: (meetings: number) => void;

  setPreNurseryPlanner: (value: boolean) => void;
  setPreNurseryWorksheets: (value: boolean) => void;
  setPreNurseryTTBL: (value: boolean) => void;

  setNurseryPlanner: (value: boolean) => void;
  setNurseryWorksheets: (value: boolean) => void;
  setNurseryTTBL: (value: boolean) => void;

  setKindergartenPlanner: (value: boolean) => void;
  setKindergartenWorksheets: (value: boolean) => void;
  setKindergartenTTBL: (value: boolean) => void;

  setGrade1Planner: (value: boolean) => void;
  setGrade1Worksheets: (value: boolean) => void;
  setGrade1TTBL: (value: boolean) => void;

  setGrade2Planner: (value: boolean) => void;
  setGrade2Worksheets: (value: boolean) => void;
  setGrade2TTBL: (value: boolean) => void;

  setGrade3Planner: (value: boolean) => void;
  setGrade3Worksheets: (value: boolean) => void;
  setGrade3TTBL: (value: boolean) => void;

  setGrade4Planner: (value: boolean) => void;
  setGrade4Worksheets: (value: boolean) => void;
  setGrade4TTBL: (value: boolean) => void;

  setGrade5Planner: (value: boolean) => void;
  setGrade5Worksheets: (value: boolean) => void;
  setGrade5TTBL: (value: boolean) => void;

  setGrade6Planner: (value: boolean) => void;
  setGrade6Worksheets: (value: boolean) => void;

  setGrade7Planner: (value: boolean) => void;
  setGrade7Worksheets: (value: boolean) => void;

  setGrade8Planner: (value: boolean) => void;
  setGrade8Worksheets: (value: boolean) => void;
}

export const useHCDModule = create<HCDModule>()(
  persist(
    (set) => ({
      remarks: "",
      workload: 0,
      meetings: 0,
      setMeeints: (meetings) => set({ meetings }),
      setWorkload: (workload) => set({ workload }),
      preNurseryPlanner: false,
      preNurseryWorksheets: false,
      preNurseryTTBL: false,
      setPreNurseryPlanner: (value) => set({ preNurseryPlanner: value }),
      setPreNurseryWorksheets: (value) => set({ preNurseryWorksheets: value }),
      setPreNurseryTTBL: (value) => set({ preNurseryTTBL: value }),

      nurseryPlanner: false,
      nurseryWorksheets: false,
      nurseryTTBL: false,
      setNurseryPlanner: (value) => set({ nurseryPlanner: value }),
      setNurseryWorksheets: (value) => set({ nurseryWorksheets: value }),
      setNurseryTTBL: (value) => set({ nurseryTTBL: value }),

      kindergartenPlanner: false,
      kindergartenWorksheets: false,
      kindergartenTTBL: false,
      setKindergartenPlanner: (value) => set({ kindergartenPlanner: value }),
      setKindergartenWorksheets: (value) => set({ kindergartenWorksheets: value }),
      setKindergartenTTBL: (value) => set({ kindergartenTTBL: value }),

      grade1Planner: false,
      grade1Worksheets: false,
      grade1TTBL: false,
      setGrade1Planner: (value) => set({ grade1Planner: value }),
      setGrade1Worksheets: (value) => set({ grade1Worksheets: value }),
      setGrade1TTBL: (value) => set({ grade1TTBL: value }),

      grade2Planner: false,
      grade2Worksheets: false,
      grade2TTBL: false,
      setGrade2Planner: (value) => set({ grade2Planner: value }),
      setGrade2Worksheets: (value) => set({ grade2Worksheets: value }),
      setGrade2TTBL: (value) => set({ grade2TTBL: value }),

      grade3Planner: false,
      grade3Worksheets: false,
      grade3TTBL: false,
      setGrade3Planner: (value) => set({ grade3Planner: value }),
      setGrade3Worksheets: (value) => set({ grade3Worksheets: value }),
      setGrade3TTBL: (value) => set({ grade3TTBL: value }),

      grade4Planner: false,
      grade4Worksheets: false,
      grade4TTBL: false,
      setGrade4Planner: (value) => set({ grade4Planner: value }),
      setGrade4Worksheets: (value) => set({ grade4Worksheets: value }),
      setGrade4TTBL: (value) => set({ grade4TTBL: value }),

      grade5Planner: false,
      grade5Worksheets: false,
      grade5TTBL: false,
      setGrade5Planner: (value) => set({ grade5Planner: value }),
      setGrade5Worksheets: (value) => set({ grade5Worksheets: value }),
      setGrade5TTBL: (value) => set({ grade5TTBL: value }),

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
      name: "hcd-module-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
