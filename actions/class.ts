"use server"
import { db } from "@/lib/db"
import { validateRequest } from "@/lib/validateSessions"
import { z } from "zod"


const classSchema = z.object({
    name: z.string().min(1, "Class name is required.").max(100, "Class name must be less than 100 characters."),
    gradeId: z.number().min(1, "Grade is required.").max(10, "Choose a valid Grade."),
})

export const createClass = async (data: z.infer<typeof classSchema>) => {
    const session = await validateRequest()
    if (!session.user) {
        return {
            errors: "You must be logged in to create a class."
        }
    }

    const validationResult = classSchema.safeParse(data);

    // Check if validation failed
    if (!validationResult.success) {
        // Return the first validation error message
        return {
            errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
        };
    }

    try {
        await db.class.create({
            data: {
                name: data.name,
                campusId: session.user.fkid,
                gradeId: data.gradeId,
                description: "Class description",
            }
        })

        return { success: true }; 

    } catch (error) {
        // Return the first error message from the general errors
        return {
            errors: "Failed to create class. Please try again later.",
        };
    }
}


export const getClasses = async () => {
    const session = await validateRequest()
    if (!session.user) {
        return []
    }

    const result = await db.class.findMany({
        where: {
            campusId: session.user.fkid
        },
        include: {
            ClassSection: true
        }
    })

    return result
    
}

export const deleteSection = async (id: number) => {
    const session = await validateRequest()
    if (!session.user) {
        return {
            errors: "You must be logged in to create a department."
        }
    }
    
    try {
        await db.classSection.delete({
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

export const deleteClass = async (id: number) => {
    const session = await validateRequest()
    if (!session.user) {
        return {
            errors: "You must be logged in to delete a class."
        }
    }
    
    try {
        await db.class.delete({
            where: {
                id: id
            }
        })

        return { success: true }; 

    } catch (error) {

        return {
            errors: "Failed to delete class. Please try again later.",
        };
    }
}   