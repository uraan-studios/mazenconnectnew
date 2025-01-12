"use server"
import { db } from "@/lib/db"
import { validateRequest } from "@/lib/validateSessions"
import { z } from "zod"


const sectionSchema = z.object({
    name: z.string().min(1, 'Section name is required').max(100, 'Section name is too long'),
    class: z.number().min(1, 'Class is required').max(10, 'Choose a valid Class'),
});


export const createSection = async (formData: z.infer<typeof sectionSchema>) => {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a class."
        }
    }
    // Validate input using the schema
    const validationResult = sectionSchema.safeParse(formData);

    // Check if validation failed
    if (!validationResult.success) {
        // Return the first validation error message
        return {
            errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
        };
    }

    
    try {
        await db.classSection.create({
            data: {
                name: formData.name,
                classId: formData.class,            
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

export const getSectionsByClass = async (id: number) => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }

    const sections = await db.classSection.findMany({
        where: {
            classId: id
        }
    })
    return sections;
}