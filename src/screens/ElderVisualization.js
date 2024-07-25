import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ElderVisualization = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ElderList')}>
        <Image source={require('../../assets/back_button.png')} style={styles.backButtonImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    top: 15,
    left: 5,
  },
  backButtonImage: {
    width: 43,
    height: 43,
  },
});

export default ElderVisualization