import { create } from "zustand";
import { persist, createJSONStorage  } from "zustand/middleware";

export interface StudentModuleSection {
    id: number;
    name: string;
    previous: number;
    left: number;
    new: number;
    transfered: number;
    promoted: number;
    total: number;
    boys: number;
    girls: number;
}

export interface StudentModuleClass {
    id: number;
    name: string;
    previous: number;
    left: number;
    new: number;
    transfered: number;
    promoted: number;
    total: number;
    boys: number;
    girls: number;
    sectionCount: number;
    studentPerSection: number;
    sections: StudentModuleSection[];
}

interface StudentModule {
    classes: StudentModuleClass[];
    remarks: string;

    // Methods for updating the state
    setClasses: (classes: StudentModuleClass[]) => void;
    setRemarks: (remarks: string) => void;

    // Class management methods
    addClass: (newClass: StudentModuleClass) => void;
    updateClass: (classId: number, updatedClass: Partial<StudentModuleClass>) => void;
    removeClass: (classId: number) => void;

    // Section management methods
    addSection: (classId: number, newSection: StudentModuleSection) => void;
    updateSection: (classId: number, sectionId: number, updatedSection: Partial<StudentModuleSection>) => void;
    removeSection: (classId: number, sectionId: number) => void;
}

const useStudentModule = create<StudentModule>()(
    persist(
        (set) => ({
            classes: [],
            remarks: "",

            setClasses: (classes: StudentModuleClass[]) => set({ classes }),
            setRemarks: (remarks: string) => set({ remarks }),

            addClass: (newClass: StudentModuleClass) =>
                set((state) => ({
                    classes: [...state.classes, newClass],
                })),

            updateClass: (classId: number, updatedClass: Partial<StudentModuleClass>) =>
                set((state) => ({
                    classes: state.classes.map((cls) =>
                        cls.id === classId ? { ...cls, ...updatedClass } : cls
                    ),
                })),

            removeClass: (classId: number) =>
                set((state) => ({
                    classes: state.classes.filter((cls) => cls.id !== classId),
                })),

            addSection: (classId: number, newSection: StudentModuleSection) =>
                set((state) => ({
                    classes: state.classes.map((cls) =>
                        cls.id === classId
                            ? {
                                ...cls,
                                sections: [...cls.sections, newSection],
                                sectionCount: cls.sectionCount + 1,
                            }
                            : cls
                    ),
                })),

            updateSection: (classId: number, sectionId: number, updatedSection: Partial<StudentModuleSection>) =>
                set((state) => ({
                    classes: state.classes.map((cls) =>
                        cls.id === classId
                            ? {
                                ...cls,
                                sections: cls.sections.map((sec) =>
                                    sec.id === sectionId ? { ...sec, ...updatedSection } : sec
                                ),
                            }
                            : cls
                    ),
                })),

            removeSection: (classId: number, sectionId: number) =>
                set((state) => ({
                    classes: state.classes.map((cls) =>
                        cls.id === classId
                            ? {
                                ...cls,
                                sections: cls.sections.filter((sec) => sec.id !== sectionId),
                                sectionCount: cls.sectionCount - 1,
                            }
                            : cls
                    ),
                })),
        }),
        {
            name: "student-module-storage", // name of the item in storage
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useStudentModule;
