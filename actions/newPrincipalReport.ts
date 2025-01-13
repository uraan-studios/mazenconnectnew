"use server"
import { db } from "@/lib/db"
import { validateRequest } from "@/lib/validateSessions";
import { report } from "process";
import { number, z } from "zod";
import { unstable_cache } from 'next/cache'
import { activitySchema, hcdSchema, observationSchema, RecheckingSchema, staffSchema, studentSchema, swotSchema, tenuusSchema, TTBLContentSchema, ttblSchema, workloadSchema } from "@/constants/zods";


export const validateModuleData = async (data: any, schema: z.ZodType<any, any, any>) => {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
        return validationResult.error.flatten().fieldErrors;
    }
    return null;  // Validation successful
}


export const createReport = async () => {
    const session = await validateRequest()
    if(!session.user) return {errors: "You must be logged in to create a report."}

    const report = await db.principalReport.create({
        data: {
            campusId: session.user?.fkid

    }})

    return report.id
}



export const createStudent = async (data: z.infer<typeof studentSchema>) => {
    const session = await validateRequest()
    if(!session.user) return {errors: "You must be logged in to create a report."}

    const validationResult = studentSchema.safeParse(data);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors.remarks?.[0] || "Validation failed.",
        };
    }

    try {
        const studentModule = await db.pRstudent.create({
            data: {
                reportId: validationResult.data.reportId,
                remarks: validationResult.data.remarks,

            }});

        
            for (const cls of validationResult.data.PRstudentClassCell) {
                await db.pRstudentClassCell.create({
                    data: {
                        rowId: studentModule.reportId,
                        classId: cls.id,
                        prev: cls.previous,
                        left: cls.left,
                        new: cls.new,
                        movedOver: cls.promoted,
                        promoted: cls.promoted,
                        transfered: cls.transfered,
                        total: cls.total,
                        boys: cls.boys,
                        girls: cls.girls,
                        PRstudentSectionCell: {
                            create: cls.sections.map((section) => ({
                                    sectionId: section.id,
                                    prev: section.previous,
                                    left: section.left,
                                    new: section.new,
                                    movedOver: section.promoted,
                                    promoted: section.promoted,
                                    transfered: section.transfered,
                                    total: section.total,
                                    boys: section.boys,
                                    girls: section.girls,
                                }))
                            
                        }
                    }
                })
            }

            return studentModule

        } catch (error) {            
            console.log(error)
            return {
                errors: "Failed to create report. Please try again later.",
            };
        }}




export const createStaff = async (data: z.infer<typeof staffSchema>) => {
    const session = await validateRequest()
    if(!session.user) return {errors: "You must be logged in to create a report."}

    const validationResult = staffSchema.safeParse(data);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten()
        };
    }

    try {
        const staffModule = await db.pRStaff.create({
            data: {
                reportId: validationResult.data.reportId,
                remarks: validationResult.data.remarks,

            }});

        
            for (const dep of validationResult.data.PRStaffDeps) {
                await db.pRStaffDeps.create({
                    data: {
                        rowId: staffModule.reportId,
                        departmentId: dep.id,
                        PRStaffDesig: {
                            create: dep.PRStaffDesig.map((desig) => ({
                                designationId: desig.id,
                                prev: desig.prev,
                                left: desig.left,
                                new: desig.new,
                                total: desig.total,
                            }))
                        }
                    }
                })
            }

            return staffModule

        } catch (error) {            
            console.log(error)
            return {
                errors: "Failed to create report. Please try again later.",
            };
        }}



export const createWorkload = async (data: z.infer<typeof workloadSchema>) => {
    const session = await validateRequest()
    if(!session.user) return {errors: "You must be logged in to create a report."}

    const validationResult = workloadSchema.safeParse(data);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors.remarks?.[0] || "Validation failed.",
        };
    }

    try {
        const workloadModule = await db.pRworkload.create({
            data: {
                reportId: validationResult.data.reportId,
                remarks: validationResult.data.remarks,
                PRworkloadCell: {
                    createMany: { 
                        data: validationResult.data.PRworkloadCell.map((cell) => ({
                        teacherId: cell.id,
                        workload: cell.workload,
                        students: cell.students,
                    }))
                }

            }}
    })

        return workloadModule

    } catch (error) {            
        console.log(error)
        return {
            errors: "Failed to create report. Please try again later.",
        };
    }}



