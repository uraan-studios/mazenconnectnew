import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Report } from '@/constants/types';

// Create styles for the TTBL table
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
    flex: 1,
  },
  lastCell: {
    borderRightWidth: 0,
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

const TTBL = ({ report }: { report: Report }) => {
  return (
    <>
    
      <View style={{ padding: '20px 0' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>F. TTBL</Text>

        {/* Equipment Status Table */}
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.cell}>Name</Text>
            <Text style={styles.cell}>Available</Text>
            <Text style={styles.cell}>Working</Text>
            <Text style={[styles.cell, styles.lastCell]}>Out of Order</Text>
          </View>
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

        {/* Content Section */}
        <ContentSection title="TTBL Content" grades={['preNursery', 'nursery', 'kindergarten']} fields={['CLLE', 'CLLU', 'MD']} report={report} />
        <ContentSection title="Grade 1-3 Content" grades={['g1', 'g2', 'g3']} fields={['Eng', 'Urdu', 'Math', 'GK', 'ICT', 'Isl']} report={report} />
        <ContentSection title="Grade 4-5 Content" grades={['g4', 'g5']} fields={['Eng', 'Urdu', 'Math', 'SS', 'ICT', 'Isl', 'Sci']} report={report} />

        <Text style={styles.remarks}>Remarks: {report.PRttbl?.remarks}</Text>
      </View>

      <View style={{ padding: '20px 0' }}>
       <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>G. TBIS</Text>
       <Text style={styles.remarks}>Remarks: {report.PRttblContent?.tbisRemarks || '-'}</Text>

      </View>
    </>
  );
};

const ContentSection = ({
  title,
  grades,
  fields,
  report,
}: {
  title: string;
  grades: string[];
  fields: string[];
  report: Report;
}) => (
  <>
    <Text style={{ ...styles.remarks, marginTop: 10 }}>{title}:</Text>
    <View style={styles.table}>
      <View style={styles.headerRow}>
        <Text style={styles.cell}>Grade</Text>
        {fields.map((field) => (
          <Text key={field} style={styles.cell}>{field}</Text>
        ))}
      </View>
      {grades.map((grade, index) => (
        <View key={grade} style={[styles.row, index % 2 === 1 ? styles.alternateRow : {}]}>
          <Text style={styles.cell}>{grade.toUpperCase()}</Text>
          {fields.map((field) => {
            const key = `${grade}${field}` as keyof Report['PRttblContent']; // Ensure TypeScript knows this key exists
            return (
              <Text key={field} style={styles.cell}>
                {report.PRttblContent?.[key] ? 'Yes' : 'No'}
              </Text>
            );
          })}
        </View>
      ))}
    </View>
  </>
);


export default TTBL;
