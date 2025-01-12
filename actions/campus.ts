"use server"

import { db } from "@/lib/db";
import { validateRequest } from "@/lib/validateSessions";

export const deleteCampus = async (id: number) => {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a campus."
        }
    }
    await db.user.delete({where: {
        fkId: id
    }})
}

export const getCampuses = async () => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }

    return await db.user.findMany({
        include: {
            city: true
        }
    })
}