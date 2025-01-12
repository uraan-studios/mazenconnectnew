import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Report } from '@/constants/types';

// Create styles for the activities table
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
  lastCell: {
    borderRightWidth: 0, // Remove border for the last cell in each row
  },
  alternateRow: {
    backgroundColor: 'rgba(255, 204, 204, 0.4)',
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
});


const ActivitiesTable: React.FC<{report: Report}> = ({ report }) => {
  return (
    <View style={{ padding: "20px 0" }}>
      <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>F. Activities</Text>
      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={styles.cell}>Name</Text>
          <Text style={styles.cell}>Date</Text>
          <Text style={[styles.cell, { flex: 2 }]}>Description</Text>
        </View>

        {/* Data Rows */}
        {report.PRactivity?.PRactivityCell.map((activity, index) => (
          <View
            key={activity.id}
            style={[styles.row, index % 2 === 0 ? styles.alternateRow : {}]}
          >
            <Text style={styles.cell}>{activity.cellValue}</Text>
            <Text style={styles.cell}>{new Date(activity.date).toDateString()}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{activity.description}</Text>
          </View>
        ))}

        {/* Total Row */}
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.cell}>TOTAL</Text>
          <Text style={[styles.cell, { flex: 2 }]}>
            {report.PRactivity?.PRactivityCell.length} Activities
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ActivitiesTable;
