"use client"
"use no memo"
import { createActivity, createELPModule, createHCDModule, createObservation, createRechecking, createReport, createStaff, createStudent, createSWOT, createTenuus, createTTBL, createTTBLContent, createWorkload, updateReportStatus, validateModuleData } from '@/actions/newPrincipalReport'
import {activitySchema, elpSchema, hcdSchema, observationSchema, RecheckingSchema, staffSchema, studentSchema, swotSchema, tenuusSchema, TTBLContentSchema, ttblSchema, workloadSchema } from '@/constants/zods'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import useActivityStore from '@/stores/principalReport/activity'
import useEmployeeModule from '@/stores/principalReport/employees'
import { useHCDModule } from '@/stores/principalReport/hcd'
import useObservationModule from '@/stores/principalReport/observationModule'
import useRecheckingStore from '@/stores/principalReport/rechecking'
import useStudentModule from '@/stores/principalReport/students'
import useSWOTModule from '@/stores/principalReport/swot'
import useTennufusStore from '@/stores/principalReport/teneffus'
import useTTBLModule from '@/stores/principalReport/ttbl'
import useTTblContentModule from '@/stores/principalReport/ttblContent'
import useWorkLoadModule from '@/stores/principalReport/workload'
import { Label } from '@radix-ui/react-label'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import usePrincipalReport from '@/stores/principalReport/report'
import { set } from 'date-fns'
import { useELPModule } from '@/stores/principalReport/elp'
import { Separator } from '@radix-ui/react-separator'
import { toast } from "sonner"

