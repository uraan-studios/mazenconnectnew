"use client";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { PrincipalReport } from "./document"; // Ensure the path is correct

import { Report } from "@/constants/types";

const ReportPageRenderer = ({ report }: { report: Report }) => {
  const formattedDate = new Date(new Date(report.createdAt).setMonth(new Date(report.createdAt).getMonth() - 1)).toLocaleString(
    "default",
    { month: "long" }
  );

  return (
    <div className="p-10 w-full">
      <div className="flex justify-end py-4">
        <PDFDownloadLink
          document={<PrincipalReport report={report} />}
          fileName={`Principal Report - ${report.campus.name} - ${formattedDate}.pdf`}
          className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded"
        >
          Download PDF
        </PDFDownloadLink>
      </div>

      {/* PDF Viewer */}
      <div className="flex justify-center mb-6">
        <PDFViewer className="w-full h-screen" width={800} height={1000} showToolbar={false}>
          <PrincipalReport report={report} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default ReportPageRenderer;
