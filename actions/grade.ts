"use server"

import { db } from "@/lib/db"

export const getGrades = async () => {
    const division = await db.division.findMany({
        include: {
            grades: {
                select:{
                    id: true,
                    name: true,
                }
            }
        }
    })
    // console.log(division)
    return division
}