import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Report } from '@/constants/types';


// Create styles for the staff table
const styles = StyleSheet.create({
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
  lastCell: {
    borderRightWidth: 0, // Remove border for the last cell in each row
  },
  sectionHeader: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  totalRow: {
    backgroundColor: '#e6e6e6',
    fontWeight: 'bold',
  },
  remarks: {
    padding: 2,
    marginTop: 0,
    fontSize: 10,
  },
  alternateRow: {
    backgroundColor: 'rgba(255, 204, 204, 0.4)',
  },
  departmentHeader: {
    backgroundColor: '#e6e6e6',
    fontWeight: 'bold',
    fontSize: 12,
    padding: 5,
    textAlign: 'center',
  },
});

const StaffTable: React.FC<{report: Report}> = ({ report }) => {
  return (
    <View style={{ padding: '20px 0' }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>B. Staff</Text>
      {report.PRStaff?.PRStaffDeps.map((item) => (
        <View key={item.id} style={styles.table}>
          <Text style={styles.departmentHeader}>{item.department.name}</Text>
          <View style={styles.headerRow}>
            <Text style={styles.cell} >Designation</Text>
            <Text style={styles.cell}>Previous</Text>
            <Text style={styles.cell}>Left</Text>
            <Text style={styles.cell}>New</Text>
            <Text style={styles.cell}>Total</Text>
          </View>

          {/* Data Rows */}
          {item.PRStaffDesig.map((desig) => (
            <View
              key={desig.id}
              style={[styles.row, item.PRStaffDesig.indexOf(desig) % 2 === 0 ? styles.alternateRow : {}]}
            >
              <Text style={styles.cell} >{desig.designation.name}</Text>
              <Text style={styles.cell}>{desig.prev}</Text>
              <Text style={styles.cell}>{desig.left}</Text>
              <Text style={styles.cell}>{desig.new}</Text>
              <Text style={styles.cell}>{desig.total}</Text>
            </View>
          ))}

          {/* Total Row */}
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.cell}>TOTAL</Text>
            <Text style={styles.cell}>{item.PRStaffDesig.reduce((acc, desig) => acc + desig.prev, 0)}</Text>
            <Text style={styles.cell}>{item.PRStaffDesig.reduce((acc, desig) => acc + desig.left, 0)}</Text>
            <Text style={styles.cell}>{item.PRStaffDesig.reduce((acc, desig) => acc + desig.new, 0)}</Text>
            <Text style={styles.cell}>{item.PRStaffDesig.reduce((acc, desig) => acc + desig.total, 0)}</Text>
          </View>
        </View>
      ))}

      {/* Remarks */}
      <Text style={styles.remarks}>Remarks: {report.PRStaff?.remarks}</Text>
    </View>
  );
};

export default StaffTable;
