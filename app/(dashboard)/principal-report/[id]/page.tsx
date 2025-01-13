"use client";

import React, { useEffect, useState } from 'react';
import AnimatedHeading from '@/components/general/animatedHeading';
import Link from 'next/link';
import { ArrowLeftToLineIcon } from 'lucide-react';
import { MasterReport, Report } from '@/constants/types';
import { useSearchParams, useParams } from 'next/navigation';
import { getReport } from '@/actions/newPrincipalReport';

// Dynamic import for ReportPageRenderer
const DynamicReportPageRenderer = React.lazy(() => import('@/components/report/renderer'));

const ReportPage = () => {
  const params = useParams(); // Use this hook to get the params object
  const searchParams = useSearchParams();
  const [report, setReport] = useState<Report | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      const id = parseInt(Array.isArray(params?.id) ? params.id[0] : params?.id || '0', 10);
      const campusId = parseInt((searchParams.get('campusId') || '0') as string, 10);
  
      if (isNaN(id) || isNaN(campusId)) {
        setIsLoaded(true);
        return;
      }
  
      const fetchedReport = await getReport(id, campusId);
  
      if (!fetchedReport) {
        console.error("Report not found");
        setIsLoaded(true);
        return;
      }
  
      if ('errors' in fetchedReport) {
        console.error(fetchedReport.errors);
      } else {
        setReport(fetchedReport as unknown as Report);
      }
  
      setIsLoaded(true);
    };
  
    fetchReport();
  }, [params, searchParams]);
  

  if (!isLoaded) {
    return <div className='w-full h-full flex items-center justify-center'>
      <p>Loading report...</p>
    </div>;
  }

  if (!report) {
    return <div>Report not found</div>;
  }

  return (
    <div className="py-4">
      <Link href='/principal-report' className='p-4'>
        <div className="flex gap-4 items-center">
          <ArrowLeftToLineIcon className='h-5 w-5 text-primary-foreground hover:text-primary-foreground-hover' />
          <p className="text-lg font-semibold">Go Back</p>
        </div>
      </Link>

      <div>
        <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Manage' varient='heading' />
        <AnimatedHeading className='font-misologist font-normal' title='Principal Report' varient='heading' />
      </div>

      {/* <div>{JSON.stringify(report)}</div> */}

      <React.Suspense fallback={<div>Loading report renderer...</div>}>
        <DynamicReportPageRenderer report={report} />
      </React.Suspense>
    </div>
  );
};

export default ReportPage;
