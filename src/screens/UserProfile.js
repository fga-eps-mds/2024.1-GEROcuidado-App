import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import OptionProfile from '../components/OptionProfile';

const UserProfile = () => {

  const handlePress = (message) => {
    console.log(message);
    // navigation.navigate('NextPage'); TO-DO: Substituir'NextPage' pelo nome da página para a qual você deseja navegar
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/icon_caregiver.png')} 
        style={styles.logo_caregiver} />
        <Text style={styles.helloMessage}>Olá, nome do usuário</Text>
      </View>
      <OptionProfile
        name="Perfil 1"
        icon="https://example.com/icon1.png" // Substitua pelo URL do ícone
        description="Descrição do perfil 1"
        onPress={() => handlePress('Perfil 1')}
      />
      <OptionProfile
        name="Perfil 2"
        icon="https://example.com/icon2.png" // Substitua pelo URL do ícone
        description="Descrição do perfil 2"
        onPress={() => handlePress('Perfil 2')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    height: "20%",
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: "#2CCDB5"
  },
  logo_caregiver: {
    width: 72,
    height: 72,
    marginRight: 10,
  },
  helloMessage: {
    fontSize: 20,
    color: 'white',
  },
});

export default UserProfile