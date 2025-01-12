"use client"
// import { getReport } from '@/actions/prinicpalReport';
import React, { useEffect, useState } from 'react';
import AnimatedHeading from '@/components/general/animatedHeading';
import Link from 'next/link';
import { ArrowLeftToLineIcon } from 'lucide-react';
import { MasterReport, Report } from '@/constants/types';
import { useSearchParams } from 'next/navigation';
import { getReport } from '@/actions/newPrincipalReport';

// Dynamic import for ReportPageRenderer
const DynamicReportPageRenderer = React.lazy(() => import('@/components/report/renderer'));

const RerportPage = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const [report, setReport] = useState<Report | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch the report data
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

  if (!isLoaded) {
    return <div>Loading report...</div>;
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

      {/* <div>{JSON.stringify(report.PRactivity)}</div> */}

      <React.Suspense fallback={<div>Loading report renderer...</div>}>
        <DynamicReportPageRenderer report={report} />
      </React.Suspense>
    </div>
  );
};

export default RerportPage;
