import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface EmployeeModuleDesignation {
    id: number;
    name: string;
    departmentId: number;

    previous: number;
    left: number;
    new: number;
    total: number;
}

export interface EmployeeModuleDepartment {
    id: number;
    name: string;
    designations: EmployeeModuleDesignation[];
}


interface EmployeeModule {
    departments: EmployeeModuleDepartment[];
    remarks: string;

    setDepartments: (departments: EmployeeModuleDepartment[]) => void;
    setRemarks: (remarks: string) => void;

    addDepartment: (newDepartment: EmployeeModuleDepartment) => void;
    updateDepartment: (departmentId: number, updatedDepartment: Partial<EmployeeModuleDepartment>) => void;
    removeDepartment: (departmentId: number) => void;

    addDesignation: (departmentId: number, newDesignation: EmployeeModuleDesignation) => void;
    updateDesignation: (departmentId: number, designationId: number, updatedDesignation: Partial<EmployeeModuleDesignation>) => void;
    removeDesignation: (departmentId: number, designationId: number) => void;
}

// Define the EmployeeModule store
const useEmployeeModule = create<EmployeeModule>()(
    persist(
        (set) => ({
            departments: [],
            remarks: "",

            // Set departments
            setDepartments: (departments: EmployeeModuleDepartment[]) => set({ departments }),

            // Set remarks
            setRemarks: (remarks: string) => set({ remarks }),

            // Add a new department
            addDepartment: (newDepartment: EmployeeModuleDepartment) =>
                set((state) => ({
                    departments: [...state.departments, newDepartment],
                })),

            // Update an existing department
            updateDepartment: (departmentId: number, updatedDepartment: Partial<EmployeeModuleDepartment>) =>
                set((state) => ({
                    departments: state.departments.map((dept) =>
                        dept.id === departmentId ? { ...dept, ...updatedDepartment } : dept
                    ),
                })),

            // Remove a department
            removeDepartment: (departmentId: number) =>
                set((state) => ({
                    departments: state.departments.filter((dept) => dept.id !== departmentId),
                })),

            // Add a designation to a department
            addDesignation: (departmentId: number, newDesignation: EmployeeModuleDesignation) =>
                set((state) => ({
                    departments: state.departments.map((dept) =>
                        dept.id === departmentId
                            ? {
                                  ...dept,
                                  designations: [...dept.designations, newDesignation],
                              }
                            : dept
                    ),
                })),

            // Update a designation within a department
            updateDesignation: (departmentId: number, designationId: number, updatedDesignation: Partial<EmployeeModuleDesignation>) =>
                set((state) => ({
                    departments: state.departments.map((dept) =>
                        dept.id === departmentId
                            ? {
                                  ...dept,
                                  designations: dept.designations.map((desig) =>
                                      desig.id === designationId ? { ...desig, ...updatedDesignation } : desig
                                  ),
                              }
                            : dept
                    ),
                })),

            // Remove a designation from a department
            removeDesignation: (departmentId: number, designationId: number) =>
                set((state) => ({
                    departments: state.departments.map((dept) =>
                        dept.id === departmentId
                            ? {
                                  ...dept,
                                  designations: dept.designations.filter((desig) => desig.id !== designationId),
                              }
                            : dept
                    ),
                })),
        }),
        {
            name: "employee-module-storage", // name of the item in storage
            storage: createJSONStorage(() => sessionStorage), // using sessionStorage
        }
    )
);

export default useEmployeeModule;