"use client";
import React from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import StudentTable from './StudentTable';
import StaffTable from './StaffTable';
import WorkloadTable from './WorkloadTable';
import HCDTable from './HCDTable';
import TTBL from './TTBLTable';
import ActivitiesTable from './ActivitiesTable';
import SWOTTable from './SWOTTable';
import ReportFooter from './ReportFooter';
import ReportHeader from './ReportHeader';
import ObservationRecord from './ObservationRecord';
// import RecheckingModule from './Rechecking';
import TeneffusModule from './Teneffus';
import ELPTable from './ELPTable';
import { Report } from '@/constants/types';
import RecheckingModule from './Rechecking';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
});

export const PrincipalReport = ({ report }: { report: Report }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <ReportHeader date={report.createdAt.toLocaleString()} campus={report.campus.name} id={report.id.toString()} />
      <StudentTable report={report} />
      <StaffTable report={report} />
      <WorkloadTable report={report} />
      <ObservationRecord report={report} />
      <RecheckingModule  report={report} />
      <TTBL report={report} />
      <HCDTable hcdData={report.PRHcd} />
      <ELPTable prelpData={report.PRELP} />
      <TeneffusModule report={report} />
      <ActivitiesTable report={report} />
      <SWOTTable report={report} />
      <ReportFooter />
    </Page>
  </Document>
);
