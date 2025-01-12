import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface obRecord {
    id: number;
    teacherId: number;
    grade: number;
    subjectId: number;
    subjectName: string;
    walkThrough: string;
    informed: string;
    uninformed: string;
}

interface ObservationModule {
    observationRecords: obRecord[];
    setObservationRecords: (observationRecords: obRecord[]) => void;
    addObservationRecord: (newObservationRecord: obRecord) => void;
    updateObservationRecord: (observationRecordId: number, updatedObservationRecord: Partial<obRecord>) => void;
    removeObservationRecord: (observationRecordId: number) => void;
}

const useObservationModule = create<ObservationModule>()(
    persist(
        (set, get) => ({
            observationRecords: [],
            setObservationRecords: (observationRecords: obRecord[]) => set({ observationRecords }),
            addObservationRecord: (newObservationRecord: obRecord) =>
                set((state) => ({
                    observationRecords: [...state.observationRecords, newObservationRecord],
                })),
            updateObservationRecord: (observationRecordId: number, updatedObservationRecord: Partial<obRecord>) =>
                set((state) => ({
                    observationRecords: state.observationRecords.map((observationRecord) =>
                        observationRecord.id === observationRecordId ? { ...observationRecord, ...updatedObservationRecord } : observationRecord
                    ),
                })),
            removeObservationRecord: (observationRecordId: number) =>
                set((state) => ({
                    observationRecords: state.observationRecords.filter((observationRecord) => observationRecord.id !== observationRecordId),
                })),
        }),
        {
            name: "observation-module-storage", // name of the item in storage
            storage: createJSONStorage(() => sessionStorage),  // Use localStorage for persistence (can also use sessionStorage)
        }
    )
);

export default useObservationModule;