import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Portal = ({ navigation }) =>{
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Portal na pasta tabBar</Text>
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
  
  export default Portal;