import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Report } from '@/constants/types';



// Create styles for the table
const styles = StyleSheet.create({
  table: {
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#b3b3b3',
    borderRadius: 5,
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'hsl(0 72.2% 50.6%)',
    fontWeight: 'extrabold',
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
    flex: 1, // Make cells flexible
  },
  cell2: {
    padding: 5,
    fontSize: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#b3b3b3',
    borderRightStyle: 'solid',
    flex: 2, // Make cells flexible
  },
  totalRow: {
    backgroundColor: '#e6e6e6',
    fontWeight: 'bold',
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

const WorkloadTable = ({ report }: { report: Report }) => {
  return (
    <View style={{ padding: "20px 0" }}>
      <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>{`C. Teacher's Workload`}</Text>
      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={styles.cell2}>Name</Text>
          <Text style={styles.cell}>Home Room</Text>
          <Text style={styles.cell}>Workload</Text>
          {/* <Text style={styles.cell}>Students</Text> */}
        </View>

        {/* Data Rows */}
        {report.PRworkload?.PRworkloadCell.map((item, index) => (
          <View key={index} style={[styles.row, index % 2 === 1 ? styles.alternateRow : {}]}>
            <Text style={styles.cell2}>{item.teacher.name}</Text>
            <Text style={styles.cell}>{item.isHomeland ? "Yes" : ""}</Text>
            <Text style={styles.cell}>{item.workload}</Text>
            {/* <Text style={styles.cell}>{item.students}</Text> */}
          </View>
        ))}

        {/* Total Row */}
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.cell2}>AVG</Text>
          <Text style={styles.cell}>
            {(
              (report.PRworkload?.PRworkloadCell?.reduce((acc, item) => acc + item.workload, 0) ?? 0) /
              (report.PRworkload?.PRworkloadCell?.length || 1)
            ).toFixed(2)}

          </Text>
          {/* <Text style={styles.cell}>
            {(
              report.PRworkload.PRworkloadCell.reduce((acc, item) => acc + item.students, 0) /
              report.PRworkload.PRworkloadCell.length
            ).toFixed(2)}
          </Text> */}
        </View>

        {/* Remarks */}
        <Text style={styles.remarks}>Remarks: {report.PRworkload?.remarks}</Text>
      </View>
    </View>
  );
};

export default WorkloadTable;
