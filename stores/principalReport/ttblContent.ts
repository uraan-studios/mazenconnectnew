import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define the shape of the state object with boolean values
interface TTBLContentModuleState {
  // Early Years
  preNurseryCLLE: boolean;
  preNurseryCLLU: boolean;
  preNurseryMD: boolean;
  nurseryCLLE: boolean;
  nurseryCLLU: boolean;
  nurseryMD: boolean;
  kindergartenCLLE: boolean;
  kindergartenCLLU: boolean;
  kindergartenMD: boolean;

  // Grades 1–5
  g1Eng: boolean;
  g1Urdu: boolean;
  g1Math: boolean;
  g1GK: boolean;
  g1ICT: boolean;
  g1Isl: boolean;

  g2Eng: boolean;
  g2Urdu: boolean;
  g2Math: boolean;
  g2GK: boolean;
  g2ICT: boolean;
  g2Isl: boolean;

  g3Eng: boolean;
  g3Urdu: boolean;
  g3Math: boolean;
  g3GK: boolean;
  g3ICT: boolean;
  g3Isl: boolean;

  g4Eng: boolean;
  g4Urdu: boolean;
  g4Math: boolean;
  g4SS: boolean;
  g4ICT: boolean;
  g4Isl: boolean;
  g4Sci: boolean;

  g5Eng: boolean;
  g5Urdu: boolean;
  g5Math: boolean;
  g5SS: boolean;
  g5ICT: boolean;
  g5Isl: boolean;
  g5Sci: boolean;
}

// Define the actions (setters and getters)
interface TTBLContentModuleActions {
  // Early Years setters
  setPreNurseryCLLE: (preNurseryCLLE: boolean) => void;
  setPreNurseryCLLU: (preNurseryCLLU: boolean) => void;
  setPreNurseryMD: (preNurseryMD: boolean) => void;
  setNurseryCLLE: (nurseryCLLE: boolean) => void;
  setNurseryCLLU: (nurseryCLLU: boolean) => void;
  setNurseryMD: (nurseryMD: boolean) => void;
  setKindergartenCLLE: (kindergartenCLLE: boolean) => void;
  setKindergartenCLLU: (kindergartenCLLU: boolean) => void;
  setKindergartenMD: (kindergartenMD: boolean) => void;

  // Getters and setters for grades
  getGradeValue: (grade: number, subject: string) => boolean;
  setGradeValue: (grade: number, subject: string, value: boolean) => void;
}

// Combine the state and actions into a single Zustand store type
type TTBLContentModule = TTBLContentModuleState & TTBLContentModuleActions;

const useTTblContentModule = create<TTBLContentModule>()(
  persist(
    (set, get) => ({
      // Early Years
      preNurseryCLLE: false,
      preNurseryCLLU: false,
      preNurseryMD: false,
      nurseryCLLE: false,
      nurseryCLLU: false,
      nurseryMD: false,
      kindergartenCLLE: false,
      kindergartenCLLU: false,
      kindergartenMD: false,

      // Grades 1–5
      g1Eng: false,
      g1Urdu: false,
      g1Math: false,
      g1GK: false,
      g1ICT: false,
      g1Isl: false,

      g2Eng: false,
      g2Urdu: false,
      g2Math: false,
      g2GK: false,
      g2ICT: false,
      g2Isl: false,

      g3Eng: false,
      g3Urdu: false,
      g3Math: false,
      g3GK: false,
      g3ICT: false,
      g3Isl: false,

      g4Eng: false,
      g4Urdu: false,
      g4Math: false,
      g4SS: false,
      g4ICT: false,
      g4Isl: false,
      g4Sci: false,

      g5Eng: false,
      g5Urdu: false,
      g5Math: false,
      g5SS: false,
      g5ICT: false,
      g5Isl: false,
      g5Sci: false,

      // Early Years setters
      setPreNurseryCLLE: (preNurseryCLLE: boolean) => set({ preNurseryCLLE }),
      setPreNurseryCLLU: (preNurseryCLLU: boolean) => set({ preNurseryCLLU }),
      setPreNurseryMD: (preNurseryMD: boolean) => set({ preNurseryMD }),
      setNurseryCLLE: (nurseryCLLE: boolean) => set({ nurseryCLLE }),
      setNurseryCLLU: (nurseryCLLU: boolean) => set({ nurseryCLLU }),
      setNurseryMD: (nurseryMD: boolean) => set({ nurseryMD }),
      setKindergartenCLLE: (kindergartenCLLE: boolean) => set({ kindergartenCLLE }),
      setKindergartenCLLU: (kindergartenCLLU: boolean) => set({ kindergartenCLLU }),
      setKindergartenMD: (kindergartenMD: boolean) => set({ kindergartenMD }),

      // Getters and setters for grades
      getGradeValue: (grade: number, subject: string): boolean => {
        const key = `g${grade}${subject}` as keyof TTBLContentModuleState;
        return get()[key] ?? false;
      },

      setGradeValue: (grade: number, subject: string, value: boolean): void => {
        const key = `g${grade}${subject}` as keyof TTBLContentModuleState;
        set({ [key]: value });
      },
    }),
    {
      name: "ttbl-content-module-storage", // key for storage
      storage: createJSONStorage(() => sessionStorage), // using sessionStorage
    }
  )
);

export default useTTblContentModule;
