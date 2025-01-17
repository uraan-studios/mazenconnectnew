import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

// Styles for the HCD table
const styles = StyleSheet.create({
  container: {
    padding: '20px 0',
  },
  header: {
    backgroundColor: 'hsl(0 72.2% 50.6%)',
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
    backgroundColor: 'hsl(0 72.2% 50.6%)',
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
    backgroundColor: 'rgba(255, 204, 204, 0.4)',
  },
});

// Define the HCD data type
interface HCDData {
  reportId: number;
  remarks: string;
  meetings: number;
  workload: number;
  preNurseryPlanner: boolean;
  preNurseryWorksheets: boolean;
  preNuseryTTBL: boolean;
  nurseryPlanner: boolean;
  nurseryWorksheets: boolean;
  nurseryTTBL: boolean;
  kindergartenPlanner: boolean;
  kindergartenWorksheets: boolean;
  kindergartenTTBL: boolean;
  grade1Planner: boolean;
  grade1Worksheets: boolean;
  grade1TTBL: boolean;
  grade2Planner: boolean;
  grade2Worksheets: boolean;
  grade2TTBL: boolean;
  grade3Planner: boolean;
  grade3Worksheets: boolean;
  grade3TTBL: boolean;
  grade4Planner: boolean;
  grade4Worksheets: boolean;
  grade4TTBL: boolean;
  grade5Planner: boolean;
  grade5Worksheets: boolean;
  grade5TTBL: boolean;
  grade6Planner: boolean;
  grade6Worksheets: boolean;
  grade7Planner: boolean;
  grade7Worksheets: boolean;
  grade8Planner: boolean;
  grade8Worksheets: boolean;
}

// Props for the HCDTable component
interface HCDTableProps {
  hcdData: HCDData;
}

const HCDTable: React.FC<HCDTableProps> = ({ hcdData }) => {
  return (
    <View style={styles.container}>
      {/* Early Years Table */}
      <Text style={styles.sectionHeader}>H. HCD</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.headerRow}>
          <Text style={styles.cell}>Meetings</Text>
          <Text style={styles.cell}>Workload</Text>

        </View>

        {/* Pre-Nursery Row */}
        <View style={styles.row}>
          <Text style={styles.cell}>{hcdData.meetings}</Text>
          <Text style={styles.cell}>{hcdData.workload}</Text>
        </View>

      </View>
      <Text style={styles.remarks}>Early Years</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.headerRow}>
          <Text style={styles.cell}>Category</Text>
          <Text style={styles.cell}>Planner</Text>
          <Text style={styles.cell}>Worksheets</Text>
          <Text style={styles.cell}>TTBL</Text>
        </View>

        {/* Pre-Nursery Row */}
        <View style={styles.row}>
          <Text style={styles.cell}>Pre-Nursery</Text>
          <Text style={styles.cell}>{hcdData.preNurseryPlanner ? "Yes" : "No"}</Text>
          <Text style={styles.cell}>{hcdData.preNurseryWorksheets ? "Yes" : "No"}</Text>
          <Text style={styles.cell}>{hcdData.preNuseryTTBL ? "Yes" : "No"}</Text>
        </View>

        {/* Nursery Row */}
        <View style={styles.row}>
          <Text style={styles.cell}>Nursery</Text>
          <Text style={styles.cell}>{hcdData.nurseryPlanner ? "Yes" : "No"}</Text>
          <Text style={styles.cell}>{hcdData.nurseryWorksheets ? "Yes" : "No"}</Text>
          <Text style={styles.cell}>{hcdData.nurseryTTBL ? "Yes" : "No"}</Text>
        </View>

        {/* Kindergarten Row */}
        <View style={styles.row}>
          <Text style={styles.cell}>Kindergarten</Text>
          <Text style={styles.cell}>{hcdData.kindergartenPlanner ? "Yes" : "No"}</Text>
          <Text style={styles.cell}>{hcdData.kindergartenWorksheets ? "Yes" : "No"}</Text>
          <Text style={styles.cell}>{hcdData.kindergartenTTBL ? "Yes" : "No"}</Text>
        </View>
      </View>

      {/* Primary and Middle Years Table */}
      <Text style={styles.remarks}>Primary and Middle Years</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.headerRow}>
          <Text style={styles.cell}>Grade</Text>
          <Text style={styles.cell}>Planner</Text>
          <Text style={styles.cell}>Worksheets</Text>
          <Text style={styles.cell}>TTBL</Text>
        </View>

        {/* Grade 1 to 8 Rows */}
        {[
          { grade: 'Grade 1', planner: hcdData.grade1Planner, worksheets: hcdData.grade1Worksheets, ttbl: hcdData.grade1TTBL },
          { grade: 'Grade 2', planner: hcdData.grade2Planner, worksheets: hcdData.grade2Worksheets, ttbl: hcdData.grade2TTBL },
          { grade: 'Grade 3', planner: hcdData.grade3Planner, worksheets: hcdData.grade3Worksheets, ttbl: hcdData.grade3TTBL },
          { grade: 'Grade 4', planner: hcdData.grade4Planner, worksheets: hcdData.grade4Worksheets, ttbl: hcdData.grade4TTBL },
          { grade: 'Grade 5', planner: hcdData.grade5Planner, worksheets: hcdData.grade5Worksheets, ttbl: hcdData.grade5TTBL },
          { grade: 'Grade 6', planner: hcdData.grade6Planner, worksheets: hcdData.grade6Worksheets, ttbl: '-' },
          { grade: 'Grade 7', planner: hcdData.grade7Planner, worksheets: hcdData.grade7Worksheets, ttbl: '-' },
          { grade: 'Grade 8', planner: hcdData.grade8Planner, worksheets: hcdData.grade8Worksheets, ttbl: '-' },
        ].map((row, index) => (
          <View key={index} style={[styles.row, index % 2 === 1 ? styles.alternateRow : {}]}>
            <Text style={styles.cell}>{row.grade ? "Yes" :"No"}</Text>
            <Text style={styles.cell}>{row.planner ? "Yes" :"No"}</Text>
            <Text style={styles.cell}>{row.worksheets ? "Yes" :"No"}</Text>
            <Text style={styles.cell}>{row.ttbl ? "Yes" :"No"}</Text>
          </View>
        ))}
      </View>

      {/* Remarks Section */}
      <Text style={styles.remarks}>Remarks: {hcdData.remarks}</Text>

    </View>
  );
};

export default HCDTable;