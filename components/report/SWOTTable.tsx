import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

// Create styles for the SWOT table
const styles = StyleSheet.create({
  table: {
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#b3b3b3',
    borderRadius: 5,
    marginBottom: 20,
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
  alternateRow: {
    backgroundColor: 'rgba(255, 204, 204, 0.4)',
  },
});

interface SWOT {
  strength: string;
  weakness: string;
  opportunity: string;
  threat: string;
}

interface SWOTTableProps {
  report: {
    PRswot: SWOT;
  };
}

const SWOTTable: React.FC<SWOTTableProps> = ({ report }) => {
  const swotData = [
    { name: 'Strength', value: report.PRswot.strength },
    { name: 'Weakness', value: report.PRswot.weakness },
    { name: 'Opportunity', value: report.PRswot.opportunity },
    { name: 'Threat', value: report.PRswot.threat },
  ];

  return (
    <View style={{ padding: '20px 0' }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>G. SWOT</Text>
      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={styles.cell}>Name</Text>
          <Text style={[styles.cell, { flex: 2 }]}>Description</Text>
        </View>

        {/* Data Rows */}
        {swotData.map((item, index) => (
          <View
            key={item.name}
            style={[styles.row, index % 2 === 0 ? styles.alternateRow : {}]}
          >
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SWOTTable;
