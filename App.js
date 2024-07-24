import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import Login from './src/screens/Login';
import UserProfile from './src/screens/UserProfile';

const App = () => {
  return (
    <View style={styles.wrapper}>
      <UserProfile />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default App