import { create } from "zustand";
import { persist, createJSONStorage  } from "zustand/middleware";

export interface Grade {
    id: number;
    name: string;
}

export interface Division {
    id: number;
    name: string;
    grades: Grade[];
}

export interface Section {
    id: number;
    name: string;
}

export interface Class {
    id: number;
    name: string;
    gradeId: number;
    sections: Section[];
}

interface ClassModule {
    classes: Class[];
    divisions: Division[];

    setDivisions: (divisions: Division[]) => void;

    // Methods for updating the state
    setClasses: (classes: Class[]) => void;
    // Class management methods
    addClass: (newClass: Class) => void;
    updateClass: (classId: number, updatedClass: Partial<Class>) => void;
    removeClass: (classId: number) => void;

    // Section management methods
    addSection: (classId: number, newSection: Section) => void;
    updateSection: (classId: number, sectionId: number, updatedSection: Partial<Section>) => void;
    removeSection: (classId: number, sectionId: number) => void;
    getClassName: (classId: number) => string;
    getSectionName: (classId: number, sectionId: number) => string;

    getClassByGrade: (gradeId: number) => Class[];
}

const useClassStore = create<ClassModule>()(
    persist(
        (set, get) => ({
            classes: [],
           divisions: [],
            remarks: "",

            setDivisions: (divisions: Division[]) => set({ divisions }),
            setClasses: (classes: Class[]) => set({ classes }),

            addClass: (newClass: Class) =>
                set((state) => ({
                    classes: [...state.classes, newClass],
                })),

            updateClass: (classId: number, updatedClass: Partial<Class>) =>
                set((state) => ({
                    classes: state.classes.map((cls) =>
                        cls.id === classId ? { ...cls, ...updatedClass } : cls
                    ),
                })),

           

            removeClass: (classId: number) =>
                set((state) => ({
                    classes: state.classes.filter((cls) => cls.id !== classId),
                })),

            addSection: (classId: number, newSection: Section) =>
                set((state) => ({
                    classes: state.classes.map((cls) =>
                        cls.id === classId
                            ? {
                                ...cls,
                                sections: [...cls.sections, newSection],
                            }
                            : cls
                    ),
                })),

            updateSection: (classId: number, sectionId: number, updatedSection: Partial<Section>) =>
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
                            }
                            : cls
                    ),
                })),
            getClassName: (classId: number) => get().classes.find((classItem) => classItem.id === classId)?.name || "",
            getSectionName: (classId: number, sectionId: number) => get().classes.find((classItem) => classItem.id === classId)?.sections.find((section) => section.id === sectionId)?.name || "",
        
            getClassByGrade(gradeId) {
                return get().classes.filter((classItem) => classItem.gradeId === gradeId);
            },
        }),
        {
            name: "class-module-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useClassStore;
