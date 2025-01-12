// PrincipalReport.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'semibold',
  },
  text: {
    fontSize: 12,
  },
  image: {
    width: '40%',
    height: 'auto',
    marginBottom: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

// Create PDF document component
const PrincipalReport = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.image} src="/mazen-banner-logo.png" />
        <View>
          <Text style={styles.title}>Principal Report</Text>
          <Text style={styles.text}>Generated: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.text}>mazenschools.edu.pk</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Report Page</Text>
        <Text style={styles.text}>
          This is a simple report with a logo that can be downloaded as a PDF.
        </Text>
      </View>
    </Page>
  </Document>
);

export default PrincipalReport;
