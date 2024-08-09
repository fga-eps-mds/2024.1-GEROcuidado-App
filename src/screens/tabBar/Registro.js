import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Registro = ({ navigation }) =>{
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Registro na pasta tabBar</Text>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });
  
  export default Registro;