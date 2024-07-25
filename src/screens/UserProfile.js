import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import OptionProfile from '../components/OptionProfile';
import Footer from '../components/Footer';

const UserProfile = ({ navigation }) => {
  const handlePress = (message) => {
    console.log(message);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/icon_caregiver.png')} style={styles.logo_caregiver} />
        <Text style={styles.helloMessage}>Olá, nome do usuário</Text>

        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert('Tem certeza que deseja sair?')}
          >
            <Image
              source={require('../../assets/logout.png')}
              style={styles.LogoutImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionWrapper}>
        <OptionProfile
          name="Perfil de usuário"
          description="Edite sua conta"
          smallImage={require('../../assets/engrenagem.png')}
          rightImage={require('../../assets/Arrow.png')}
          onPress={() => handlePress('Perfil')}
          style={styles.optionSpacing}
        />
      </View>

      <View style={styles.optionWrapper}>
        <OptionProfile
          name="Gerenciar idosos"
          description="Visualize e edite idosos"
          smallImage={require('../../assets/IconIdoso.png')}
          rightImage={require('../../assets/Arrow.png')}
          onPress={() => navigation.navigate('ElderList')}
          style={styles.optionSpacing}
        />
      </View>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    height: '20%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: "#2CCDB5",
  },
  logoutContainer: {
    position: 'absolute',
    right: 25,
    height: '20%',
    flexDirection: 'row',
    paddingLeft: 0,
  },
  logo_caregiver: {
    width: 65,
    height: 65,
    marginRight: 10,
    marginTop: 10,
  },
  helloMessage: {
    fontSize: 18,
    color: 'white',
  },
  LogoutImage: {
    width: 35,
    height: 35,
  },
  optionWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: -20,
    marginTop: 20,
  },
  optionSpacing: {
    marginTop: 40,
    marginBottom: -10,
  },
});

export default UserProfile;
