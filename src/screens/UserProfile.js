import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import OptionProfile from '../components/OptionProfile';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserProfile = ({ route, navigation }) => {
  const { user } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePress = (message) => {
    console.log(message);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleLogout = async () => {
    try { 
      await AsyncStorage.removeItem('user'); 
  
      hideModal();
  
      navigation.navigate('TelaInicial');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/icon_caregiver.png')} style={styles.logo_caregiver} />
        <Text style={styles.helloMessage}>Olá, {user.name}</Text>

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.button} onPress={showModal}>
            <Image source={require('../../assets/logout.png')} style={styles.LogoutImage} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={hideModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Deseja mesmo sair do aplicativo?</Text>
          <Text style={styles.modalBody}></Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.noButton]} onPress={hideModal}>
              <Text style={[styles.modalButtonText, styles.noButtonText]}>Não</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.yesButton]} onPress={handleLogout}>
              <Text style={[styles.modalButtonText, styles.yesButtonText]}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.optionWrapper}>
        <OptionProfile
          name="Perfil de usuário"
          description="Edite sua conta"
          smallImage={require('../../assets/engrenagem.png')}
          rightImage={require('../../assets/Arrow.png')}
          onPress={() => navigation.navigate('UserEdit', { user })}
          style={styles.optionSpacing}
        />
      </View>

      <View style={styles.optionWrapper}>
        <OptionProfile
          name="Gerenciar idosos"
          description="Visualize e edite idosos"
          smallImage={require('../../assets/IconIdoso.png')}
          rightImage={require('../../assets/Arrow.png')}
          onPress={() => navigation.navigate('ElderList', { user })}
          style={styles.optionSpacing}
        />
      </View>
      <Footer />
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
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 5,
  },
  modalBody: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
  },
  noButton: {
    borderColor: '#838383', 
  },
  yesButton: {
    borderColor: '#2CCDB5', 
    backgroundColor: '#2CCDB5',
  },
  modalButtonText: {
    fontSize: 14,
  },
  noButtonText: {
    color: '#FF0000', 
  },
  yesButtonText: {
    color: '#FFFFFF',
  },
});

export default UserProfile;