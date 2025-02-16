import { create } from "zustand"

interface EmployeeState {
    name: string
    designation: number
    salary: number
    status: number
    datejoined: Date
    setName: (name: string) => void
    setDesignation: (designation: string) => void
    setSalary: (salary: string) => void
    setStatus: (status: string) => void
    setDateJoined: (dateJoined: Date) => void
}

export const useEmployeeStore = create<EmployeeState>()((set)=>({
    name: '',
    designation: 0,
    salary: 0,
    status: 0,
    datejoined: new Date(),
    setName: (name: string) => {
        set({name})
    },
    setDesignation: (designation: string) => {
        const designationNumber = parseInt(designation, 10);
        set({ designation: isNaN(designationNumber) ? 0 : designationNumber });
    },
    setSalary: (salary: string) => {
        const salaryNumber = parseInt(salary, 10);
        set({ salary: isNaN(salaryNumber) ? 0 : salaryNumber });
    },
    setStatus: (status: string) => {
        const statusNumber = parseInt(status, 10);
        set({ status: isNaN(statusNumber) ? 0 : statusNumber });
    },
    setDateJoined: (dateJoined: Date) => {
        set({ datejoined: dateJoined });
    }
}))


export const useUpdateEmployeeStore = create<EmployeeState>()((set)=>({
    name: '',
    designation: 0,
    salary: 0,
    status: 0,
    datejoined: new Date(),
    setName: (name: string) => {
        set({name})
    },
    setDesignation: (designation: string) => {
        const designationNumber = parseInt(designation, 10);
        set({ designation: isNaN(designationNumber) ? 0 : designationNumber });
    },
    setSalary: (salary: string) => {
        const salaryNumber = parseInt(salary, 10);
        set({ salary: isNaN(salaryNumber) ? 0 : salaryNumber });
    },
    setStatus: (status: string) => {
        const statusNumber = parseInt(status, 10);
        set({ status: isNaN(statusNumber) ? 0 : statusNumber });
    },
    setDateJoined: (dateJoined: Date) => {
        set({ datejoined: dateJoined });
    }
}))


