
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
    </View>
  )
}

export default ReportFooter