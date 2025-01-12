import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TTBLContentModule {
  preNurseryCLLE: boolean;
  preNurseryCLLU: boolean;
  preNurseryMD: boolean;
  nurseryCLLE: boolean;
  nurseryCLLU: boolean;
  nurseryMD: boolean;
  kindergartenCLLE: boolean;
  kindergartenCLLU: boolean;
  kindergartenMD: boolean; // Fixed typo here

  setPreNurseryCLLE: (preNurseryCLLE: boolean) => void;
  setPreNurseryCLLU: (preNurseryCLLU: boolean) => void;
  setPreNurseryMD: (preNurseryMD: boolean) => void;
  setNurseryCLLE: (nurseryCLLE: boolean) => void;
  setNurseryCLLU: (nurseryCLLU: boolean) => void;
  setNurseryMD: (nurseryMD: boolean) => void;
  setKindergartenCLLE: (kindergartenCLLE: boolean) => void;
  setKindergartenCLLU: (kindergartenCLLU: boolean) => void;
  setKindergartenMD: (kindergartenMD: boolean) => void; // Fixed typo here
}

const useTTblContentModule = create<TTBLContentModule>()(
  persist(
    (set) => ({
      preNurseryCLLE: false,
      preNurseryCLLU: false,
      preNurseryMD: false,
      nurseryCLLE: false,
      nurseryCLLU: false,
      nurseryMD: false,
      kindergartenCLLE: false,
      kindergartenCLLU: false,
      kindergartenMD: false, // Fixed typo here

      setPreNurseryCLLE: (preNurseryCLLE: boolean) => set({ preNurseryCLLE }),
      setPreNurseryCLLU: (preNurseryCLLU: boolean) => set({ preNurseryCLLU }),
      setPreNurseryMD: (preNurseryMD: boolean) => set({ preNurseryMD }),
      setNurseryCLLE: (nurseryCLLE: boolean) => set({ nurseryCLLE }),
      setNurseryCLLU: (nurseryCLLU: boolean) => set({ nurseryCLLU }),
      setNurseryMD: (nurseryMD: boolean) => set({ nurseryMD }),
      setKindergartenCLLE: (kindergartenCLLE: boolean) => set({ kindergartenCLLE }),
      setKindergartenCLLU: (kindergartenCLLU: boolean) => set({ kindergartenCLLU }),
      setKindergartenMD: (kindergartenMD: boolean) => set({ kindergartenMD }), // Fixed typo here
    }),
    {
      name: "ttbl-content-module-storage", // key for storage
      storage: createJSONStorage(() => sessionStorage), // using sessionStorage
    }
  )
);

export default useTTblContentModule;
