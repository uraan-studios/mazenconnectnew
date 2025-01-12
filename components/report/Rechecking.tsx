import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Report } from '@/constants/types';

// Create styles for the rechecking table
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
    flex: 1,
  },
  lastCell: {
    borderRightWidth: 0,
  },
  classHeader: {
    backgroundColor: '#e6e6e6',
    fontWeight: 'bold',
    fontSize: 12,
    padding: 5,
    textAlign: 'center',
  },
  alternateRow: {
    backgroundColor: 'rgba(255, 204, 204, 0.4)',
  },
});

const RecheckingModule: React.FC<{ report: Report }> = ({ report }) => {
  // Group data by classId and then sort by class.gradeId
  const groupedData = Object.values(
    report.PRrechecking?.PRrecheckingCell.reduce((acc, item) => {
      const classId = item.class.id;
      if (!acc[classId]) {
        acc[classId] = {
          className: item.class.name,
          gradeId: item.class.gradeId,
          items: [],
        };
      }
      acc[classId].items.push(item);
      return acc;
    }, {} as Record<string, { className: string; gradeId: number; items: typeof report.PRrechecking.PRrecheckingCell }>) || {}
  );

  // Sort grouped data by class.gradeId in ascending order
  const sortedGroups = groupedData.sort((a, b) => a.gradeId - b.gradeId);

  return (
    <View style={{ padding: '20px 0' }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>E. Rechecking</Text>

      {/* Iterate over each sorted class group */}
      {sortedGroups.map((group) => (
        <View key={group.className} style={styles.table}>
          {/* Class Header */}
          <Text style={styles.classHeader}>{group.className}</Text>

          {/* Header Row */}
          <View style={styles.headerRow}>
            <Text style={styles.cell}>Teacher Name</Text>
            <Text style={styles.cell}>Subject</Text>
            <Text style={[styles.cell, styles.lastCell]}>Rechecked</Text>
          </View>

          {/* Data Rows */}
          {group.items.map((item, index) => (
            <View key={item.id} style={[styles.row, index % 2 === 1 ? styles.alternateRow : {}]}>
              <Text style={styles.cell}>{item.teacher.name}</Text>
              <Text style={styles.cell}>{item.subject.name}</Text>
              <Text style={[styles.cell, styles.lastCell]}>{item.status ? 'Yes' : 'No'}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default RecheckingModule;
