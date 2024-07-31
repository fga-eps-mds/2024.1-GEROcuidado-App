import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Rotina = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/elders/elder_1.png')} style={styles.logo_caregiver} />
          <Text style={styles.helloMessage}>Cuidando de nome do idoso</Text>
        </View>
      </View>
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
  header: {
    height: '23%',
    width: '110%',
    alignItems: 'center',
    paddingLeft: 20,
    marginTop: '-200%',
    backgroundColor: "#2CCDB5",
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '7%',
  },
  logo_caregiver: {
    width: 60,
    height: 60,
    marginTop: 63,
    borderRadius: 30,
  },
  helloMessage: {
    fontSize: 18,
    color: 'white',
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default Rotina;