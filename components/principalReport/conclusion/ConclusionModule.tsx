"use client"
import { createActivity, createHCDModule, createObservation, createRechecking, createReport, createStaff, createStudent, createSWOT, createTenuus, createTTBL, createTTBLContent, createWorkload, validateModuleData } from '@/actions/newPrincipalReport'
import {activitySchema, hcdSchema, observationSchema, RecheckingSchema, staffSchema, studentSchema, swotSchema, tenuusSchema, TTBLContentSchema, ttblSchema, workloadSchema } from '@/constants/zods'
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
import React, { useState } from 'react'

const ConclusionModule = () => {
    const router = useRouter()

    const studentStore = useStudentModule()
    const employeeStore = useEmployeeModule()
    const ttblStore = useTTBLModule()   
    const workloadStore = useWorkLoadModule()
    const hcdStore = useHCDModule()
    const tenuusStore = useTennufusStore()
    const ttblConetStore = useTTblContentModule()
    const recheckingStore = useRecheckingStore()
    const activityStore = useActivityStore()
    const sWotStore = useSWOTModule()
    const observationStore = useObservationModule()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>("")
    const [status, setStatus] = useState("")




    const onSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        setStatus("Validating report...");
        const studentErrors = await validateModuleData({
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
                }))
            }))
        }, studentSchema);

        if (studentErrors) {
            setError(studentErrors.remarks?.[0] || "Validation failed.");
            return;
        }

        const staffErrors = await validateModuleData({
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
                }))
            }))
            
          }, staffSchema)

          if (staffErrors) {
            setError(staffErrors.remarks?.[0] || "Validation failed.");
            return;
          }

          const workloadErrors = await validateModuleData({
            reportId: 1 as number,
            remarks: workloadStore.remarks,
            PRworkloadCell: workloadStore.staff.map((staff) => ({
                id: staff.id,
                name: staff.name,
                workload: staff.workload,
                students: staff.students,
            }))
        }, workloadSchema)
          if (workloadErrors) {
            setError(workloadErrors.remarks?.[0] || "Validation failed.");
            return;
          }

          const observationErrors = await validateModuleData({
            reportId: 1 as number,
            PRObservationRecordCell: observationStore.observationRecords.map((observationRecord) => ({
                id: observationRecord.id,
                teacherId: observationRecord.teacherId,
                classId: observationRecord.id,
                subjectId: observationRecord.subjectId,
                walkthrough: observationRecord.walkThrough,
                informed: observationRecord.informed,
                uninformed: observationRecord.uninformed,
            }))
        }, observationSchema)
          if (observationErrors) {
            setError(observationErrors.remarks?.[0] || "Validation failed.");
            return;
          }

          const recheckingErrors = await validateModuleData({
            reportId: 1 as number,
            PRrecheckingCell: recheckingStore.rechecking.map((rechecking) => ({

                classId: rechecking.classId,
                teacherId: rechecking.teacherId,
                subjectId: rechecking.subjectId,
                status: rechecking.status,
            }))
        }, RecheckingSchema)
          if (recheckingErrors) {
            setError(recheckingErrors.remarks?.[0] || "Validation failed.");
            return;
          }

          const ttblErrors = await validateModuleData({
            reportId: 1 as number,
            preNurseryCLLE: ttblConetStore.preNurseryCLLE,
            preNurseryCLLU: ttblConetStore.preNurseryCLLU,
            preNurseryMD: ttblConetStore.preNurseryMD,
            nurseryCLLE: ttblConetStore.nurseryCLLE,
            nurseryCLLU: ttblConetStore.nurseryCLLU,
            nurseryMD: ttblConetStore.nurseryMD,
            kindergartenCLLE: ttblConetStore.kindergartenCLLE,
            kindergartenCLLU: ttblConetStore.kindergartenCLLU,
            kindergartenyMD: ttblConetStore.kindergartenMD,
        }, ttblSchema)
          if (ttblErrors) {
            setError(ttblErrors.remarks?.[0] || "Validation failed.");
            return;
          }

          const ttblContentErrors = await validateModuleData({
            reportId: 1 as number,
            remarks: tenuusStore.remarks,
            // number: tenuusStore.number
            ealyYears: tenuusStore.ealyYears,
            primaryYears: tenuusStore.primaryYears,
            middleYears: tenuusStore.middleYears
        }, TTBLContentSchema)
          if (ttblContentErrors) {
            setError(ttblContentErrors.remarks?.[0] || "Validation failed.");
            return;
          }

          const hcdErrors = await validateModuleData({
            reportId: 1 as number,
            remarks: hcdStore.reamrks,
            meetings: hcdStore.meetings,
            workload: hcdStore.workload
        }, hcdSchema)
          if (hcdErrors) {
            setError(hcdErrors.remarks?.[0] || "Validation failed.");
            return;
          }

          const tenuusErrors = await validateModuleData({
            reportId: 1 as number,
            remarks: tenuusStore.remarks,
            // number: tenuusStore.number
            ealyYears: tenuusStore.ealyYears,
            primaryYears: tenuusStore.primaryYears,
            middleYears: tenuusStore.middleYears
        }, tenuusSchema)
          if (tenuusErrors) {
            setError(tenuusErrors.remarks?.[0] || "Validation failed.");
            return;
          }

          const activityErrors = await validateModuleData({
            reportId: 1 as number,
            remarks: activityStore.remarks,
            activities: activityStore.activities
        }, activitySchema)
          if (activityErrors) {
            setError(activityErrors.remarks?.[0] || "Validation failed.");
            return;
          }

          const swotErrors = await validateModuleData({
            reportId: 1 as number,
            strength: sWotStore.strength,
            weakness: sWotStore.weakness,
            opportunity: sWotStore.opportunity,
            threat: sWotStore.threat
        }, swotSchema)
          if (swotErrors) {
            setError(swotErrors.remarks?.[0] || "Validation failed.");
            return;
          }

        setStatus("Creating report...")
        const reportId = await createReport()

        setStatus("Creating student module...")
        const studentModule = await createStudent({
            reportId: reportId as number,
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

        setStatus("Creating staff module...")

        const staffModule = await createStaff({
            reportId: reportId as number,
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

          setStatus("Creating workload module...")


          const workloadModule = await createWorkload({
            reportId: reportId as number,
            remarks: workloadStore.remarks,
            PRworkloadCell: workloadStore.staff.map((staff) => ({
                id: staff.id,
                name: staff.name,
                workload: staff.workload,
                students: staff.students,
            }))
        })

        setStatus("Creating Observation module...")

        const observationModule = await createObservation({
            reportId: reportId as number,
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

        setStatus("Creating Recheking module...")

        const recheckingModule = await createRechecking({
            reportId: reportId as number,
            PRrecheckingCell: recheckingStore.rechecking.map((rechecking) => ({

                classId: rechecking.classId,
                teacherId: rechecking.teacherId,
                subjectId: rechecking.subjectId,
                status: rechecking.status,
            }))
        })

        setStatus("Creating TTBL module...")

        const ttblModule = await createTTBL({
            reportId: reportId as number,
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

        setStatus("Creating TTBL Content module...")

        const ttblContentModule = await createTTBLContent({
            reportId: reportId as number,
            preNurseryCLLE: ttblConetStore.preNurseryCLLE,
            preNurseryCLLU: ttblConetStore.preNurseryCLLU,
            preNurseryMD: ttblConetStore.preNurseryMD,
            nurseryCLLE: ttblConetStore.nurseryCLLE,
            nurseryCLLU: ttblConetStore.nurseryCLLU,
            nurseryMD: ttblConetStore.nurseryMD,
            kindergartenCLLE: ttblConetStore.kindergartenCLLE,
            kindergartenCLLU: ttblConetStore.kindergartenCLLU,
            kindergartenyMD: ttblConetStore.kindergartenMD,
        })

        setStatus("Creating HCD module...")

        const hcdModule = await createHCDModule({
            reportId: reportId as number,
            remarks: hcdStore.reamrks,
            meetings: hcdStore.meetings,
            workload: hcdStore.workload
        })

        setStatus("Creating Teneffus module...")

        const tenuusModule = await createTenuus({
            reportId: reportId as number,
            remarks: tenuusStore.remarks,
            // number: tenuusStore.number
            ealyYears: tenuusStore.ealyYears,
            primaryYears: tenuusStore.primaryYears,
            middleYears: tenuusStore.middleYears
        })

        setStatus("Creating Activity module...")

        const activityModule = await createActivity({
            reportId: reportId as number,
            remarks: activityStore.remarks,
            activities: activityStore.activities
        })

        setStatus("Creating SWOT module...")

        const swotModule = await createSWOT({
            reportId: reportId as number,
            strength: sWotStore.strength,
            weakness: sWotStore.weakness,
            opportunity: sWotStore.opportunity,
            threat: sWotStore.threat
        })

        setStatus("Creating SWOT module...")
        setLoading(false)


        // const response = await createPrinicpalReport({
        //     studentRemarks: studentStore.remarks,
        //     staffRemarks: employeeStore.remarks,
        //     workloadRemarks: workloadStore.remarks,
        //     ttblRemarks: ttblStore.remarks,
        //     parentFeedback: hcdStore.reamrks,

        //     activity: activityStore.activities,

        //     ttbl:[
        //         {name: "Projectors", available: ttblStore.projectors.available, working: ttblStore.projectors.working, outOfOrder: ttblStore.projectors.outOfOrder},
        //         {name: "Laptops", available: ttblStore.laptops.available, working: ttblStore.laptops.working, outOfOrder: ttblStore.laptops.outOfOrder},
        //         {name: "Smart Boards", available: ttblStore.smartBoard.available, working: ttblStore.smartBoard.working, outOfOrder: ttblStore.smartBoard.outOfOrder},

        //     ],

        //     swot: {
        //         strength: sWotStore.strength,
        //         weakness: sWotStore.weakness,
        //         opportunity: sWotStore.opportunity,
        //         threat: sWotStore.threat,
        //     },

        //     student: studentStore.classes,

        //     staff: employeeStore.departments,

        //     workload: workloadStore.staff,

        //     hcd: {
        //         meetings: hcdStore.meetings,
        //         workload: hcdStore.workload
        //     }
            
        // })

        // const response = await

        // setLoading(false)
        // if(response.success){
        //     sessionStorage.clear()
        //     router.push("/")
        // }

        // if (response.errors) {
        //     setError(response.errors)
        //     return;
        // }
        // else{
            
        // }

      
        
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

                {status && (
                    <Alert variant={'destructive'}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>{status}</AlertDescription>
                    </Alert>
                )}
                </div>
                <form onSubmit={onSubmit}>
                    <Button disabled={loading}>Submit Report</Button>
                </form>
                <p>{status}</p>
            </CardFooter>
        </Card>
    </div>
  )
}

export default ConclusionModule