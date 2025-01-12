import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface Subject {
    id: number;
    name: string;
    gradeId: number
}

interface SubjectModule {
    subjects: Subject[];
    setSubjects: (subjects: Subject[]) => void;
    addSubject: (newSubject: Subject) => void;
    updateSubject: (subjectId: number, updatedSubject: Partial<Subject>) => void;
    removeSubject: (subjectId: number) => void;
    getName: (subjectId: number) => string;
}

const useSubjectStore = create<SubjectModule>()(
    persist(
        (set, get) => ({
            subjects: [],
            setSubjects: (subjects: Subject[]) => set({ subjects }),
            addSubject: (newSubject: Subject) =>
                set((state) => ({
                    subjects: [...state.subjects, newSubject],
                })),
            updateSubject: (subjectId: number, updatedSubject: Partial<Subject>) =>
                set((state) => ({
                    subjects: state.subjects.map((subject) =>
                        subject.id === subjectId ? { ...subject, ...updatedSubject } : subject
                    ),
                })),
            removeSubject: (subjectId: number) =>
                set((state) => ({
                    subjects: state.subjects.filter((subject) => subject.id !== subjectId),
                })),            
            getName: (subjectId: number) => get().subjects.find((subject) => subject.id === subjectId)?.name || "",
        }),
        {
            name: "subject-store-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useSubjectStore;