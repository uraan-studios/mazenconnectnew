import { create } from "zustand";

interface ClassState {
    name: string;
    gradeId: number;
    setName: (name: string) => void;
    setGradeId: (gradeId: number) => void;
}

export const useClassStore = create<ClassState>((set) => ({
    name: "",
    gradeId: 0,
    setName: (name) => set({ name }),
    setGradeId: (gradeId) => set({ gradeId }),
}));