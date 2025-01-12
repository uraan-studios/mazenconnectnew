"use server"

import { db } from "@/lib/db"
import { validateRequest } from "@/lib/validateSessions"
import { z } from "zod"


export const getRoles = async () => {
    const session = await validateRequest()
    if (!session.user) {
        return []
    }

    const roles = await db.department.findMany({
        include: {
            Designation: true
        }
    })

    return roles
}

const departmentSchema = z.object({
    name: z.string().min(1, 'Department name is required').max(100, 'Department name is too long'),
}); 

export const addDepartment = async (data: z.infer<typeof departmentSchema>) => {
    const session = await validateRequest()
    if (!session.user) {
        return {
            errors: "You must be logged in to create a department."
        }
    }
    // Validate input using the schema
    const validationResult = departmentSchema.safeParse(data);

    // Check if validation failed
    if (!validationResult.success) {
        // Return the first validation error message
        return {
            errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
        };
    } 

    try {
        await db.department.create({
            data: {
                name: data.name,
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

export const deleteDepartment = async (id: number) => {
    const session = await validateRequest()
    if (!session.user) {
        return {
            errors: "You must be logged in to create a department."
        }
    }
    
    try {
        await db.department.delete({
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


const designationSchema = z.object({
    name: z.string().min(1, 'Department name is required').max(100, 'Department name is too long'),
    departmentId: z.number().min(1, 'Department is required').max(10, 'Choose a valid Department'),
}); 

export const addDesignation = async (data: z.infer<typeof designationSchema>) => {
    const session = await validateRequest()
    if (!session.user) {
        return {
            errors: "You must be logged in to create a department."
        }
    }
    // Validate input using the schema
    const validationResult = designationSchema.safeParse(data);

    // Check if validation failed
    if (!validationResult.success) {
        // Return the first validation error message
        return {
            errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
        };
    } 

    try {
        await db.designation.create({
            data: {
                name: data.name,
                departmentId: data.departmentId
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

export const deleteDesignation = async (id: number) => {
    const session = await validateRequest()
    if (!session.user) {
        return {
            errors: "You must be logged in to create a department."
        }
    }

    try {
        await db.designation.delete({
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