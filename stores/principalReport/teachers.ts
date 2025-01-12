import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Teacher {
    id: number;
    name: string;
}

interface TeacherModule {
    teachers: Teacher[];
    setTeachers: (teachers: Teacher[]) => void;
    addTeacher: (newTeacher: Teacher) => void;
    updateTeacher: (teacherId: number, updatedTeacher: Partial<Teacher>) => void;
    removeTeacher: (teacherId: number) => void;
    getName: (teacherId: number) => string;
}

const useTeacherStore = create<TeacherModule>()(
    persist(
        (set, get) => ({
            teachers: [],
            setTeachers: (teachers: Teacher[]) => set({ teachers }),
            addTeacher: (newTeacher: Teacher) =>
                set((state) => ({
                    teachers: [...state.teachers, newTeacher],
                })),
            updateTeacher: (teacherId: number, updatedTeacher: Partial<Teacher>) =>
                set((state) => ({
                    teachers: state.teachers.map((teacher) =>
                        teacher.id === teacherId ? { ...teacher, ...updatedTeacher } : teacher
                    ),
                })),
            removeTeacher: (teacherId: number) =>
                set((state) => ({
                    teachers: state.teachers.filter((teacher) => teacher.id !== teacherId),
                })),
            getName: (teacherId: number) => get().teachers.find((teacher) => teacher.id === teacherId)?.name || "",
        }),
        {
            name: "teacher-store-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useTeacherStore;