export const createObservation = async (data: z.infer<typeof observationSchema>) => {
    const session = await validateRequest()
    if(!session.user) return {errors: "You must be logged in to create a report."}

    const validationResult = observationSchema.safeParse(data);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors.reportId?.[0] || "Validation failed.",
        };
    }

    try {
        const observationModule = await db.pRObservationRecord.create({
            data: {
                reportId: validationResult.data.reportId,
                PRObservationRecordCell: {
                    createMany: { 
                        data: validationResult.data.PRObservationRecordCell.map((cell) => ({
                            classId: cell.classId,
                            teacherId: cell.teacherId,
                            subjectId: cell.subjectId,
                            walkthrough: cell.walkthrough,
                            informed: cell.informed,
                            uninformed: cell.uninformed,
                        }))
                    }
                }
            }
        })

        return observationModule

    } catch (error) {            
        console.log(error)
        return {
            errors: "Failed to create report. Please try again later.",
        };
    } 

}



export const createRechecking = async (data: z.infer<typeof RecheckingSchema>) => {
    const session = await validateRequest()
    if(!session.user) return {errors: "You must be logged in to create a report."}

    const validationResult = RecheckingSchema.safeParse(data);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors.reportId?.[0] || "Validation failed.",
        };
    }

    try {
        const recheckingModule = await db.pRrechecking.create({
            data: {
                reportId: validationResult.data.reportId,
                PRrecheckingCell: {
                    createMany: { 
                        data: validationResult.data.PRrecheckingCell.map((cell) => ({
                        classId: cell.classId,
                        teacherId: cell.teacherId,
                        subjectId: cell.subjectId,
                        status: cell.status,
                    }))
                }

            }}
    })

        return recheckingModule

    } catch (error) {            
        console.log(error)
        return {
            errors: "Failed to create report. Please try again later.",
        };
    }}



export const createTTBL = async (data: z.infer<typeof ttblSchema>) => {
    const session = await validateRequest()
    if(!session.user) return {errors: "You must be logged in to create a report."}

    const validationResult = ttblSchema.safeParse(data);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors.reportId?.[0] || "Validation failed.",
        };
    }

    try {
        const ttblModule = await db.pRttbl.create({
            data: {
                reportId: validationResult.data.reportId,
                remarks: validationResult.data.remarks,
                PRttblCell: {
                    createMany: { 
                        data: validationResult.data.PRttblCell.map((cell) => ({
                        name: cell.name,
                        avaliable: cell.available,
                        working: cell.working,
                        outOfOrder: cell.outOfOrder,
                    }))
                }

            }}
    })

        return ttblModule

    } catch (error) {            
        console.log(error)
        return {
            errors: "Failed to create report. Please try again later.",
        };
    }}




export const createTTBLContent = async (data: z.infer<typeof TTBLContentSchema>) => {
        const session = await validateRequest()
        if(!session.user) return {errors: "You must be logged in to create a report."}

        const validationResult = TTBLContentSchema.safeParse(data);

        if (!validationResult.success) {
            return {
                errors: validationResult.error.flatten().fieldErrors.reportId?.[0] || "Validation failed.",
            };
        }

        try {
            const ttblModule = await db.pRTTBLContent.create({
                data: {
                    reportId: validationResult.data.reportId,
                    preNurseryCLLE: validationResult.data.preNurseryCLLE,
                    preNurseryCLLU: validationResult.data.preNurseryCLLU,
                    preNurseryMD: validationResult.data.preNurseryMD,
                    nurseryCLLE: validationResult.data.nurseryCLLE,
                    nurseryCLLU: validationResult.data.nurseryCLLU,
                    nurseryMD: validationResult.data.nurseryMD,
                    kindergartenCLLE: validationResult.data.kindergartenCLLE,
                    kindergartenCLLU: validationResult.data.kindergartenCLLU,
                    kindergartenyMD: validationResult.data.kindergartenyMD,
                }    
            })

            return ttblModule

        } catch (error) {            
            console.log(error)
            return {
                errors: "Failed to create report. Please try again later.",
            };
        }
    }
  



export const createTenuus = async (data: z.infer<typeof tenuusSchema>) => {
        const session = await validateRequest()
        if(!session.user) return {errors: "You must be logged in to create a report."}

        const validationResult = tenuusSchema.safeParse(data);

        if (!validationResult.success) {
            return {
                errors: validationResult.error.flatten().fieldErrors.reportId?.[0] || "Validation failed.",
            };
        }

        try {
            const tenuusModule = await db.pRTenuffus.create({
                data: {
                    reportId: validationResult.data.reportId,
                    remarks: validationResult.data.remarks,
                    // number: validationResult.data.number,
                    ealyYears: validationResult.data.ealyYears,
                    primaryYears: validationResult.data.primaryYears,
                    middleYears: validationResult.data.middleYears,

                }
            })

            return tenuusModule

        } catch (error) {            
            console.log(error)
            return {
                errors: "Failed to create report. Please try again later.",
            };
        }} 
        
        


