import { create } from "zustand";

interface departmentState {
    name: string
    setName: (name: string) => void
}

export const useDepartmentStore = create<departmentState>()((set) => ({
    name: '',
    setName: (name) => set({ name }),
}));

interface DesignationState {
    name: string;
    departmentId: number
    setName: (name: string) => void;
    setDepartmentId: (departmentId: number) => void;
}

export const useDesignationStore = create<DesignationState>((set) => ({
    name: "",
    departmentId: 0,
    setName: (name) => set({ name }),
    setDepartmentId: (departmentId) => set({ departmentId }),
}));