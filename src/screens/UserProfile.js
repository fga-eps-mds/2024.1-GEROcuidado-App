import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';

const UserProfile = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text>Oiii</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink'
  },
  logo: {
    width: 270,
    height: 270,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: "5%",
    marginBottom: -40,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    margimTop: -20,
  },
  button: {
    flexDirection: 'row', 
    height: 51,
    width: "65%",
    backgroundColor: '#2CCDB5',
    alignItems: 'center',
    justifyContent: 'center', 
    elevation: 3,
    borderRadius: 20
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    color: "#ffff",
  },
});

export default UserProfile