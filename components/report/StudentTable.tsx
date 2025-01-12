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
  lastCell: {
    borderRightWidth: 0, // Remove border for the last cell in each row
  },
  sectionHeader: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
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

const StudentTable: React.FC<{ report: Report }> = ({ report }) => {
  return (
    <View style={{ padding: "20px 0" }}>
      <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>A. Students</Text>
      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={styles.cell}>No.</Text>
          <Text style={[styles.cell, { flex: 2 }]}>Class</Text>
          <Text style={styles.cell}>Previous</Text>
          <Text style={styles.cell}>Left</Text>
          <Text style={styles.cell}>New</Text>
          <Text style={styles.cell}>Promoted</Text>
          <Text style={styles.cell}>Transferred</Text>
          <Text style={styles.cell}>Total</Text>
          <Text style={styles.cell}>Boys/Girls</Text>
          <Text style={styles.cell}>Sections</Text>
        </View>

        {/* Data Rows */}
        {report.PRstudent?.PRstudentClassCell.map((cls, index) => (
          <React.Fragment key={cls.id}>
            {/* Class Data Row */}
            <View style={[styles.row, index % 2 === 1 ? styles.alternateRow : {}]}>
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={[styles.cell, { flex: 2 }]}>{cls.class.name}</Text>
              <Text style={styles.cell}>{cls.prev}</Text>
              <Text style={styles.cell}>{cls.left}</Text>
              <Text style={styles.cell}>{cls.new}</Text>
              <Text style={styles.cell}>{cls.promoted}</Text>
              <Text style={styles.cell}>{cls.transfered}</Text>
              <Text style={styles.cell}>{cls.total}</Text>
              <Text style={styles.cell}>{cls.boys}/{cls.girls}</Text>
              <Text style={styles.cell}>{cls.PRstudentSectionCell.length}</Text>
            </View>

            {/* Section Data Rows */}
            {cls.PRstudentSectionCell.map((sec) => (
              <View key={sec.id} style={styles.sectionHeader}>
                <Text style={styles.cell}>-</Text>
                <Text style={[styles.cell, { flex: 2 }]}>Section {sec.section.name}</Text>
                <Text style={styles.cell}>{sec.prev}</Text>
                <Text style={styles.cell}>{sec.left}</Text>
                <Text style={styles.cell}>{sec.new}</Text>
                <Text style={styles.cell}>{sec.promoted}</Text>
                <Text style={styles.cell}>{sec.transfered}</Text>
                <Text style={styles.cell}>{sec.total}</Text>
                <Text style={styles.cell}>{sec.boys}/{sec.girls}</Text>
                <Text style={styles.cell}></Text>
              </View>
            ))}
          </React.Fragment>
        ))}

        {/* Total Row */}
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.cell}>-</Text>
          <Text style={[styles.cell, { flex: 2 }]}>TOTAL</Text>
          <Text style={styles.cell}>{report.PRstudent?.PRstudentClassCell.reduce((acc, cls) => acc + cls.prev, 0)}</Text>
          <Text style={styles.cell}>{report.PRstudent?.PRstudentClassCell.reduce((acc, cls) => acc + cls.left, 0)}</Text>
          <Text style={styles.cell}>{report.PRstudent?.PRstudentClassCell.reduce((acc, cls) => acc + cls.new, 0)}</Text>
          <Text style={styles.cell}>{report.PRstudent?.PRstudentClassCell.reduce((acc, cls) => acc + cls.promoted, 0)}</Text>
          <Text style={styles.cell}>{report.PRstudent?.PRstudentClassCell.reduce((acc, cls) => acc + cls.transfered, 0)}</Text>
          <Text style={styles.cell}>{report.PRstudent?.PRstudentClassCell.reduce((acc, cls) => acc + cls.total, 0)}</Text>
          <Text style={styles.cell}>{report.PRstudent?.PRstudentClassCell.reduce((acc, cls) => acc + cls.boys, 0)}/{report.PRstudent?.PRstudentClassCell.reduce((acc, cls) => acc + cls.girls, 0)}</Text>
          <Text style={styles.cell}></Text>
        </View>

        {/* Remarks */}
      </View>
      <Text style={styles.remarks}>Remarks: {report.PRstudent?.remarks}</Text>
    </View>
  );
};

export default StudentTable;
