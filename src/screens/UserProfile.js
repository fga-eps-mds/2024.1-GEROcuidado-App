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

        {/* Adição do logout button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert('Tem certeza que deseja sair?')}
          >
            <Image
              source={require('../../assets/logout.png')} // Substitua pelo caminho da sua imagem
              style={styles.buttonImage}
            />
          </TouchableOpacity> 
        </View>
      </View>

      <View style={styles.optionWrapper}>
        <OptionProfile
          name="Perfil"
          // icon="https://example.com/icon1.png" // Substitua pelo URL do ícone
          description="Edite sua conta"
          smallImage={require('../../assets/engrenagem.png')} // Imagem do icone da engrenagem
          rightImage={require('../../assets/Arrow.png')} // Imagem do arrow
          onPress={() => handlePress('Perfil')}
          style={styles.optionSpacing} // Adiciona espaçamento ao primeiro botão
        />
      </View>

      <View style={styles.optionWrapper}>
        <OptionProfile
          name="Idosos"
          // icon="https://example.com/icon2.png" // Substitua pelo URL do ícone
          description="Gerenciar idosos"
          smallImage={require('../../assets/IconIdoso.png')} // Imagem do icone Idoso
          rightImage={require('../../assets/Arrow.png')} // Imagem do arrow
          onPress={() => handlePress('Idosos')}
          style={styles.optionSpacing} // Adiciona espaçamento ao segundo botão
        />
      </View>
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
    fontSize: 18,
    color: 'white',
  },
  optionSpacing: {
    marginTop: 40, // add espaçamento do primeiro botão
    marginBottom: -10, // Adiciona espaçamento ao segundo botão
  },
  optionWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: -10, // Espaço entre os botões
    marginTop: 20, // Espaço do topo
  },
  buttonImage: {
    width: 35,
    height: 35,
    marginLeft: 15,// Espaço entre a imagem e o text
    marginTop: 8, 
  },
});

export default UserProfile