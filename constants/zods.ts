import { number, z } from "zod";



export const studentSchema = z.object({
    reportId: z.number().min(0, 'Student reportId is required').max(1000, 'Student reportId is too long'),
    remarks: z.string().min(1, 'Principal Report student remarks are required').max(100, 'Principal Report student remarks is too long'),
    PRstudentClassCell: z.object({
    id: z.number().min(0, 'Student classId is required').max(1000, 'Student classId is too long'),
    name: z.string().min(1, 'Student name is required').max(100, 'Student name is too long'),
    previous: z.number().min(0, 'Student prev is required').max(1000, 'Student prev is too long'),
    left: z.number().min(0, 'Student left is required').max(1000, 'Student left is too long'),
    new: z.number().min(0, 'Student new is required').max(1000, 'Student new is too long'),
    transfered: z.number().min(0, 'Student transfered is required').max(1000, 'Student transfered is too long'),
    promoted: z.number().min(0, 'Student promoted is required').max(1000, 'Student promoted is too long'),
    total: z.number().min(0, 'Student total is required').max(1000, 'Student total is too long'),
    boys: z.number().min(0, 'Student boys is required').max(1000, 'Student boys is too long'),
    girls: z.number().min(0, 'Student girls is required').max(1000, 'Student girls is too long'),
    sectionCount: z.number().min(0, 'Student sectionCount is required').max(1000, 'Student sectionCount is too long'),
    studentPerSection: z.number().min(0, 'Student studentPerSection is required').max(1000, 'Student studentPerSection is too long'),
    sections: z.object({
        id: z.number().min(0, 'Student sectionId is required').max(1000, 'Student sectionId is too long'),
        name: z.string().min(1, 'Student section name is required').max(100, 'Student section name is too long'),
        previous: z.number().min(0, 'Student prev is required').max(1000, 'Student prev is too long'),
        left: z.number().min(0, 'Student left is required').max(1000, 'Student left is too long'),
        new: z.number().min(0, 'Student new is required').max(1000, 'Student new is too long'),
        transfered: z.number().min(0, 'Student transfered is required').max(1000, 'Student transfered is too long'),
        promoted: z.number().min(0, 'Student promoted is required').max(1000, 'Student promoted is too long'),
        total: z.number().min(0, 'Student total is required').max(1000, 'Student total is too long'),
        boys: z.number().min(0, 'Student boys is required').max(1000, 'Student boys is too long'),
        girls: z.number().min(0, 'Student girls is required').max(1000, 'Student girls is too long'),
    }).array(),
}).array(),
})

export const staffSchema = z.object({
    reportId: z.number().min(0, 'Staff reportId is required').max(1000, 'Staff reportId is too long'),
    remarks: z.string().min(1, 'Principal Report staff remarks are required').max(100, 'Principal Report staff remarks is too long'),
    PRStaffDeps: z.object({
        id: z.number().min(0, 'Staff departmentId is required').max(1000, 'Staff departmentId is too long'),
        name: z.string().min(1, 'Staff name is required').max(100, 'Staff name is too long'),
        PRStaffDesig: z.object({
            id: z.number().min(0, 'Staff designationId is required').max(1000, 'Staff designationId is too long'),
            name: z.string().min(1, 'Staff designation name is required').max(100, 'Staff designation name is too long'),
            prev: z.number().min(0, 'Staff prev is required').max(1000, 'Staff prev is too long'),
            left: z.number().min(0, 'Staff left is required').max(1000, 'Staff left is too long'),
            new: z.number().min(0, 'Staff new is required').max(1000, 'Staff new is too long'),
            total: z.number()
        }).array(),
    }).array(),
})

export const workloadSchema = z.object({
    reportId: z.number().min(0, 'Workload reportId is required').max(1000, 'Workload reportId is too long'),
    remarks: z.string().min(1, 'Principal Report workload remarks are required').max(100, 'Principal Report workload remarks is too long'),
    PRworkloadCell: z.object({
        id: z.number().min(0, 'Workload name is required').max(100, 'Workload name is too long'),
        name: z.string().min(1, 'Workload name is required').max(100, 'Workload name is too long'),
        workload: z.number().min(0, 'Workload workload is required').max(1000, 'Workload workload is too long'),
        students: z.number()
    }).array(),
})

