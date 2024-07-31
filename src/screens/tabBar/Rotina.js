import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity  } from 'react-native';

const Rotina = ({ navigation, route}) => {
  const { user } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/elders/elder_1.png')} style={styles.logo_caregiver} />
          <Text style={styles.helloMessage}>Cuidando de nome do idoso</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.newRoutineButton} onPress={() => navigation.navigate('NewRoutine', { user })}>
        <Text style={styles.newRoutineText}>     + Nova rotina     </Text>
      </TouchableOpacity>
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
  newRoutineButton: {
    position: 'absolute',
    top: '20%',  // Coloca o botão logo abaixo do header
    right: 15,
    padding: 10,
    backgroundColor: '#B4026D',
    borderRadius: 14,
    height: 35,
    elevation: 15,
  },
  newRoutineText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Rotina;