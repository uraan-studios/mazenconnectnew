import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Report } from '@/constants/types';

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

const ObservationRecord : React.FC<{report: Report}> = ({ report })  => {
  return (
    <View style={{ padding: '20px 0' }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>D. Observation Record</Text>
      {/* {
        report.PRObservationRecord.
      } */}

      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={styles.cell}>ID</Text>
          <Text style={styles.cell}>Name</Text>
          <Text style={styles.cell}>Walk Through</Text>
          <Text style={styles.cell}>Informed</Text>
          <Text style={[styles.cell, { borderRightWidth: 0 }]}>UnInformed</Text>
        </View>

        {/* Data Rows */}
        {report.PRObservationRecord?.PRObservationRecordCell.map((item, index) => (
          <View
            key={item.id}
            style={[styles.row, index % 2 === 1 ? styles.alternateRow : {}]}
          >
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{item.teacher.name}</Text>
            <Text style={styles.cell}>{item.walkthrough}</Text>
            <Text style={styles.cell}>{item.informed}</Text>
            <Text style={[styles.cell, styles.lastCell]}>{item.uninformed}</Text>
          </View>
        ))}


      </View>
      
      {/* Remarks */}
      {/* <Text style={styles.remarks}>Remarks: {report.?.remarks}</Text> */}
    </View>
      )
}

export default ObservationRecord