"use server"

import { db } from "@/lib/db"
import { validateRequest } from "@/lib/validateSessions"
import { z } from "zod"


export const getEmployees = async () => {
    const session = await validateRequest()
    if (!session.user) {
        return []
    }

    const employees = await db.department.findMany({
        include: {
            Designation: {
                include: {
                    Staff: {
                        where: {
                            campusId: session.user.fkid,
                            isActive: true
                        },
                        include: {
                            status: true
                        }
                    }
                }
            }
        }
    })
    return employees    
}

export const getEmployeesByDepartment = async (departmentId: number, page: number = 1) => {
    if (!departmentId) {
      return { employees: [], total: 0, totalPages: 0 };
    }
  
    const employees = await db.staff.findMany({
      where: {
        designationId: departmentId,
      },
      include:{
        designation: true,
        status: true
      },
      take: 10,
      skip: (page - 1) * 10, // Pagination
    });
  
    const total = await db.staff.count({
      where: {
        designationId: departmentId,
      },
    });
  
    const totalPages = Math.ceil(total / 10); // Calculate total pages
  
    return { employees, total, totalPages }; // Return employees and pagination data
  };
  

const employeeSchema = z.object({
    name: z.string().min(1, 'Employee name is required').max(100, 'Employee name is too long'),
    designation: z.number().min(1, 'Employee designation is required').max(10, 'Choose a valid Employee designation'),
    salary: z.number().min(1, 'Employee salary is required').max(5000000, 'Choose a valid Employee salary'),
    status: z.number().min(1, 'Employee status is required').max(10, 'Choose a valid Employee status'),
    dateJoined: z.date(),
});

export const createEmployee = async (data: z.infer<typeof employeeSchema>) => {
    const session = await validateRequest()
    if (!session.user) {
        return {
            errors: "You must be logged in to create a department."
        }
    }
    // Validate input using the schema
    const validationResult = employeeSchema.safeParse(data);

    // Check if validation failed
    if (!validationResult.success) {
        // Return the first validation error message
        return {
            errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
        };
    }

    try {
        await db.staff.create({
            data: {
                name: data.name,
                campusId: session.user.fkid,
                designationId: data.designation,
                salary: data.salary,
                statusId: data.status,
                dateJoined: data.dateJoined,
                isActive: true
            }
        })

        return { success: true }; 

    } catch (error) {
        // Return the first error message from the general errors
        return {
            errors: "Failed to create department. Please try again later.",
        };
    }
}

export const getStatus = async () => {
    const session = await validateRequest()
    if (!session.user) {
        return []
    }

    const status = await db.staffStatus.findMany({
    })
    return status
}

export const recentEmployees = async () => {
    const session = await validateRequest()
    if (!session.user) {
        return []
    }

    const employees = await db.staff.findMany({
        include:{
            designation: true,
        },
        where: {
            isActive: true,
            campusId: session.user.fkid
        },
        orderBy: {
            dateJoined: "desc"
        },
        take: 5
    })
    return employees
}

export const activeEmployeesCount = async () => {
    const session = await validateRequest()
    if (!session.user) {
        return []
    }

    const employees = await db.staff.findMany({
        where: {
            isActive: true,
            campusId: session.user.fkid
        },
    })
    return employees.length
}

export const leftEmployeesCount = async () => {
    const session = await validateRequest()
    if (!session.user) {
        return []
    }

    const employees = await db.staff.findMany({
        where: {
            isActive: false,
            campusId: session.user.fkid
        },
    })
    return employees.length
}   

export const deleteEmployee = async (id: number) => {
    const session = await validateRequest()
    if (!session.user) {
        return {
            errors: "You must be logged in to create a department."
        }
    }

    try {
        await db.staff.update({
            data: {
                isActive: false,
                statusId: 2,
            },
            where: {
                id: id
            }
        })

        return { success: true }; 

    } catch (error) {

        return {
            errors: "Failed to create department. Please try again later.",
        };
    }
}