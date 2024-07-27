import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Elder = ({ name, birthdate, bloodType, phone, description, image, onPress, onEdit }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Image source={require('../../assets/edit_button.png')} style={styles.editButtonImage} />
        </TouchableOpacity>
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    marginBottom: 20,
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  editButtonImage: {
    width: 20,
    height: 20,
  },
  name: {
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500',
  },
});

export default Elder;
