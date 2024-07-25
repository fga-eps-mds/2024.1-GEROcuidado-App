import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const OptionProfile = ({ name, icon, description, smallImage, rightImage ,onPress }) => {
  return (
    <TouchableOpacity style={[styles.optionContainer]} onPress={onPress}>
    <View style={styles.iconContainer1}>
        <Image source={{ uri: icon }} style={styles.icon} />
        <Image source={smallImage} style={styles.smallImage} />
    </View>
    <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
    </View>
    <Image source={rightImage} style={styles.rightImage} />
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    width: 323,
    height: 74,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // sombra maior
  },
  iconContainer1: {
    marginRight: -5, // reduz o espaço entre o texto e icon
    marginLeft: 5, // add margem esquerda ao icon
    alignItems: 'center', // Centraliza as imagens verticalmente
  },
  rightImage: {
    width: 8,
    height: 11,
    marginRight: 5, //
    marginTop: -20, // reduz a margem do topo
  },
  icon: { 
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7, // Adiciona espaçamento entre o título e a descrição
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  smallImage: {
    width: 30,
    height: 30,
    // Add margem ao smallImage
    marginRight: 20,
    marginTop: -55,
  },
});

export default OptionProfile;