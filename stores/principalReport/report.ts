import { createStudent } from "@/actions/newPrincipalReport";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PrincipalReport {
    id: number | null;
    campusId: number | null;
    disabled: boolean;

    student: boolean;
    employee: boolean;
    workload: boolean;
    observation: boolean;
    rechecking: boolean;
    ttbl: boolean;
    ttblContent: boolean;
    hcd: boolean;
    tenuus: boolean;
    elp: boolean;
    activity: boolean;
    swot: boolean;


    isCompleted: () => boolean;
    setDisabled: (disabled: boolean) => void;
    setId: (id: number) => void;

    setStudent: (student: boolean) => void;

    setEmployee: (employee: boolean) => void;

    setWorkload: (workload: boolean) => void;
    setObservation: (observation: boolean) => void;

    setRechecking: (rechecking: boolean) => void;
    setTtbl: (ttbl: boolean) => void;
    setTtblContent: (ttblContent: boolean) => void;

    setHcd: (hcd: boolean) => void;
    setTenuus: (tenuus: boolean) => void;
    setElp: (elp: boolean) => void;
    setActivity: (activity: boolean) => void;
    setSwot: (swot: boolean) => void;
    clearReport: () => void;
}

const usePrincipalReport = create<PrincipalReport>()(
    persist(
        (set, get) => ({
            id: null,
            campusId: null,
            disabled: false,

            student: false,
            employee: false,
            workload: false,
            observation: false,
            rechecking: false,
            ttbl: false,
            ttblContent: false,
            hcd: false,
            tenuus: false,
            elp: false,
            activity: false,
            swot: false,



            setId: (id: number) => set({ id }),
            setDisabled: (disabled: boolean) => set({ disabled }),
            isCompleted: () => {
                const { student, employee, workload, rechecking, ttbl, hcd, tenuus, elp, activity, swot } = get();
                return student && employee && workload && rechecking && ttbl && hcd && tenuus && elp && activity && swot;
            },
            setStudent: (student: boolean) => set({ student }),

            setEmployee: (employee: boolean) => set({ employee }),

            setWorkload: (workload: boolean) => set({ workload }),     
            setObservation: (observation: boolean) => set({ observation }),
            
            setRechecking: (rechecking: boolean) => set({ rechecking }),
            setTtbl: (ttbl: boolean) => set({ ttbl }),
            setTtblContent: (ttblContent: boolean) => set({ ttblContent }),

            setHcd: (hcd: boolean) => set({ hcd }),
            setTenuus: (tenuus: boolean) => set({ tenuus }),
            setElp: (elp: boolean) => set({ elp }),
            setActivity: (activity: boolean) => set({ activity }),            
            setSwot: (swot: boolean) => set({ swot }),
            clearReport: () => set({
                id: null,
            campusId: null,
            disabled: false,

            student: false,
            employee: false,
            workload: false,
            observation: false,
            rechecking: false,
            ttbl: false,
            ttblContent: false,
            hcd: false,
            tenuus: false,
            elp: false,
            activity: false,
            swot: false,
            }),


        }),
        {
            name: "principal-report-module-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default usePrincipalReport;