const ConclusionModule = () => {
    const router = useRouter()
    
    const report = usePrincipalReport()
    const studentStore = useStudentModule()
    const employeeStore = useEmployeeModule()
    const ttblStore = useTTBLModule()   
    const workloadStore = useWorkLoadModule()
    const hcdStore = useHCDModule()
    const tenuusStore = useTennufusStore()
    const ttblConetStore = useTTblContentModule()
    const recheckingStore = useRecheckingStore()
    const elpStore = useELPModule()
    const activityStore = useActivityStore()
    const sWotStore = useSWOTModule()
    const observationStore = useObservationModule()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>("")
    const [status, setStatus] = useState("")
    const [clicks, setClicks] = useState(0)

    useEffect(() => {
        if(status){
            toast.success(status)
        }
        if(error){
            toast.error(error)
        }
    }, [status, error])


    const validatePRdata = async (): Promise<boolean> => {
        "use client";
    
        let isValid = true;
        let errorMessages: string[] = [];
    
        // Helper function to handle Zod validation errors
        const handleValidationErrors = (validationResult: any) => {
            console.log(validationResult.error)
            if (!validationResult.success) {
                validationResult.error.issues.forEach((issue: any) => {
                    errorMessages.push(issue.message);
                });
                isValid = false;
            }
        };
    
        // Validate student data
        const studentErrors = studentSchema.safeParse({
            reportId: 1,
            remarks: studentStore.remarks,
            PRstudentClassCell: studentStore.classes.map((cls) => ({
                id: cls.id,
                name: cls.name,
                previous: cls.previous,
                left: cls.left,
                new: cls.new,
                transfered: cls.transfered,
                promoted: cls.promoted,
                total: cls.total,
                boys: cls.boys,
                girls: cls.girls,
                sectionCount: cls.sectionCount,
                studentPerSection: cls.studentPerSection,
                sections: cls.sections.map((section) => ({
                    id: section.id,
                    name: section.name,
                    previous: section.previous,
                    left: section.left,
                    new: section.new,
                    transfered: section.transfered,
                    promoted: section.promoted,
                    total: section.total,
                    boys: section.boys,
                    girls: section.girls,
                })),
            })),
        });
        handleValidationErrors(studentErrors);
    
        // Validate staff data
        const staffErrors = staffSchema.safeParse({
            reportId: 1,
            remarks: employeeStore.remarks,
            PRStaffDeps: employeeStore.departments.map((dep) => ({
                id: dep.id,
                name: dep.name,
                PRStaffDesig: dep.designations.map((desig) => ({
                    id: desig.id,
                    name: desig.name,
                    prev: desig.previous,
                    left: desig.left,
                    new: desig.new,
                    total: desig.total,
                })),
            })),
        });
        handleValidationErrors(staffErrors);
    
        // Validate workload data
        const workloadErrors = workloadSchema.safeParse({
            reportId: 1,
            remarks: workloadStore.remarks,
            PRworkloadCell: workloadStore.staff.map((staff) => ({
                id: staff.id,
                name: staff.name,
                workload: staff.workload,
                students: staff.students,
            })),
        });
        handleValidationErrors(workloadErrors);
    
        // Validate observation data
        const observationErrors = observationSchema.safeParse({
            reportId: 1,
            PRObservationRecordCell: observationStore.observationRecords.map((observationRecord) => ({
                id: observationRecord.id,
                teacherId: observationRecord.teacherId,
                classId: observationRecord.id,
                subjectId: observationRecord.subjectId,
                walkthrough: observationRecord.walkThrough,
                informed: observationRecord.informed,
                uninformed: observationRecord.uninformed,
            })),
        });
        handleValidationErrors(observationErrors);
    
        // Validate rechecking data
        const recheckingErrors = RecheckingSchema.safeParse({
            reportId: 1,
            remarks: recheckingStore.remarks,
            PRrecheckingCell: recheckingStore.rechecking.map((rechecking) => ({
                classId: rechecking.classId,
                teacherId: rechecking.teacherId,
                subjectId: rechecking.subjectId,
                count: rechecking.count,
                total: studentStore.getClassStrength(rechecking.classId),
            })),
        });
        handleValidationErrors(recheckingErrors);
    
        // // Validate TTBL data
        const ttblErrors = ttblSchema.safeParse({
            reportId:1,
            remarks: ttblStore.remarks,
            PRttblCell: [
                {
                    name: "Projectors",
                    available: ttblStore.projectors.available,
                    working: ttblStore.projectors.working,
                    outOfOrder: ttblStore.projectors.outOfOrder,
                },
                {
                    name: "Laptops",
                    available: ttblStore.laptops.available,
                    working: ttblStore.laptops.working,
                    outOfOrder: ttblStore.laptops.outOfOrder,
                },
                {
                    name: "Smart Boards",
                    available: ttblStore.smartBoard.available,
                    working: ttblStore.smartBoard.working,
                    outOfOrder: ttblStore.smartBoard.outOfOrder,
                }
            ]
        });
        handleValidationErrors(ttblErrors);
    
        // // Validate TTBL Content data
        const ttblContentErrors = TTBLContentSchema.safeParse({
            reportId: 1,
            tbisRemarks: ttblStore.TTBIremarks,
            preNurseryCLLE: ttblConetStore.preNurseryCLLE,
            preNurseryCLLU: ttblConetStore.preNurseryCLLU,
            preNurseryMD: ttblConetStore.preNurseryMD,
            nurseryCLLE: ttblConetStore.nurseryCLLE,
            nurseryCLLU: ttblConetStore.nurseryCLLU,
            nurseryMD: ttblConetStore.nurseryMD,
            kindergartenCLLE: ttblConetStore.kindergartenCLLE,
            kindergartenCLLU: ttblConetStore.kindergartenCLLU,
            kindergartenMD: ttblConetStore.kindergartenMD,
            g1Eng: ttblConetStore.g1Eng,
            g1Urdu: ttblConetStore.g1Urdu,
            g1Math: ttblConetStore.g1Math,
            g1GK: ttblConetStore.g1GK,
            g1ICT: ttblConetStore.g1ICT,
            g1Isl: ttblConetStore.g1Isl,
            g2Eng: ttblConetStore.g2Eng,
            g2Urdu: ttblConetStore.g2Urdu,
            g2Math: ttblConetStore.g2Math,
            g2GK: ttblConetStore.g2GK,
            g2ICT: ttblConetStore.g2ICT,
            g2Isl: ttblConetStore.g2Isl,
            g3Eng: ttblConetStore.g3Eng,
            g3Urdu: ttblConetStore.g3Urdu,
            g3Math: ttblConetStore.g3Math,
            g3GK: ttblConetStore.g3GK,
            g3ICT: ttblConetStore.g3ICT,
            g3Isl: ttblConetStore.g3Isl,
            g4Eng: ttblConetStore.g4Eng,
            g4Urdu: ttblConetStore.g4Urdu,
            g4Math: ttblConetStore.g4Math,
            g4SS: ttblConetStore.g4SS,
            g4ICT: ttblConetStore.g4ICT,
            g4Isl: ttblConetStore.g4Isl,
            g4Sci: ttblConetStore.g4Sci,
            g5Eng: ttblConetStore.g5Eng,
            g5Urdu: ttblConetStore.g5Urdu,
            g5Math: ttblConetStore.g5Math,
            g5SS: ttblConetStore.g5SS,
            g5ICT: ttblConetStore.g5ICT,
            g5Isl: ttblConetStore.g5Isl,
            g5Sci: ttblConetStore.g5Sci,
        });
        handleValidationErrors(ttblContentErrors);
    
        // // Validate HCD data
        const hcdErrors = hcdSchema.safeParse({
            reportId: 1,
            remarks: hcdStore.remarks,
            preNurseryPlanner: hcdStore.preNurseryPlanner,
            preNurseryWorksheets: hcdStore.preNurseryWorksheets,
            preNurseryTTBL: hcdStore.preNurseryTTBL,
            nurseryPlanner: hcdStore.nurseryPlanner,
            nurseryWorksheets: hcdStore.nurseryWorksheets,
            nurseryTTBL: hcdStore.nurseryTTBL,
            kindergartenPlanner: hcdStore.kindergartenPlanner,
            kindergartenWorksheets: hcdStore.kindergartenWorksheets,
            kindergartenTTBL: hcdStore.kindergartenTTBL,
            grade1Planner: hcdStore.grade1Planner,
            grade1Worksheets: hcdStore.grade1Worksheets,
            grade1TTBL: hcdStore.grade1TTBL,
            grade2Planner: hcdStore.grade2Planner,
            grade2Worksheets: hcdStore.grade2Worksheets,
            grade2TTBL: hcdStore.grade2TTBL,
            grade3Planner: hcdStore.grade3Planner,
            grade3Worksheets: hcdStore.grade3Worksheets,
            grade3TTBL: hcdStore.grade3TTBL,
            grade4Planner: hcdStore.grade4Planner,
            grade4Worksheets: hcdStore.grade4Worksheets,
            grade4TTBL: hcdStore.grade4TTBL,
            grade5Planner: hcdStore.grade5Planner,
            grade5Worksheets: hcdStore.grade5Worksheets,
            grade5TTBL: hcdStore.grade5TTBL,
            grade6Planner: hcdStore.grade6Planner,
            grade6Worksheets: hcdStore.grade6Worksheets,
            grade7Planner: hcdStore.grade7Planner,
            grade7Worksheets: hcdStore.grade7Worksheets,
            grade8Planner: hcdStore.grade8Planner,
            grade8Worksheets: hcdStore.grade8Worksheets,
        });
        handleValidationErrors(hcdErrors);
    
        // // Validate tenuus data
        const tenuusErrors = tenuusSchema.safeParse({
            reportId: 1,
            remarks: tenuusStore.remarks,
            ealyYears: tenuusStore.ealyYears,
            primaryYears: tenuusStore.primaryYears,
            middleYears: tenuusStore.middleYears,
        });
        handleValidationErrors(tenuusErrors);
    
        // Validate ELP data
        const elpErrors = elpSchema.safeParse({
            reportId: 1,
            remarks: elpStore.remarks,
            grade1Planner: elpStore.grade1Planner,
            grade1Worksheets: elpStore.grade1Worksheets,
            grade2Planner: elpStore.grade2Planner,
            grade2Worksheets: elpStore.grade2Worksheets,
            grade3Planner: elpStore.grade3Planner,
            grade3Worksheets: elpStore.grade3Worksheets,
            grade4Planner: elpStore.grade4Planner,
            grade4Worksheets: elpStore.grade4Worksheets,
            grade5Planner: elpStore.grade5Planner,
            grade5Worksheets: elpStore.grade5Worksheets,
            grade6Planner: elpStore.grade6Planner,
            grade6Worksheets: elpStore.grade6Worksheets,
            grade7Planner: elpStore.grade7Planner,
            grade7Worksheets: elpStore.grade7Worksheets,
            grade8Planner: elpStore.grade8Planner,
            grade8Worksheets: elpStore.grade8Worksheets,
        });
        handleValidationErrors(elpErrors);
    
        // Validate activity data
        const activityErrors = activitySchema.safeParse({
            reportId: 1,
            remarks: activityStore.remarks,
            activities: activityStore.activities,
        });
        handleValidationErrors(activityErrors);
    
        // Validate SWOT data
        const swotErrors = swotSchema.safeParse({
            reportId: 1,
            strength: sWotStore.strength,
            weakness: sWotStore.weakness,
            opportunity: sWotStore.opportunity,
            threat: sWotStore.threat,
        });
        handleValidationErrors(swotErrors);
    
        // Set the error state to a formatted string of all error messages
        if (errorMessages.length > 0) {
            setError(errorMessages.join("\n")); // Join all messages with a newline
        }
    
        return isValid;
    };

    const onSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("started")
        setLoading(true)
        setError("")

        setStatus("Validating report...");


        console.log("validating")
        const isValid = await validatePRdata()

        if(!isValid){
            console.log("validation failed")
            setStatus("Validation failed. Please try again.")
            setLoading(false)
            return
        }
        
               

            console.log("validation passed")
            setStatus("Inputs are Getting disabled to Prevent Changings...")
            report.setDisabled(true)

            if (!report.id){
                setStatus("Generating New Report🎉...")

                const reportId = await createReport()
                report.setId(reportId as number)
            }

        

            if (!report.student){
                setStatus("Starting Great with uploading Students🎓...")
                 await createStudent({
                    reportId: report.id as number,
                    remarks: studentStore.remarks,
                    PRstudentClassCell: studentStore.classes.map((cls) => ({
                        id: cls.id,
                        name: cls.name,
                        previous: cls.previous,
                        left: cls.left,
                        new: cls.new,
                        transfered: cls.transfered,
                        promoted: cls.promoted,
                        total: cls.total,
                        boys: cls.boys,
                        girls: cls.girls,
                        sectionCount: cls.sectionCount,
                        studentPerSection: cls.studentPerSection,
                        sections: cls.sections.map((section) => ({
                            id: section.id,
                            name: section.name,
                            previous: section.previous,
                            left: section.left,
                            new: section.new,
                            transfered: section.transfered,
                            promoted: section.promoted,
                            total: section.total,
                            boys: section.boys,
                            girls: section.girls,
                        }))
                    }))
                })
                
                report.setStudent(true)
            }

           

            

            if (!report.employee){
                setStatus("Looks like we are uploading staff👨‍💻...")

                const staffModule = await createStaff({
                    reportId: report.id as number,
                    remarks: employeeStore.remarks,
                    PRStaffDeps: employeeStore.departments.map((dep) => ({
                        id: dep.id,
                        name: dep.name,
                        PRStaffDesig: dep.designations.map((desig) => ({
                            id: desig.id,
                            name: desig.name,
                            prev: desig.previous,
                            left: desig.left,
                            new: desig.new,
                            total: desig.total,
                        }))
                    }))
                    
                })
                report.setEmployee(true)
            }

            if (!report.workload){
                setStatus("Uploading Teacher's Workload...")
                const workloadModule = await createWorkload({
                    reportId: report.id as number,
                    remarks: workloadStore.remarks,
                    PRworkloadCell: workloadStore.staff.map((staff) => ({
                        id: staff.id,
                        name: staff.name,
                        workload: staff.workload,
                        students: staff.students,
                    }))
                })
                report.setWorkload(true)
            }

            if(!report.observation){
                setStatus("Made some progess, uploading Observations👀...")
                const observationModule = await createObservation({
                    reportId: report.id as number,
                    PRObservationRecordCell: observationStore.observationRecords.map((observationRecord) => ({
                        id: observationRecord.id,
                        teacherId: observationRecord.teacherId,
                        classId: observationRecord.id,
                        subjectId: observationRecord.subjectId,
                        walkthrough: observationRecord.walkThrough,
                        informed: observationRecord.informed,
                        uninformed: observationRecord.uninformed,
                    }))
                })
                report.setObservation(true)
            }

            if(!report.rechecking){
                setStatus("Looking nice, proceeding to uploading Rechecking module📕...")
                const recheckingModule = await createRechecking({
                    reportId: report.id as number,
                    remarks: recheckingStore.remarks,
                    PRrecheckingCell: recheckingStore.rechecking.map((rechecking) => ({
                        classId: rechecking.classId,
                        teacherId: rechecking.teacherId,
                        subjectId: rechecking.subjectId,
                        count: rechecking.count,
                        total: studentStore.getClassStrength(rechecking.classId),
                    }))
                })
                report.setRechecking(true)
            }

            if(!report.ttbl){
                setStatus("Halway There👋...TTBL next.")
                const ttblModule = await createTTBL({
                    reportId: report.id as number,
                    remarks: ttblStore.remarks,
                    PRttblCell: [
                        {
                            name: "Projectors",
                            available: ttblStore.projectors.available,
                            working: ttblStore.projectors.working,
                            outOfOrder: ttblStore.projectors.outOfOrder,
                        },
                        {
                            name: "Laptops",
                            available: ttblStore.laptops.available,
                            working: ttblStore.laptops.working,
                            outOfOrder: ttblStore.laptops.outOfOrder,
                        },
                        {
                            name: "Smart Boards",
                            available: ttblStore.smartBoard.available,
                            working: ttblStore.smartBoard.working,
                            outOfOrder: ttblStore.smartBoard.outOfOrder,
                        }
                    ]
                })
                report.setTtbl(true)
            }

            if(!report.ttblContent){
                setStatus("TTBL Content on its way👀...")
                const ttblContentModule = await createTTBLContent({
                    reportId: report.id as number,
                    tbisRemarks: ttblStore.TTBIremarks,

                    preNurseryCLLE: ttblConetStore.preNurseryCLLE,
                    preNurseryCLLU: ttblConetStore.preNurseryCLLU,
                    preNurseryMD: ttblConetStore.preNurseryMD,
                    
                    nurseryCLLE: ttblConetStore.nurseryCLLE,
                    nurseryCLLU: ttblConetStore.nurseryCLLU,
                    nurseryMD: ttblConetStore.nurseryMD,
                
                    kindergartenCLLE: ttblConetStore.kindergartenCLLE,
                    kindergartenCLLU: ttblConetStore.kindergartenCLLU,
                    kindergartenMD: ttblConetStore.kindergartenMD,
                
                    g1Eng: ttblConetStore.g1Eng,
                    g1Urdu: ttblConetStore.g1Urdu,
                    g1Math: ttblConetStore.g1Math,
                    g1GK: ttblConetStore.g1GK,
                    g1ICT: ttblConetStore.g1ICT,
                    g1Isl: ttblConetStore.g1Isl,
                
                    g2Eng: ttblConetStore.g2Eng,
                    g2Urdu: ttblConetStore.g2Urdu,
                    g2Math: ttblConetStore.g2Math,
                    g2GK: ttblConetStore.g2GK,
                    g2ICT: ttblConetStore.g2ICT,
                    g2Isl: ttblConetStore.g2Isl,
                
                    g3Eng: ttblConetStore.g3Eng,
                    g3Urdu: ttblConetStore.g3Urdu,
                    g3Math: ttblConetStore.g3Math,
                    g3GK: ttblConetStore.g3GK,
                    g3ICT: ttblConetStore.g3ICT,
                    g3Isl: ttblConetStore.g3Isl,
                
                    g4Eng: ttblConetStore.g4Eng,
                    g4Urdu: ttblConetStore.g4Urdu,
                    g4Math: ttblConetStore.g4Math,
                    g4SS: ttblConetStore.g4SS,
                    g4ICT: ttblConetStore.g4ICT,
                    g4Isl: ttblConetStore.g4Isl,
                    g4Sci: ttblConetStore.g4Sci,
                
                    g5Eng: ttblConetStore.g5Eng,
                    g5Urdu: ttblConetStore.g5Urdu,
                    g5Math: ttblConetStore.g5Math,
                    g5SS: ttblConetStore.g5SS,
                    g5ICT: ttblConetStore.g5ICT,
                    g5Isl: ttblConetStore.g5Isl,
                    g5Sci: ttblConetStore.g5Sci,
                })
                report.setTtblContent(true)
            }

            
            if(!report.hcd){
                setStatus("Let's get to the HCD module...")
                const hcdModule = await createHCDModule({
                    reportId: report.id as number,
                    remarks: hcdStore.remarks,
                    preNurseryPlanner: hcdStore.preNurseryPlanner,
                    preNurseryWorksheets: hcdStore.preNurseryWorksheets,
                    preNurseryTTBL: hcdStore.preNurseryTTBL,
                    nurseryPlanner: hcdStore.nurseryPlanner,
                    nurseryWorksheets: hcdStore.nurseryWorksheets,
                    nurseryTTBL: hcdStore.nurseryTTBL,
                    kindergartenPlanner: hcdStore.kindergartenPlanner,
                    kindergartenWorksheets: hcdStore.kindergartenWorksheets,
                    kindergartenTTBL: hcdStore.kindergartenTTBL,
                    grade1Planner: hcdStore.grade1Planner,
                    grade1Worksheets: hcdStore.grade1Worksheets,
                    grade1TTBL: hcdStore.grade1TTBL,
                    grade2Planner: hcdStore.grade2Planner,
                    grade2Worksheets: hcdStore.grade2Worksheets,
                    grade2TTBL: hcdStore.grade2TTBL,
                    grade3Planner: hcdStore.grade3Planner,
                    grade3Worksheets: hcdStore.grade3Worksheets,
                    grade3TTBL: hcdStore.grade3TTBL,
                    grade4Planner: hcdStore.grade4Planner,
                    grade4Worksheets: hcdStore.grade4Worksheets,
                    grade4TTBL: hcdStore.grade4TTBL,
                    grade5Planner: hcdStore.grade5Planner,
                    grade5Worksheets: hcdStore.grade5Worksheets,
                    grade5TTBL: hcdStore.grade5TTBL,
                    grade6Planner: hcdStore.grade6Planner,
                    grade6Worksheets: hcdStore.grade6Worksheets,
                    grade7Planner: hcdStore.grade7Planner,
                    grade7Worksheets: hcdStore.grade7Worksheets,
                    grade8Planner: hcdStore.grade8Planner,
                    grade8Worksheets: hcdStore.grade8Worksheets,
                });
                
                report.setHcd(true)
            }

            if(!report.tenuus){
                setStatus("We're alomost there...Tenuus module.")
                const tenuusModule = await createTenuus({
                    reportId: report.id as number,
                    remarks: tenuusStore.remarks,
                    // number: tenuusStore.number
                    ealyYears: tenuusStore.ealyYears,
                    primaryYears: tenuusStore.primaryYears,
                    middleYears: tenuusStore.middleYears
                })
                report.setTenuus(true)
            }

            if(!report.elp){
                setStatus("Hmmm...ELP module.🙌")
                const elpModule = await createELPModule({
                    reportId: report.id as number,
                    remarks: elpStore.remarks,
                    grade1Planner: elpStore.grade1Planner,
                    grade1Worksheets: elpStore.grade1Worksheets,
                    grade2Planner: elpStore.grade2Planner,
                    grade2Worksheets: elpStore.grade2Worksheets,
                    grade3Planner: elpStore.grade3Planner,
                    grade3Worksheets: elpStore.grade3Worksheets,
                    grade4Planner: elpStore.grade4Planner,
                    grade4Worksheets: elpStore.grade4Worksheets,
                    grade5Planner: elpStore.grade5Planner,
                    grade5Worksheets: elpStore.grade5Worksheets,
                    grade6Planner: elpStore.grade6Planner,
                    grade6Worksheets: elpStore.grade6Worksheets,
                    grade7Planner: elpStore.grade7Planner,
                    grade7Worksheets: elpStore.grade7Worksheets,
                    grade8Planner: elpStore.grade8Planner,
                    grade8Worksheets: elpStore.grade8Worksheets,
                })            
                report.setElp(true)
            }

            if(!report.activity){
                setStatus("Let's get to the Activity module...")
                const activityModule = await createActivity({
                    reportId: report.id as number,
                    remarks: activityStore.remarks,
                    activities: activityStore.activities
                })
                report.setActivity(true)
            }

            if(!report.swot){
                setStatus("Finally, the SWOT module...")
                const swotModule = await createSWOT({
                    reportId: report.id as number,
                    strength: sWotStore.strength,
                    weakness: sWotStore.weakness,
                    opportunity: sWotStore.opportunity,
                    threat: sWotStore.threat
                })
                report.setSwot(true)
            }
            await updateReportStatus(report.id as number, true)
        
            report.setDisabled(false)
            report.clearReport()
            setStatus("Report Published - Redirecting to Dashboard...")
            router.push("/principal-report/")
            setLoading(false)
        
    }   

  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>S.W.O.T Module</CardTitle>
                <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
            </CardHeader>

            <CardContent>
                <div className='grid grid-cols-2 gap-4'>
                    <div className="bg-accent p-4 rounded-xl">
                        <Label className='text-accent-foreground font-semibold'>Strength</Label>
                        <Textarea
                        className='bg-primary/15 p-4 rounded-md'
                        value={sWotStore.strength}
                        onChange={(e) => sWotStore.setStrength(e.target.value)}
                        />
                    </div>

                    <div className="bg-accent p-4 rounded-xl">
                        <Label className='text-accent-foreground font-semibold'>Weakness</Label>
                        <Textarea
                        className='bg-primary/15 p-4 rounded-md'
                        value={sWotStore.weakness}
                        onChange={(e) => sWotStore.setWeakness(e.target.value)}
                        />
                    </div>

                    <div className="bg-accent p-4 rounded-xl">
                        <Label className='text-accent-foreground font-semibold'>Opportunity</Label>
                        <Textarea
                        className='bg-primary/15 p-4 rounded-md'
                        value={sWotStore.opportunity}
                        onChange={(e) => sWotStore.setOpportunity(e.target.value)}
                        />
                    </div>

                    
                    <div className="bg-accent p-4 rounded-xl">
                        <Label className='text-accent-foreground font-semibold'>Threat</Label>
                        <Textarea
                        className='bg-primary/15 p-4 rounded-md'
                        value={sWotStore.threat}
                        onChange={(e) => sWotStore.setThreat(e.target.value)}
                        />
                    </div>
                </div>

                <Separator className='my-4'/>

            </CardContent>

            <CardFooter>
            <div className="py-4">
                {error && (
                    <Alert variant={'destructive'}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* {!status && (
                    <Alert variant={'destructive'}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>{status}</AlertDescription>
                    </Alert>
                )} */}
                </div>
                <form onSubmit={onSubmit}>
                    <Button disabled={loading}>{loading ? "Loading..." : "Upload/Resume Report"}</Button>
                </form>
            </CardFooter>
        </Card>
    </div>
  )
}

export default ConclusionModule