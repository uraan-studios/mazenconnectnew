"use server"
import { db } from "@/lib/db"
import { generateIdFromEntropySize } from "lucia";
import { z } from "zod";
import bcrypt from 'bcrypt'

const campusSchema = z.object({
    name: z.string().min(3, 'Campus name is required').max(50, 'Campus name is too long'),
    city: z.number().min(1, 'City is required').max(10, 'Choose a valid city'),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(50, 'Password is too long'),
    email: z.string().email('Invalid email').min(1, 'Email is required').max(100, 'Email is too long'),
});

export const createCampus = async (formData: z.infer<typeof campusSchema>) => {
    // Optional: Session validation can be added here
    // const session = await validateRequest();
    // if (!session.user) {
    //     return {
    //         errors: "You must be logged in to create a campus."
    //     }
    // }

    // Validate form data using Zod
    const validationResult = campusSchema.safeParse(formData);
    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
        };
    }

    // Hash the password
    const passHash = await bcrypt.hash(validationResult.data.password, 10);

    // Generate a unique user ID
    const userId = generateIdFromEntropySize(10);

    try {
        // Check if the email already exists using Prisma
        const existingCampus = await db.user.findUnique({
            where: {
                email: validationResult.data.email,
            }
        });

        if (existingCampus) {
            return {
                errors: "Email already exists. Please try again with a different email.",
            };
        }

        // Create the new campus in the database using Prisma
        const newCampus = await db.user.create({
            data: {
                id: userId,
                name: validationResult.data.name,
                email: validationResult.data.email,
                cityId: validationResult.data.city, // Assuming city is the cityId
                password: passHash,
                isSuperUser: false, // Default value
            },
        });


        // Return a success response
        return {
            success: true,
            campus: newCampus,
        };
    } catch (error) {
        console.error("Error creating campus:", error);
        return {
            errors: "Failed to create Campus. Please try again later.",
        };
    }
};