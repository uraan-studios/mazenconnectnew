"use server"

import { db } from "@/lib/db";
import { validateRequest } from "@/lib/validateSessions";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const getClassesWSections = async ()=> {
    const session = await validateRequest();
    if(!session) return [];

    const result = db.class.findMany({
        include: {
            ClassSection: true
        },
        where: {
            campusId: session.user?.fkid
        }
    })

    return result
}

export const getEmployeesCount = async () => {
    const session = await validateRequest()
    if(!session) return [];

    const result = await db.department.findMany({
        include: {
            Designation: {
              include: {
                _count: {
                  select: {
                    Staff: {
                      where: {
                        isActive: true,
                        campusId: session.user?.fkid,
                        // designationId: ,
                      }
                    }
                  }
                }
              }
            }
          }
        })


    return result
}

export const getTeachers = async () => {
    const session = await validateRequest()
    if(!session) return []

    const result = db.staff.findMany({
        where: {
            designationId: 1,
            campusId: session.user?.fkid
        }
    })
    return result
}

const principalReportSchema = z.object({
    studentRemarks: z.string().min(1, 'Principal Report student remarks are required').max(100, 'Principal Report student remarks is too long'),
    staffRemarks: z.string().min(1, 'Principal Report staff remarks are required').max(100, 'Principal Report staff remarks is too long'),
    workloadRemarks: z.string().min(1, 'Principal Report workload remarks are required').max(100, 'Principal Report workload remarks is too long'),
    ttblRemarks: z.string().min(1, 'Principal Report ttbl remarks are required').max(100, 'Principal Report ttbl remarks is too long'),
    parentFeedback: z.string().min(1, 'Principal Report parent feedback are required').max(100, 'Principal Report parent feedback is too long'),

    activity: z.object({
        name: z.string().min(1, 'Activity name is required').max(100, 'Activity name is too long'),
        description: z.string().min(1, 'Activity description is required').max(100, 'Activity description is too long'),
    }).array(),

    ttbl : z.object({
        name: z.string().min(1, 'TTBL name is required').max(100, 'TTBL name is too long'),
        available: z.number().min(0, 'TTBL available is required').max(1000, 'TTBL available is too long'),
        working: z.number().min(0, 'TTBL working is required').max(1000, 'TTBL working is too long'),
        outOfOrder: z.number().min(0, 'TTBL outOfOrder is required').max(1000, 'TTBL outOfOrder is too long'),
    }).array(),

    swot: z.object({
        strength: z.string().min(1, 'SWOT strength is required').max(100, 'SWOT strength is too long'),
        weakness: z.string().min(1, 'SWOT weakness is required').max(100, 'SWOT weakness is too long'),
        opportunity: z.string().min(1, 'SWOT opportunity is required').max(100, 'SWOT opportunity is too long'),
        threat: z.string().min(1, 'SWOT threat is required').max(100, 'SWOT threat is too long'),
    }),

    student: z.object({
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

    staff: z.object({
        id: z.number().min(0, 'Staff departmentId is required').max(1000, 'Staff departmentId is too long'),
        name: z.string().min(1, 'Staff name is required').max(100, 'Staff name is too long'),
        designations: z.object({
            id: z.number().min(0, 'Staff designationId is required').max(1000, 'Staff designationId is too long'),
            name: z.string().min(1, 'Staff designation name is required').max(100, 'Staff designation name is too long'),
            previous: z.number().min(0, 'Staff prev is required').max(1000, 'Staff prev is too long'),
            left: z.number().min(0, 'Staff left is required').max(1000, 'Staff left is too long'),
            new: z.number().min(0, 'Staff new is required').max(1000, 'Staff new is too long'),
            total: z.number().min(0, 'Staff total is required').max(1000, 'Staff total is too long'),
        }).array(),
    }).array(),

    workload: z.object({
        id: z.number().min(1, 'Workload name is required').max(100, 'Workload name is too long'),
        name: z.string().min(1, 'Workload name is required').max(100, 'Workload name is too long'),
        workload: z.number().min(0, 'Workload workload is required').max(1000, 'Workload workload is too long'),
        students: z.number()
    }).array(),

    hcd: z.object({
        meetings: z.number().min(0, 'HCD meetings is required').max(1000, 'HCD meetings is too long'),
        workload: z.number().min(0, 'HCD workload is required').max(1000, 'HCD workload is too long'),
    }),
  })

// export const createPrinicpalReport = async (data: z.infer<typeof principalReportSchema>) => {
//     const session = await validateRequest()
//     if(!session.user) return {errors: "You must be logged in to create a report."}

//     const validationResult = principalReportSchema.safeParse(data);

//     if (!validationResult.success) {
//         console.log("ERROR HERE 1122")
//         return {
//             errors: validationResult.error.flatten().fieldErrors.staffRemarks?.[0] || "Validation failed.",
//         };
//     }

//     console.log(validationResult.error)

//     try {
//         const report = await db.principalReport.create({
//             data: {
//                 campusId: session.user?.fkid,                
//                 studentRemarks: data.studentRemarks,
//                 staffRemarks: data.staffRemarks,
//                 workloadRemarks: data.workloadRemarks,
//                 ttblRemarks: data.ttblRemarks,
//                 parentFeedback: data.parentFeedback,
        
//                 PRactivity: {
//                     create: {
//                         PRactivityCell: {
//                             createMany: {
//                                 data: data.activity.map((activity) => ({
//                                     cellValue: activity.name,
//                                     description: activity.description,
//                                 }))
//                             }
//                         }
//                     }
//                 },

//                 PRttbl: {
//                     create: {
//                         PRttblCell: {
//                             createMany: {
//                                 data: data.ttbl.map((ttbl) => ({
//                                     name: ttbl.name,
//                                     avaliable: ttbl.available,
//                                     working: ttbl.working,
//                                     outOfOrder: ttbl.outOfOrder,
//                                 }))
//                             }
//                         }
//                     }
//                 },

//                 PRHcd: {
//                     create: {
//                         meetings: data.hcd.meetings,
//                         workload: data.hcd.workload,
//                     }
//                 },

//                 PRswot: {
//                     create: {
//                         strength: data.swot.strength,
//                         weakness: data.swot.weakness,
//                         opportunity: data.swot.opportunity,
//                         threat: data.swot.threat,
//                     }
//                 },

//                 PRworkload: {
//                     create: {
//                         PRworkloadCell: {
//                             createMany: {
//                                 data: data.workload.map((workload) => ({
//                                     teacherId: workload.id,
//                                     workload: workload.workload,
//                                     students: workload.students,
//                                 }))
//                             }
//                         }
//                     }
//                 },
//             }
//         });
//         console.log("REPORT CREATED")

//         const PRStudent = await db.pRstudent.create({
//             data: {
//                     reportId: report.id
//             }});

//         for (const cls of data.student) {
//             await db.pRstudentClassCell.create({
//                 data: {
//                     rowId: PRStudent.reportId,
//                     classId: cls.id,
//                     prev: cls.previous,
//                     left: cls.left,
//                     new: cls.new,
//                     movedOver: cls.promoted,
//                     promoted: cls.promoted,
//                     transfered: cls.transfered,
//                     total: cls.total,
//                     boys: cls.boys,
//                     girls: cls.girls,
//                     PRstudentSectionCell: {
//                         create: cls.sections.map((section) => ({
//                                 sectionId: section.id,
//                                 prev: section.previous,
//                                 left: section.left,
//                                 new: section.new,
//                                 movedOver: section.promoted,
//                                 promoted: section.promoted,
//                                 transfered: section.transfered,
//                                 total: section.total,
//                                 boys: section.boys,
//                                 girls: section.girls,
//                             }))
                        
//                     }
//                 }
//             });
//         }

//         const PRStaff = await db.pRStaff.create({
//             data: {
//                 reportId: report.id
//             }});

//         for (const staff of data.staff) {
//             await db.pRStaffDeps.create({
//                 data: {
//                     rowId: PRStaff.reportId,
//                     departmentId: staff.id,
//                     PRStaffDesig: {
//                         create: staff.designations.map((designation) => ({
//                             designationId: designation.id,
//                             prev: designation.previous,
//                             left: designation.left,
//                             new: designation.new,
//                             total: designation.total,
//                         }))
//                     }
//                 }
//             })
//         }  
    
//         return { success: true }; 

//     } catch (error) {
//         console.log(error)
//         return {
//             errors: "Failed to create report. Please try again later.",
//         };
//     } 

// }

export const deletePrincipalReport = async (id: number) => {
    const session = await validateRequest();
    if (!session.user?.isSuperUser) {
        return { errors: "You must be Administrator to delete a report." };
    }

    try {
        // Delete associated data first before deleting the main report
        await db.$transaction([
            // Delete PRswot
            db.pRswot.deleteMany({ where: { reportId: id } }),

            // Delete PRactivity and PRactivityCell
            db.pRactivityCell.deleteMany({ where: { PRactivity: { reportId: id } } }),
            db.pRactivity.deleteMany({ where: { reportId: id } }),

            // Delete PRworkload and PRworkloadCell
            db.pRworkloadCell.deleteMany({ where: { PRworkload: { reportId: id } } }),
            db.pRworkload.deleteMany({ where: { reportId: id } }),

            // Delete PRttbl and PRttblCell
            db.pRttblCell.deleteMany({ where: { PRttbl: { reportId: id } } }),
            db.pRttbl.deleteMany({ where: { reportId: id } }),

            // Delete PRstudent, PRstudentClassCell, and PRstudentSectionCell
            db.pRstudentSectionCell.deleteMany({ where: { PRstudent: { PRstudent: { reportId: id } } } }),
            db.pRstudentClassCell.deleteMany({ where: { PRstudent: { reportId: id } } }),
            db.pRstudent.deleteMany({ where: { reportId: id } }),

            // Delete PRStaff, PRStaffDeps, and PRStaffDesig
            db.pRStaffDesig.deleteMany({ where: { PRStaffDeps: { PRStaff: { reportId: id } } } }),
            db.pRStaffDeps.deleteMany({ where: { PRStaff: { reportId: id } } }),
            db.pRStaff.deleteMany({ where: { reportId: id } }),

            // Delete PRObservationRecord and PRObservationRecordCell
            db.pRObservationRecordCell.deleteMany({ where: { PRObservationRecord: { reportId: id } } }),
            db.pRObservationRecord.deleteMany({ where: { reportId: id } }),

            // Delete PRrechecking and PRrecheckingCell
            db.pRrecheckingSubjectCell.deleteMany({ where: { PRrechecking: {PRrechecking: { reportId: id } } } }),
            db.pRrecheckingCell.deleteMany({ where: { PRrechecking: { reportId: id } } }),
            db.pRrechecking.deleteMany({ where: { reportId: id } }),

            // Delete PRTenuffus
            db.pRTenuffus.deleteMany({ where: { reportId: id } }),

            // Delete PRELP
            db.pRELP.deleteMany({ where: { reportId: id } }),

            // Delete PRacademic and PRacademicCell
            db.pRacademicCell.deleteMany({ where: { PRacademic: { reportId: id } } }),
            db.pRacademic.deleteMany({ where: { reportId: id } }),

            // Delete PRHcd
            db.pRHcd.deleteMany({ where: { reportId: id } }),

            // Delete PRTTBLContent
            db.pRTTBLContent.deleteMany({ where: { reportId: id } }),

            // Delete the PrincipalReport itself
            db.principalReport.delete({ where: { id } })
        ]);

        return { report: true }
    } catch (error) {
        console.log(error)
        return { errors: `Failed to delete report: ` };
    }
};




export const getReport = async (id: number, campusId?: number) => {
    const session = await validateRequest()
    if(!session.user) return {errors: "You must be logged in to create a report."}

    const report = await db.principalReport.findUnique({
      where: {
          id: id,
          campusId: campusId || session.user?.fkid
      },
      include: {
        campus: true,

          PRStaff: {
              include: {
                  PRStaffDeps: {
                      include: {
                        department: true,
                          PRStaffDesig: {
                              include: {
                                  designation: true
                              }
                          }
                      }
                  }
              }
          },
          
          PRstudent: {
              include: {
                  PRstudentClassCell: {
                      include: {
                        class: true,
                        PRstudentSectionCell: {
                            include: {
                                section: true
                            }
                        }
                      }
                  }
              }
          },

          PRworkload: {
              include: {
                  PRworkloadCell: {
                    include: {
                        teacher: true
                    }
                  }
              }
          },

          PRttbl: {
              include: {
                  PRttblCell: true
              }
          },

          PRHcd: true,

          PRactivity: {
              include: {
                  PRactivityCell: true
              }
          },

          PRswot: true
      }
  });
  
    return report
}




export const getPrincipalReports = async (month?: Date | null  ,campusId?: number | null) => {
    const session = await validateRequest()
    if(!session.user) return []

    const reports = await db.principalReport.findMany({
        where: {
            campusId: campusId || session.user?.fkid,
        },
        include:{
            campus: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return reports
}

export const thisMonthPrincipalReport = async () => {
    const session = await validateRequest()
    if(!session.user) return {errors: "You must be logged in to create a report."}
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()

    const report = await db.principalReport.findFirst({
        where: {
            campusId: session.user?.fkid,
            createdAt: {
                gte: new Date(`${year}-${month}-01`),
                lte: new Date(`${year}-${month}-31`),
            }
        }
    })
    return report
}


export const getPRClassPrevById = async () => {
    console.log("HERE");
    const session = await validateRequest();
    if (!session.user) return null;

    const data = await db.principalReport.findFirst({
        where: { campusId: session.user?.fkid },
        orderBy: { id: "desc" },
        select: {
            id: true,
            PRstudent: {
                select: {
                    PRstudentClassCell: {
                        select: {
                            classId: true,
                            total: true,
                            PRstudentSectionCell: {
                                select: {
                                    sectionId: true,
                                    total: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    console.log(data?.id);
    return data;
};

