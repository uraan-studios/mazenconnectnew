"use client";
import { getPrincipalReports } from '@/actions/prinicpalReport';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PRTable from './PRTable';
import { getCampuses } from '@/actions/campus';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define types for the report and campus data
interface Campus {
  fkId: number; // Adjust this based on your actual data structure
  name: string;
}

interface PrincipalReport {
  id: number
  campusId: number
  createdAt: Date 
  studentRemarks: string | null
  staffRemarks: string | null
  workloadRemarks: string | null
  ttblRemarks: string | null
  parentFeedback: string | null
  campus: {
    id: string
    fkId: number
    email: string
    name: string
    phone: string | null
    isSuperUser: boolean
    password: string
    cityId: number
    createdAt: Date 
    updatedAt: Date
  }
}

const PrincipalReportModule = ({isAdmin}: {isAdmin: boolean}) => {
  const [reports, setReports] = useState<PrincipalReport[]>([]);
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<number | null>(null);
  const [selectedMonth] = useState<Date | null>(null); // Changed to Date type

  // const currentYear = 2024; // Default year to 2024

  // Fetch reports whenever selectedCampus or selectedMonth changes
  useEffect(() => {
    const fetchData = async () => {
      const reportsData = await getPrincipalReports(selectedMonth, selectedCampus); 
      setReports(reportsData);
    };
    fetchData();
  }, [selectedCampus, selectedMonth]);

  // Fetch campuses once when the component mounts
  useEffect(() => {
    const fetchCampuses = async () => {
      const campusesData = await getCampuses();
      setCampuses(campusesData);
    };
    fetchCampuses();
  }, []);

  return (
    <div className='py-6 space-y-4'>
      <div className="flex gap-4">
        {/* Campus Select */}
        <Select disabled={!isAdmin} onValueChange={(value) => setSelectedCampus(value ? Number(value) : null)} defaultValue={selectedCampus?.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Select Campus" />
          </SelectTrigger>
          <SelectContent>
            {campuses.map((campus) => (
              <SelectItem key={campus.fkId} value={campus.fkId.toString()}>
                {campus.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* <p className="">{JSON.stringify(reports)}</p> */}
        
        {/* Month Select with default year 2024 */}
        {/* <Select onValueChange={(value) => setSelectedMonth(value ? new Date(value) : null)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => {
              const monthDate = new Date(currentYear, i, 1); // Create date for each month in 2024
              return (
                <SelectItem key={i} value={monthDate.toISOString()}>
                  {monthDate.toLocaleString('default', { month: 'long' })} {currentYear}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select> */}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Principal Reports</CardTitle>
          <CardDescription>Principal Reports for the selected campus and month.</CardDescription>
        </CardHeader>
        <CardContent>
          <PRTable reports={reports} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PrincipalReportModule;