export const observationSchema = z.object({
    reportId: z.number().min(0, 'Observation reportId is required').max(1000, 'Observation reportId is too long'),
    PRObservationRecordCell: z.object({
        teacherId: z.number().min(0, 'Observation teacherId is required').max(1000, 'Observation teacherId is too long'),
        classId: z.number().min(0, 'Observation classId is required').max(1000, 'Observation classId is too long'),
        subjectId: z.number().min(0, 'Observation subjectId is required').max(1000, 'Observation subjectId is too long'),
        walkthrough: z.string().min(1, 'Observation walkthrough is required').max(100, 'Observation walkthrough is too long'),
        informed: z.string().min(1, 'Observation informed is required').max(100, 'Observation informed is too long'),
        uninformed: z.string().min(1, 'Observation uninformed is required').max(100, 'Observation uninformed is too long'),
    }).array(),
})  

export const RecheckingSchema = z.object({
    reportId: z.number().min(0, 'Rechecking reportId is required').max(1000, 'Rechecking reportId is too long'),
    PRrecheckingCell: z.object({
        classId: z.number().min(0, 'Rechecking classId is required').max(1000, 'Rechecking classId is too long'),
        teacherId: z.number().min(0, 'Rechecking teacherId is required').max(1000, 'Rechecking teacherId is too long'),
        subjectId: z.number().min(0, 'Rechecking subjectId is required').max(1000, 'Rechecking subjectId is too long'),
        status: z.boolean(),
    }).array(),
})

export const ttblSchema = z.object({
    reportId: z.number().min(0, 'TTBL reportId is required').max(1000, 'TTBL reportId is too long'),
    remarks: z.string().min(1, 'Principal Report TTBL remarks are required').max(100, 'Principal Report TTBL remarks is too long'),
    PRttblCell: z.object({
        name: z.string().min(1, 'TTBL name is required').max(100, 'TTBL name is too long'),
        available: z.number().min(0, 'TTBL available is required').max(1000, 'TTBL available is too long'),
        working: z.number().min(0, 'TTBL working is required').max(1000, 'TTBL working is too long'),
        outOfOrder: z.number().min(0, 'TTBL outOfOrder is required').max(1000, 'TTBL outOfOrder is too long'),
    }).array(),
})

export const TTBLContentSchema = z.object({
    reportId: z.number().min(0, 'TTBL reportId is required').max(1000, 'TTBL reportId is too long'),
    preNurseryCLLE : z.boolean(),
    preNurseryCLLU : z.boolean(),
    preNurseryMD : z.boolean(),
    nurseryCLLE : z.boolean(),
    nurseryCLLU : z.boolean(),
    nurseryMD : z.boolean(),
    kindergartenCLLE : z.boolean(),
    kindergartenCLLU : z.boolean(),
    kindergartenyMD : z.boolean(),
})

export const tenuusSchema = z.object({
    reportId: z.number().min(0, 'Tenuus reportId is required').max(1000, 'Tenuus reportId is too long'),
    remarks: z.string().min(1, 'Principal Report Tenuus remarks are required').max(100, 'Principal Report Tenuus remarks is too long'),
    ealyYears: z.number().min(0, 'Principal Report Tenuus ealyYears is required').max(100, 'Principal Report Tenuus ealyYears is too long'),
    primaryYears: z.number().min(0, 'Principal Report Tenuus primaryYears is required').max(100, 'Principal Report Tenuus primaryYears is too long'),
    middleYears: z.number().min(0, 'Principal Report Tenuus middleYears is required').max(100, 'Principal Report Tenuus middleYears is too long'),
})

export const hcdSchema = z.object({
    reportId: z.number().min(0, 'Tenuus reportId is required').max(1000, 'Tenuus reportId is too long'),
    remarks: z.string().min(1, 'Principal Report Tenuus remarks are required').max(100, 'Principal Report Tenuus remarks is too long'),
    meetings: z.number().min(0),
    workload: z.number().min(0)
})

export const activitySchema = z.object({ 
    reportId: z.number().min(0, 'Tenuus reportId is required').max(1000, 'Tenuus reportId is too long'),
    remarks: z.string().min(1, 'Remarks are required').max(1000, 'Remarks are too long'),
    activities: z.object({
        name: z.string().min(1, 'Activity name is required').max(100, 'Activity name is too long'),
        date: z.string().min(1, 'Activity date is required').max(100, 'Activity date is too long'),
        description: z.string().min(1, 'Activity description is required').max(100, 'Activity description is too long'),
    }).array(),
})


export const swotSchema = z.object({
    reportId: z.number().min(0, 'Tenuus reportId is required').max(1000, 'Tenuus reportId is too long'),
    strength: z.string().min(1, 'SWOT strength is required').max(100, 'SWOT strength is too long'),
    weakness: z.string().min(1, 'SWOT weakness is required').max(100, 'SWOT weakness is too long'),
    opportunity: z.string().min(1, 'SWOT opportunity is required').max(100, 'SWOT opportunity is too long'),
    threat: z.string().min(1, 'SWOT threat is required').max(100, 'SWOT threat is too long'),
})

