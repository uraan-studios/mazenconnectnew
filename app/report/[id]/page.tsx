"use client";
import { getReport } from '@/actions/prinicpalReport';
import React, { useEffect, useState } from 'react';
import { MasterReport, Report } from '@/constants/types';
import { useSearchParams } from 'next/navigation';

// Dynamic import for ReportPageRenderer
const DynamicReportPageRenderer = React.lazy(() => import('@/components/report/renderer'));

const ReportPage = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  
  // Declare hooks first
  const [report, setReport] = useState<Report | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check for the key before proceeding with report fetching
  const isValidKey = searchParams.get('key') === '7dCHQaQD35';

  useEffect(() => {
    const fetchReport = async () => {
      const fetchedReport = await getReport(parseInt(params.id), parseInt(searchParams.get('campusId') || ''));
      
      // Check if fetchedReport contains 'errors', then handle it separately.
      if (fetchedReport == null) {
        return <div>Report not found</div>;
      }
      if ('errors' in fetchedReport) {
        console.error(fetchedReport.errors);
        // Handle the error case here (e.g., set error state)
      } else {
        // If fetchedReport is indeed a Report, then set it.
        setReport(fetchedReport as unknown as Report);
      }
  
      setIsLoaded(true);
    };
  
    fetchReport();
  }, [params.id]);

  if (!isValidKey) {
    return <div>Invalid key</div>;
  }

  if (!isLoaded) {
    return <div>Loading report...</div>;
  }

  if (!report) {
    return <div>Report not found</div>;
  }

  return (
    <div className="py-4">
      <React.Suspense fallback={<div>Loading report renderer...</div>}>
        <DynamicReportPageRenderer report={report} />
      </React.Suspense>
    </div>
  );
};

export default ReportPage;
