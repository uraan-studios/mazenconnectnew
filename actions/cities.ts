"use server"

import { db } from "@/lib/db"
import { validateRequest } from "@/lib/validateSessions";
import { z } from "zod";

const citySchema = z.object({
    name: z.string().min(3, 'City name is required').max(50, 'City name is too long'),
});


export const createCity = async (formData: z.infer<typeof citySchema>) => {
    // Optional: Session validation can be added here
    // const session = await validateRequest();
    // if (!session.user) {
    //     return {
    //         errors: "You must be logged in to create a city."
    //     }
    // }

    // Validate form data using Zod
    const validationResult = citySchema.safeParse(formData);
    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
        };
    }

    try {
        // Create the new city in the database using Prisma
        const newCity = await db.city.create({
            data: {
                name: validationResult.data.name,
            },
        });


        // Return a success response
        return {
            success: true,
            city: newCity,
        };
    } catch (error) {
        return {
            errors: "Failed to create City. Please try again later.",
        };
    }
};

export const deleteCity = async (id: number) => {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a city."
        }
    }
    await db.city.delete({where: {
        id: id
    }})
}

export const getCities = async () => {
   
    const cities = await db.city.findMany()
    return cities
}
