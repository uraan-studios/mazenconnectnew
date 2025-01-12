"use server"
import { db } from "@/lib/db";
import { validateRequest } from "@/lib/validateSessions";
import { z } from "zod";

const subjectSchema = z.object({
    name: z.string().min(1, 'Subject name is required').max(100, 'Subject name is too long'),
});

// export const createSubject = async (data: z.infer<typeof subjectSchema>) => {
//     const session = await validateRequest();
//     if (!session.user) return { errors: "You must be logged in to create a report." };

//     const validationResult = subjectSchema.safeParse(data);

//     if (!validationResult.success) {
//         return {
//             errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
//         };
//     }

//     try {
//         const subject = await db.subjects.create({
//             data: {
//                 name: data.name,
//                 gradeId:
//             },
//         });
//         return { success: true };
//     } catch (error) {
//         console.log(error);
//         return {
//             errors: "Failed to create report. Please try again later.",
//         };
//     }
// };


export const deleteSubject = async (id: number) => {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a city."
        }
    }

    await db.subjects.delete({
        where: {
            id: id
        }
    })
}

export const getSubjects = async () => {
    const subjects = await db.subjects.findMany()
    return subjects
}