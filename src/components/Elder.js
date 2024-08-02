import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Elder = ({ name, birthdate, bloodType, phone, description, image, onPress, onEdit }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.imageContainer} testID="elder-image-container">
        <Image source={image} style={styles.image} testID="elder-image" />
        <TouchableOpacity onPress={onEdit} style={styles.editButton} testID="edit-button">
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
    bottom: -7,
    right: -7,
    width: 34,
    height: 34,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b8068',
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

export default Elder;
