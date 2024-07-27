// Elder.js
import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Elder = ({ name, birthdate, bloodtype, phone, description, image, onPress }) => (
  <TouchableOpacity style={styles.elder} onPress={onPress}>
    <Image source={image} style={styles.image} />
    <Text style={styles.name}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  elder: {
    width: '48%', // Adjust to fit two items per row with some margin
    aspectRatio: 1, 
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Elder;
