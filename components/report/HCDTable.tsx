import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

// Create styles for the HCD table
const styles = StyleSheet.create({
  container: {
    padding: '20px 0',
  },
  header: {
    backgroundColor: 'hsl(0 72.2% 50.6%)', // Using your original header color
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    padding: 5,
    color: 'white',
    fontSize: 14,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#b3b3b3',
    borderRadius: 5,
    marginBottom: 15,
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'hsl(0 72.2% 50.6%)', // Updated to match the main header
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#b3b3b3',
    borderBottomStyle: 'solid',
  },
  cell: {
    padding: 5,
    fontSize: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#b3b3b3',
    borderRightStyle: 'solid',
    flex: 1,
  },
  lastCell: {
    borderRightWidth: 0,
  },
  remarksContainer: {
    backgroundColor: '#e6e6e6',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginTop: 10,
  },
  remarks: {
    padding: 2,
    marginTop: 5,
    fontSize: 10,
  },
  alternateRow: {
    backgroundColor: 'rgba(255, 204, 204, 0.4)', // Light red for alternate rows
  },
});

// Define the report type
interface Report {
  PRHcd: {
    meetings: number; // or appropriate type if not a number
    workload: number; // or appropriate type if not a number
  };
  parentFeedback: string;
}

const HCDTable: React.FC<{ report: Report }> = ({ report }) => {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <Text style={styles.sectionHeader}>D. HCD</Text>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.cell}>Meetings</Text>
          <Text style={styles.cell}>Workload</Text>
        </View>
        <View style={[styles.row, styles.alternateRow]}>
          <Text style={styles.cell}>{report.PRHcd.meetings}</Text>
          <Text style={styles.cell}>{report.PRHcd.workload}</Text>
        </View>
      </View>

      {/* Parent Feedback */}
        <Text style={styles.remarks}>{`Parent's Feedback:`} {report.parentFeedback}</Text>
      
    </View>
  );
};

export default HCDTable;