export const createHCDModule = async (data: z.infer<typeof hcdSchema>) => {
    const session = await validateRequest()
    if(!session.user) return {errors: "You must be logged in to create a report."}

    const validationResult = hcdSchema.safeParse(data)
    if(!validationResult.success) return {errors: validationResult.error.issues}

    try {
        const report = await db.pRHcd.create({
            data: {
                reportId: data.reportId,
                remarks: data.remarks,
                meetings: data.meetings,
                workload: data.workload,
            }
        })
        return {report}
    } catch (error) {
        console.error(error)
        return {errors: "An error occurred while creating the report."}
    }
}


export const createActivity = async (data: z.infer<typeof activitySchema>) => {
    const session = await validateRequest()
    if(!session.user) return {errors: "You must be logged in to create a report."}

    const validationResult = activitySchema.safeParse(data);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors.remarks?.[0] || "Validation failed.",
        };
    }

    try {
        const activityModule = await db.pRactivity.create({
            data: {
                reportId: validationResult.data.reportId,
                remarks: validationResult.data.remarks,
                PRactivityCell: {
                    createMany: {
                        data: validationResult.data.activities.map((activity) => ({
                            cellValue: activity.name,
                            date: activity.date,
                            description: activity.description,
                        }))
                    }
                }
            }
        })

        return activityModule

    } catch (error) {            
        console.log(error)
        return {
            errors: "Failed to create report. Please try again later.",
        };
    } 

}



export const createSWOT = async (data: z.infer<typeof swotSchema>) => {
    const validationResult = swotSchema.safeParse(data)
    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors,
        };
    }
    try {
        const swotModule = await db.pRswot.create({
            data: {
                reportId: data.reportId,
                strength: data.strength,
                weakness: data.weakness,
                opportunity: data.opportunity,
                threat: data.threat,
            }
        })
        return swotModule
    } catch (error) {
        console.log(error)
        return {
            errors: "Failed to create SWOT module. Please try again later.",
        };
    }
}


export const getReport = async (id: number, campusId?: number) => {
    // Move session validation outside of the cached function
    const session = await validateRequest();
    if (!session.user) return { errors: "You must be logged in to create a report." }

    // Define a cached function that takes only the data needed for caching
    const fetchReport = unstable_cache(async (id: number, campusId: number) => {
        return await db.principalReport.findUnique({
            where: {
                id: id,
                campusId: campusId
            },
            include: {
                campus:true,
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
                PRworkload: {
                    include: {
                        PRworkloadCell: {
                            include: {
                                teacher: true
                            }
                        }
                    }
                },
                PRObservationRecord: {
                    include: {
                        PRObservationRecordCell: {
                            include: {
                                teacher: true,
                                class: true,
                                subject: true,
                            }
                        }
                    }
                },
                PRrechecking: {
                    include: {
                        PRrecheckingCell: {
                            include: {
                                class: true,
                                teacher: true,
                                subject: true,
                            }
                        }
                    },
                    
                },
                PRttbl: {
                    include: {
                        PRttblCell: true
                    }
                },
                PRttblContent: true,
                PRHcd: true,
                PRTenuffus: true,
                PRactivity: {
                    include: {
                        PRactivityCell: true
                    }
                },
                PRswot: true
            }
        });
    }, ['report'], { revalidate: 3600, tags: ['reports'] });

    // Use the user’s campus ID if campusId is not provided
    const effectiveCampusId = campusId || session.user?.fkid;
    return fetchReport(id, effectiveCampusId);
}

// export const getYearReport = async () => {
//     const session = await validateRequest()
//     if(!session.user) return {errors: "You must be logged in to create a report."}
//     const report = await db.principalReport.findFirst({
//         where: {
//             createdAt: {
//                 gte: new Date(`${new Date().getFullYear()}-01-01`),
//                 lte: new Date(`${new Date().getFullYear()}-12-31`),
//             }
//         }
//     })
// }

export const getMonthlyReports = async (campusId?: number | null) => {
    const session = await validateRequest();
    if (!session.user) return {};
  
    const reports: { [key: string]: any } = {};
    const currentDate = new Date();
  
    // Month names array
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Loop for the last 12 months
    for (let i = 0; i < 12; i++) {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);
  
      // Fetching one report per month
      const report = await db.principalReport.findFirst({
        where: {
          campusId: campusId || session.user.fkid,
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        include: {
          campus: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
  
      // Get the month name using the month index
      const monthName = monthNames[startOfMonth.getMonth()];
  
      // Add report to the object, defaulting to `null` if no report is found
      reports[monthName] = report || null;
    }
  
    return reports;
  };