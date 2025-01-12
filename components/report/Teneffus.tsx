import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Report } from '@/constants/types';

// Create styles for the TTBL table, similar to StudentTable
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
    textDecorationColor: 'white',
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


const TeneffusModule = ({ report }: { report: Report }) => {
  return (
    <View style={{ padding: '20px 0' }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>E. Teneffus</Text>
      <View style={styles.table}>
        <View style={styles.headerRow}>
            <Text style={styles.cell}>Total Number of sessions:</Text>
        </View>
          <View
              style={[styles.row, 1 % 2 === 1 ? styles.alternateRow : {}]}
            >
            <Text style={styles.cell}>Early Years:</Text>
            <Text style={styles.cell}>{report.PRTenuffus?.ealyYears}</Text>
          </View>
        
          <View
              style={[styles.row, 2 % 2 === 1 ? styles.alternateRow : {}]}
            >
            <Text style={styles.cell}>Primary Years:</Text>
            <Text style={styles.cell}>{report.PRTenuffus?.primaryYears}</Text>
          </View>
        
          <View
              style={[styles.row, 1 % 2 === 1 ? styles.alternateRow : {}]}
            >
            <Text style={styles.cell}>Middle Years:</Text>
            <Text style={styles.cell}>{report.PRTenuffus?.middleYears}</Text>
          </View>
      </View>

      {/* Remarks */}
      <Text style={styles.remarks}>Remarks: {report.PRTenuffus?.remarks}</Text>
    </View>  )
}

export default TeneffusModule