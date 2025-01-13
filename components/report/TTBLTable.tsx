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

// Create TTBL component
const TTBL = ({ report }: { report: Report }) => {
  return (
    <View style={{ padding: '20px 0' }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>E. TTBL</Text>
      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={styles.cell}>Name</Text>
          <Text style={styles.cell}>Available</Text>
          <Text style={styles.cell}>Working</Text>
          <Text style={[styles.cell, { borderRightWidth: 0 }]}>Out of Order</Text>
        </View>

        {/* Data Rows */}
        {report.PRttbl?.PRttblCell.map((item, index) => (
          <View
            key={item.id}
            style={[styles.row, index % 2 === 1 ? styles.alternateRow : {}]}
          >
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.avaliable}</Text>
            <Text style={styles.cell}>{item.working}</Text>
            <Text style={[styles.cell, styles.lastCell]}>{item.outOfOrder}</Text>
          </View>
        ))}

        {/* Total Row */}
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.cell}>TOTAL</Text>
          <Text style={styles.cell}>
            {report.PRttbl?.PRttblCell.reduce((acc, item) => acc + item.avaliable, 0)}
          </Text>
          <Text style={styles.cell}>
            {report.PRttbl?.PRttblCell.reduce((acc, item) => acc + item.working, 0)}
          </Text>
          <Text style={[styles.cell, styles.lastCell]}>
            {report.PRttbl?.PRttblCell.reduce((acc, item) => acc + item.outOfOrder, 0)}
          </Text>
        </View>
      </View>

      {/* TTBL CONTENT */}
      <Text style={{ ...styles.remarks, marginTop: 10 }}>TTBL Content:</Text>
      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={styles.cell}>Grade</Text>
          <Text style={styles.cell}>CLLE</Text>
          <Text style={styles.cell}>CLLU</Text>
          <Text style={[styles.cell, { borderRightWidth: 0 }]}>MD</Text>
        </View>

        {/* DATA for Pre-Nursery, Nursery, and Kindergarten */}
        {['preNursery', 'nursery', 'kindergarten'].map((grade, index) => (
          <View
            key={grade}
            style={[styles.row, index % 2 === 1 ? styles.alternateRow : {}]}
          >
            <Text style={styles.cell}>{grade.charAt(0).toUpperCase() + grade.slice(1)}</Text>
            <Text style={styles.cell}>

              {report.PRttblContent?.[`${grade}CLLE`] ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.cell}>
              {report.PRttblContent?.[`${grade}CLLU`] ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.cell}>
              {report.PRttblContent?.[`${grade}MD`] ? 'Yes' : 'No'}
            </Text>
          </View>
        ))}
      </View>

      {/* GRADE 1-3 */}
      <Text style={{ ...styles.remarks, marginTop: 10 }}>Grade 1-3 Content:</Text>
      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={styles.cell}>Grade</Text>
          <Text style={styles.cell}>English</Text>
          <Text style={styles.cell}>Urdu</Text>
          <Text style={styles.cell}>Math</Text>
          <Text style={styles.cell}>GK</Text>
          <Text style={styles.cell}>ICT</Text>
          <Text style={[styles.cell, { borderRightWidth: 0 }]}>Islamiyat</Text>
        </View>

        {/* Data Rows for Grades 1-3 */}
        {['g1', 'g2', 'g3'].map((grade, index) => (
          <View
            key={grade}
            style={[styles.row, index % 2 === 1 ? styles.alternateRow : {}]}
          >
            <Text style={styles.cell}>{grade.toUpperCase()}</Text>
            {['Eng', 'Urdu', 'Math', 'GK', 'ICT', 'Isl'].map(subject => {
              const key = `${grade}${subject}` as keyof typeof report.PRttblContent;
              return (
                <Text key={subject} style={styles.cell}>
                  {report.PRttblContent?.[key] ? 'Yes' : 'No'}
                </Text>
              );
            })}
          </View>
        ))}
      </View>

      {/* GRADE 4-5 */}
      <Text style={{ ...styles.remarks, marginTop: 10 }}>Grade 4-5 Content:</Text>
      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={styles.cell}>Grade</Text>
          <Text style={styles.cell}>English</Text>
          <Text style={styles.cell}>Urdu</Text>
          <Text style={styles.cell}>Math</Text>
          <Text style={styles.cell}>SS</Text>
          <Text style={styles.cell}>ICT</Text>
          <Text style={styles.cell}>Islamiyat</Text>
          <Text style={[styles.cell, { borderRightWidth: 0 }]}>Science</Text>
        </View>

        {/* Data Rows for Grades 4-5 */}
        {['g4', 'g5'].map((grade, index) => (
          <View
            key={grade}
            style={[styles.row, index % 2 === 1 ? styles.alternateRow : {}]}
          >
            <Text style={styles.cell}>{grade.toUpperCase()}</Text>
            {['Eng', 'Urdu', 'Math', 'SS', 'ICT', 'Isl', 'Sci'].map(subject => {
              const key = `${grade}${subject}` as keyof typeof report.PRttblContent;
              return (
                <Text key={subject} style={styles.cell}>
                  {report.PRttblContent?.[key] ? 'Yes' : 'No'}
                </Text>
              );
            })}
          </View>
        ))}
      </View>

      {/* Remarks */}
      <Text style={styles.remarks}>Remarks: {report.PRttbl?.remarks}</Text>
    </View>
  );
};

export default TTBL;
