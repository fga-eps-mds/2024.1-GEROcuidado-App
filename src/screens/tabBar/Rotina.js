import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput  } from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller } from 'react-hook-form';
import { TextInputMask } from 'react-native-masked-text';

const Rotina = ({ navigation, route}) => {
  const { user } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      titulo: '',
      dataRotina: '',
      horaInicio: '',
      categoria: ''
    }
  });
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

          <View style={styles.formContainer}>

            {/* Input de título */}
            <View style={styles.inputWrapperTitle}>
              <View style={styles.inputContainer2}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, styles.textInputWithPadding2]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Adicionar Título"
                    />
                  )}
                  name="titulo"
                />
              </View>
            </View>
            
            {/* Input data da rotina */}
            <View style={styles.inputWrapper}>
              <Image source={require('../../../assets/newRoutine/calendar.png')} style={styles.iconCalendar} />
              <View style={styles.inputContainer}>
                {/* {errors.dataNascimento && <Text style={styles.errorText}>A data de nascimento é obrigatória.</Text>} */}
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputMask
                      type={'datetime'}
                      options={{
                        format: 'DD/MM/YYYY'
                      }}
                      style={[styles.input, styles.textInputWithPadding]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Data da rotina"
                    />
                  )}
                  name="dataRotina"
                />
              </View>
            </View>

            {/* Input hora */}
            <View style={styles.inputWrapper}>
              <Image source={require('../../../assets/newRoutine/clock.png')} style={styles.iconClock} />
              <View style={styles.inputContainer}>
                {/* {errors.nome && <Text style={styles.errorText}>Este campo é obrigatório.</Text>} */}
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, styles.textInputWithPadding]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Horário de Início"
                    />
                  )}
                  name="horaInicio"
                />
              </View>
            </View>
              
            {/* Input categoria */}
            <View style={styles.inputWrapper}>
              <Image source={require('../../../assets/newRoutine/grid.png')} style={styles.categoryIcon} />
              <View style={styles.inputContainer}>
                {/* {errors.tipoSanguineo && <Text style={styles.errorText}>O tipo Sanguíneo é obrigatório.</Text>} */}
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, styles.textInputWithPadding]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Categoria"
                    />
                  )}
                  name="categoria"
                />
              </View>
            </View>
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
  formContainer: {
    // marginBottom: 10,
    marginTop: 95,
  },
 inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 80,
    width: 320,
    marginBottom: -40,
  },
  inputWrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -85,
    marginLeft: 160,
    width: 320,
    marginBottom: -30,
  },
 inputContainer: {
    flex: 1,
  },
  iconCalendar: {
    width: 20,
    height: 20,
    marginRight: -20,
  },
 iconClock: {
    width: 23.918,
    height: 24,
    marginRight: -27,
  },
  categoryIcon: {
    width: 29,
    height: 24,
    marginRight: -30,
  },
  textInputWithPadding: {
    paddingLeft: 43,
    // paddingRight: 16,
    height: 55,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 4,
  },
  textInputWithPadding2: {
    paddingLeft: 35,
    // paddingRight: 56,
    width: 170,
    height: 55,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 4,
    // alignItems: 'baseline',
  },
  
});

export default Rotina;