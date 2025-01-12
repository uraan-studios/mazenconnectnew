import { create } from "zustand";

interface SectionState {
    name: string;
    classId: number
    setName: (name: string) => void;
    setClassId: (classId: number) => void;
}

export const useSectionStore = create<SectionState>((set) => ({
    name: "",
    classId: 0,
    setName: (name) => set({ name }),
    setClassId: (classId) => set({ classId }),
}));    


