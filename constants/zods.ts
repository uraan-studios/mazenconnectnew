import { number, z } from "zod";



export const studentSchema = z.object({
    reportId: z.number().min(0, 'Student reportId is required').max(1000, 'Student reportId is too long'),
    remarks: z.string().min(5, 'Principal Report student remarks are required').max(100, 'Principal Report student remarks is too long'),
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
    remarks: z.string().min(1, 'Principal Report Rechecking remarks are required').max(100, 'Principal Report Rechecking remarks is too long'),
    PRrecheckingCell: z.object({
        classId: z.number().min(0, 'Rechecking classId is required').max(1000, 'Rechecking classId is too long'),
        teacherId: z.number().min(0, 'Rechecking teacherId is required').max(1000, 'Rechecking teacherId is too long'),
        subjectId: z.number().min(0, 'Rechecking subjectId is required').max(1000, 'Rechecking subjectId is too long'),
        count: z.number().min(0, 'Rechecking count is required').max(1000, 'Rechecking count is too long'),
        total: z.number().min(0, 'Rechecking total is required').max(1000, 'Rechecking total is too long'),
    }).array(),
})

export const ttblSchema = z.object({
    reportId: z.number().min(0, 'TTBL reportId is required').max(100, 'TTBL reportId is too long'),
    remarks: z.string().min(0, 'Principal Report TTBL remarks are required').max(1000, 'Principal Report TTBL remarks is too long'),
    PRttblCell: z.object({
        name: z.string().min(1, 'TTBL name is required').max(100, 'TTBL name is too long'),
        available: z.number().min(0, 'TTBL available is required').max(1000, 'TTBL available is too long'),
        working: z.number().min(0, 'TTBL working is required').max(1000, 'TTBL working is too long'),
        outOfOrder: z.number().min(0, 'TTBL outOfOrder is required').max(1000, 'TTBL outOfOrder is too long'),
    }).array(),
})

export const TTBLContentSchema = z.object({
  reportId: z.number().min(0, "TTBL reportId is required").max(1000, "TTBL reportId is too long"),
  tbisRemarks: z.string().min(1, "TTBL tbisRemarks are required").max(100, "TTBL tbisRemarks is too long"),

  preNurseryCLLE: z.boolean(),
  preNurseryCLLU: z.boolean(),
  preNurseryMD: z.boolean(),
  nurseryCLLE: z.boolean(),
  nurseryCLLU: z.boolean(),
  nurseryMD: z.boolean(),
  kindergartenCLLE: z.boolean(),
  kindergartenCLLU: z.boolean(),
  kindergartenMD: z.boolean(),

  g1Eng: z.boolean(),
  g1Urdu: z.boolean(),
  g1Math: z.boolean(),
  g1GK: z.boolean(),
  g1ICT: z.boolean(),
  g1Isl: z.boolean(),

  g2Eng: z.boolean(),
  g2Urdu: z.boolean(),
  g2Math: z.boolean(),
  g2GK: z.boolean(),
  g2ICT: z.boolean(),
  g2Isl: z.boolean(),

  g3Eng: z.boolean(),
  g3Urdu: z.boolean(),
  g3Math: z.boolean(),
  g3GK: z.boolean(),
  g3ICT: z.boolean(),
  g3Isl: z.boolean(),

  g4Eng: z.boolean(),
  g4Urdu: z.boolean(),
  g4Math: z.boolean(),
  g4SS: z.boolean(),
  g4ICT: z.boolean(),
  g4Isl: z.boolean(),
  g4Sci: z.boolean(),

  g5Eng: z.boolean(),
  g5Urdu: z.boolean(),
  g5Math: z.boolean(),
  g5SS: z.boolean(),
  g5ICT: z.boolean(),
  g5Isl: z.boolean(),
  g5Sci: z.boolean(),
});

export const tenuusSchema = z.object({
    reportId: z.number().min(0, 'Tenuus reportId is required').max(1000, 'Tenuus reportId is too long'),
    remarks: z.string().min(1, 'Principal Report Tenuus remarks are required').max(100, 'Principal Report Tenuus remarks is too long'),
    ealyYears: z.number().min(0, 'Principal Report Tenuus ealyYears is required').max(100, 'Principal Report Tenuus ealyYears is too long'),
    primaryYears: z.number().min(0, 'Principal Report Tenuus primaryYears is required').max(100, 'Principal Report Tenuus primaryYears is too long'),
    middleYears: z.number().min(0, 'Principal Report Tenuus middleYears is required').max(100, 'Principal Report Tenuus middleYears is too long'),
})

