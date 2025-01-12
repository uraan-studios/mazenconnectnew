"use server"
import { db } from "@/lib/db";


const SeedClassData = async () => {
    const divisions = await db.division.createMany({
        data: [
            {id: 1, name: "Early Years"},
            {id: 2, name: "Primary Years (1-3)"},
            {id: 3, name: "Primary Years (4-5)"},
            {id: 4, name: "Middle Years"},
        ]
    })

    const grades = await db.grade.createMany({
        data: [
            {id: 1, name: "Pre-Nursery", divisionId: 1},
            {id: 2, name: "Nursery", divisionId: 1},
            {id: 3, name: "Kindergarten", divisionId: 1},
            {id: 4, name: "Grade 1", divisionId: 2},
            {id: 5, name: "Grade 2", divisionId: 2},
            {id: 6, name: "Grade 3", divisionId: 2},
            {id: 7, name: "Grade 4", divisionId: 2},
            {id: 8, name: "Grade 5", divisionId: 2},
        ]
    })

    const subjects = await db.subjects.createMany({
        data: [
            {id: 1, name: "CLLE", gradeId: 1},
            {id: 2, name: "CLLU", gradeId: 1},
            {id: 3, name: "MD", gradeId: 1},
            
            {id: 4, name: "CLLE", gradeId: 2},
            {id: 5, name: "CLLU", gradeId: 2},
            {id: 6, name: "MD", gradeId: 2},

            {id: 7, name: "CLLE", gradeId: 3},
            {id: 8, name: "CLLU", gradeId: 3},
            {id: 9, name: "MD", gradeId: 3},
            
            {id: 10, name: "English", gradeId: 4},
            {id: 11, name: "Urdu", gradeId: 4},
            {id: 12, name: "Mathematics", gradeId: 4},
            {id: 13, name: "General Knowledge", gradeId: 4},
            {id: 14, name: "ICT", gradeId: 4},
            {id: 15, name: "Islamiyat", gradeId: 4},
            
            {id: 16, name: "English", gradeId: 5},
            {id: 17, name: "Urdu", gradeId: 5},
            {id: 18, name: "Mathematics", gradeId: 5},
            {id: 19, name: "General Knowledge", gradeId: 5},
            {id: 20, name: "ICT", gradeId: 5},
            {id: 21, name: "Islamiyat", gradeId: 5},
            
            {id: 22, name: "English", gradeId: 6},
            {id: 23, name: "Urdu", gradeId: 6},
            {id: 24, name: "Mathematics", gradeId: 6},
            {id: 25, name: "General Knowledge", gradeId: 6},
            {id: 26, name: "ICT", gradeId: 6},
            {id: 27, name: "Islamiyat", gradeId: 6},
            
            {id: 28, name: "English", gradeId: 7},
            {id: 29, name: "Urdu", gradeId: 7},
            {id: 30, name: "Mathematics", gradeId: 7},
            {id: 31, name: "Social Studies", gradeId: 7},
            {id: 32, name: "ICT", gradeId: 7},
            {id: 33, name: "Islamiyat", gradeId: 7},
            {id: 34, name: "Science", gradeId: 7},

        ]
    })
};


const SeedCampusData = async () => {
    const cities = await db.city.createMany({
        data: [
            {id: 1, name: "Islamabad"},
            {id: 2, name: "Rawalpindi"},
            {id: 3, name: "Lahore"},
            {id: 4, name: "Sialkot"},
            {id: 5, name: "Sargodha"},
        ]
    })

    const headoffice = await db.user.create({
        data: {
            id: "icpvhuzeck4s5ok4",
            email: "headoffice@mazenschools.edu.pk",
            name: "Head Office",
            phone: "331 6293601",
            isSuperUser: true,
            password: "$2b$10$CKFNRdOqjPN2gJS1dJ7/Eepq.y/HN6Nd1JnhJjA5E.FYKzPEPUopy",
            cityId: 1,
        }
    })

    
    const departments = await db.department.createMany({
        data: [
            {id: 1, name: "Academics"},
            {id: 2, name: "Administration"},
            {id: 3, name: "Non-Academics"},
        ]
    })
    

    
    const designations = await db.designation.createMany({
        data: [
            {id: 1, name: "Teacher", departmentId: 1},
            {id: 2, name: "Principal", departmentId: 2},
        ]
    })

    const staffStatus = await db.staffStatus.createMany({
        data: [
            {id: 1, name: "permanent"},
            {id: 2, name: "visiting"},
        ]
    })
    
}

export const seedData = async () => {
    await SeedClassData()
    await SeedCampusData()
}