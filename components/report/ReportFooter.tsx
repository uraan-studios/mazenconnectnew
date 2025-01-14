
import React from 'react';
import {  Text, View, StyleSheet } from '@react-pdf/renderer';


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
      marginTop: 10,
      textAlign: 'center',
      color: 'grey',

    },
    textxs: {
      fontSize: 8,
      marginBottom: 2,
      marginTop: 10,
      textAlign: 'center',
      color: 'grey',
      opacity: 0.5,

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

    spacer: {
      height: 1,
      width: '100%',
      backgroundColor: 'red',
      opacity: 0.2,
    },
  });
  
const ReportFooter = () => {
  return (
    <View>
      <View style={styles.spacer} />
        <Text style={styles.text}>
            This report was taken from Mazen Connect at {new Date().toLocaleString()}
        </Text>
        <Text style={styles.textxs}>
            Powered by URAAN STUDIOS © 2025
        </Text>
    </View>
  )
}

export default ReportFooter