export const hcdSchema = z.object({
  reportId: z.number().min(0, "HCD reportId is required").max(1000, "HCD reportId is too long"),
  remarks: z.string().min(1, "Remarks are required").max(100, "Remarks must be less than 100 characters"),

  preNurseryPlanner: z.number().min(0, "Pre-Nursery Planner must be 0 or greater"),
  preNurseryWorksheets: z.number().min(0, "Pre-Nursery Worksheets must be 0 or greater"),
  preNurseryTTBL: z.number().min(0, "Pre-Nursery TTBL must be 0 or greater"),

  nurseryPlanner: z.number().min(0, "Nursery Planner must be 0 or greater"),
  nurseryWorksheets: z.number().min(0, "Nursery Worksheets must be 0 or greater"),
  nurseryTTBL: z.number().min(0, "Nursery TTBL must be 0 or greater"),

  kindergartenPlanner: z.number().min(0, "Kindergarten Planner must be 0 or greater"),
  kindergartenWorksheets: z.number().min(0, "Kindergarten Worksheets must be 0 or greater"),
  kindergartenTTBL: z.number().min(0, "Kindergarten TTBL must be 0 or greater"),

  grade1Planner: z.number().min(0, "Grade 1 Planner must be 0 or greater"),
  grade1Worksheets: z.number().min(0, "Grade 1 Worksheets must be 0 or greater"),
  grade1TTBL: z.number().min(0, "Grade 1 TTBL must be 0 or greater"),

  grade2Planner: z.number().min(0, "Grade 2 Planner must be 0 or greater"),
  grade2Worksheets: z.number().min(0, "Grade 2 Worksheets must be 0 or greater"),
  grade2TTBL: z.number().min(0, "Grade 2 TTBL must be 0 or greater"),

  grade3Planner: z.number().min(0, "Grade 3 Planner must be 0 or greater"),
  grade3Worksheets: z.number().min(0, "Grade 3 Worksheets must be 0 or greater"),
  grade3TTBL: z.number().min(0, "Grade 3 TTBL must be 0 or greater"),

  grade4Planner: z.number().min(0, "Grade 4 Planner must be 0 or greater"),
  grade4Worksheets: z.number().min(0, "Grade 4 Worksheets must be 0 or greater"),
  grade4TTBL: z.number().min(0, "Grade 4 TTBL must be 0 or greater"),

  grade5Planner: z.number().min(0, "Grade 5 Planner must be 0 or greater"),
  grade5Worksheets: z.number().min(0, "Grade 5 Worksheets must be 0 or greater"),
  grade5TTBL: z.number().min(0, "Grade 5 TTBL must be 0 or greater"),

  grade6Planner: z.number().min(0, "Grade 6 Planner must be 0 or greater"),
  grade6Worksheets: z.number().min(0, "Grade 6 Worksheets must be 0 or greater"),

  grade7Planner: z.number().min(0, "Grade 7 Planner must be 0 or greater"),
  grade7Worksheets: z.number().min(0, "Grade 7 Worksheets must be 0 or greater"),

  grade8Planner: z.number().min(0, "Grade 8 Planner must be 0 or greater"),
  grade8Worksheets: z.number().min(0, "Grade 8 Worksheets must be 0 or greater"),
});

export const elpSchema = z.object({
    reportId: z.number().min(0, "Report ID is required"),
  
    remarks: z.string().min(1, "Remarks are required").max(100, "Remarks must be less than 100 characters"),
  
    grade1Planner: z.number().min(0, "Grade 1 Planner must be 0 or greater"),
    grade1Worksheets: z.number().min(0, "Grade 1 Worksheets must be 0 or greater"),
  
    grade2Planner: z.number().min(0, "Grade 2 Planner must be 0 or greater"),
    grade2Worksheets: z.number().min(0, "Grade 2 Worksheets must be 0 or greater"),
  
    grade3Planner: z.number().min(0, "Grade 3 Planner must be 0 or greater"),
    grade3Worksheets: z.number().min(0, "Grade 3 Worksheets must be 0 or greater"),
  
    grade4Planner: z.number().min(0, "Grade 4 Planner must be 0 or greater"),
    grade4Worksheets: z.number().min(0, "Grade 4 Worksheets must be 0 or greater"),
  
    grade5Planner: z.number().min(0, "Grade 5 Planner must be 0 or greater"),
    grade5Worksheets: z.number().min(0, "Grade 5 Worksheets must be 0 or greater"),
  
    grade6Planner: z.number().min(0, "Grade 6 Planner must be 0 or greater"),
    grade6Worksheets: z.number().min(0, "Grade 6 Worksheets must be 0 or greater"),
  
    grade7Planner: z.number().min(0, "Grade 7 Planner must be 0 or greater"),
    grade7Worksheets: z.number().min(0, "Grade 7 Worksheets must be 0 or greater"),
  
    grade8Planner: z.number().min(0, "Grade 8 Planner must be 0 or greater"),
    grade8Worksheets: z.number().min(0, "Grade 8 Worksheets must be 0 or greater"),
  });

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

