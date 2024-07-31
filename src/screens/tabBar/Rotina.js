import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions  } from 'react-native';
import Modal from 'react-native-modal';

const Rotina = ({ navigation, route}) => {
  const { user } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/elders/elder_1.png')} style={styles.logo_caregiver} />
          <Text style={styles.helloMessage}>Cuidando de nome do idoso</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.newRoutineButton} onPress={toggleModal}>
        <Text style={styles.newRoutineText}>     + Nova rotina     </Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
        <View style={styles.modalContent}>
          {/* Aqui você pode adicionar os campos e lógica da tela de NewRoutine */}
          <View style={styles.header2}>
                <TouchableOpacity style={styles.backButton} onPress={toggleModal}>
                    <Image source={require('../../../assets/back_button_white.png')} style={styles.backButtonImage} />
                </TouchableOpacity>
                <Text style={styles.helloMessage2}>Nova Rotina</Text>
            </View>
        </View>
      </Modal>

    </View>
  );
};

const { height } = Dimensions.get('window');
const modalHeight = height * 0.9; // Ajuste o valor conforme necessário

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: '23%',
    width: '110%',
    alignItems: 'center',
    paddingLeft: 20,
    marginTop: '-200%',
    backgroundColor: "#2CCDB5",
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '7%',
  },
  logo_caregiver: {
    width: 60,
    height: 60,
    marginTop: 63,
    borderRadius: 30,
  },
  helloMessage: {
    fontSize: 18,
    color: 'white',
    marginTop: 8,
    fontWeight: 'bold',
  },
  newRoutineButton: {
    position: 'absolute',
    top: '20%',  // Coloca o botão logo abaixo do header
    right: 15,
    padding: 10,
    backgroundColor: '#B4026D',
    borderRadius: 14,
    height: 35,
    elevation: 15,
  },
  newRoutineText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex',
    margin: 1,
    marginTop: 7,
    margin: 7,
  },
  modalContent: {
    backgroundColor: 'white',
    height: modalHeight,
    padding: 20,
    borderTopLeftRadius: 10, // Adiciona borda arredondada na parte superior esquerda
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10, // Adiciona borda arredondada na parte inferior esquerda
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#B4026D',
    borderRadius: 8,
  },
  header2 : {
    height: 80,
    width: '113%',
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: "#2CCDB5",
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: -20,
  },
  backButtonImage: {
    width: 27,
    height: 27,
  },
  backButton: {
    marginRight: 10,
    marginTop: -10,
    marginLeft: -5,
  },
  helloMessage2: {
    fontSize: 18,
    color: 'white',
    marginTop: -10,
    fontWeight: 'bold',
  },
  
});

export default Rotina;