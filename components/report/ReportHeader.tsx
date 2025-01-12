import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode'; // Import QRCode library

// Define the types for the component props
type Props = {
  date: string; // Date as a string in ISO format or similar
  campus: string; // Name of the campus
  id: string; // Unique identifier for the report
};

// Define styles for the PDF document
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'semibold',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'semibold',
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
  },
  image: {
    width: '40%',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spacer: {
    height: 1,
    width: '100%',
    backgroundColor: 'red',
    opacity: 0.2,
  },
  qrCode: {
    width: 60,
    height: 60,
  },
});

const ReportHeader: React.FC<Props> = ({ date, campus, id }) => {
  const [qrCodeSrc, setQrCodeSrc] = useState<string>(''); // State to hold QR code image source

  // Generate QR code once the component mounts
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrCode: string = await QRCode.toDataURL(`https://connect.mazenschools.edu.pk/report/${id}/?key=7dCHQaQD35`);
        setQrCodeSrc(qrCode); // Set the generated QR code as a base64 image
      } catch (error) {
        console.error('Failed to generate QR code', error);
      }
    };

    generateQRCode();
  }, [id]); // Add id as a dependency to regenerate QR code if id changes

  return (
    <View>
      <View style={styles.header}>
        <Image style={styles.image} src="/mazen-banner-logo.png" />
        <View>
          <Text style={styles.title}>Principal Report</Text>
          <Text style={styles.text}>Generated: {new Date(date).toLocaleString()}</Text>
          <Text style={styles.text}>mazenschools.edu.pk</Text>
        </View>
      </View>
      
      <View style={styles.spacer} />

      <View style={styles.subheader}>
        <View>
          <Text style={styles.text}>Branch: {campus}</Text>
          <Text style={styles.text}>
            Month: {new Date(new Date(date).setMonth(new Date(date).getMonth() - 1)).toLocaleString('default', { month: 'long' })}
          </Text>
          <Text style={styles.text}>Report ID: {id}</Text>
        </View>
        {/* Render QR Code */}
        {qrCodeSrc && <Image style={styles.qrCode} src={qrCodeSrc} />}
      </View>
      
      <View style={styles.spacer} />
    </View>
  );
};

export default ReportHeader;
