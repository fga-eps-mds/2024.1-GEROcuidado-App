import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInputMask } from 'react-native-masked-text';
import Modal from 'react-native-modal';
import database, { idososCollection } from '../db';

const eAnoBissexto = (ano) => {
  return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
};

const validarData = (dia, mes, ano) => {
  const diasNoMes = {
    1: 31,
    2: eAnoBissexto(ano) ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  dia = parseInt(dia, 10);
  mes = parseInt(mes, 10);
  ano = parseInt(ano, 10);

  if (ano < 1900 || ano > 2024) {
    return false;
  }
  if (mes < 1 || mes > 12) {
    return false;
  }
  if (dia < 1 || dia > diasNoMes[mes]) {
    return false;
  }
  return true;
};

const validarTelefone = (telefone) => {
  const regexTelefone = /^\d{11}$/;
  return regexTelefone.test(telefone);
};

const ElderRegistration = ({ route, navigation }) => {
  const { user } = route.params; // Recebendo o user como parâmetro de rota

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      birthdate: '',
      bloodtype: '',
      food: '',      
      medication: '',
      phone: '',
      description: '',
    }
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState('');
  const [medicationHeight, setMedicationHeight] = useState(45);

  const [bloodTypeDropdownVisible, setBloodTypeDropdownVisible] = useState(false);
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];


  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day).toISOString();
  };
  
  const createIdoso = async (data) => {
    await database.write(async () => {
      try {
        await idososCollection.create((idoso) => {
          idoso.nome = data.name;
          idoso.dataNascimento = parseDate(data.birthdate);
          idoso.telefoneResponsavel = data.phone;
          idoso.alimentacao = data.food|| '';
          idoso.tipoSanguineo = data.bloodtype || '';
          idoso.medicamento = data.medication || '';
          idoso.observacoes = data.description || '';
          idoso.user_id = user.id; // Associando o idoso ao usuário
        });
        console.log("Idoso criado com sucesso!");
      } catch (error) {
        console.error("Erro ao criar idoso:", error);
      }
    });
  };

  const showErrorModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const showSuccessModal = (message) => {
    setSuccessModalMessage(message);
    setSuccessModalVisible(true);
  };

  const onSubmit = async (data) => {
    const telefoneResponsavel = data.phone;
    const [dia, mes, ano] = data.birthdate.split('/').map(Number);

    if (!validarTelefone(telefoneResponsavel)) {
      showErrorModal("Número de telefone inválido. Deve conter 11 dígitos.");
      return;
    }

    if (!validarData(dia, mes, ano)) {
      showErrorModal("Data de nascimento inválida.");
      return;
    }

    try {
      await createIdoso(data);
      showSuccessModal("Cadastro realizado com sucesso!");
      setTimeout(() => {
        setSuccessModalVisible(false);
        navigation.navigate('ElderList', { user });
      }, 2000);
    } catch (error) {
      showErrorModal("Erro ao criar idoso: " + error.message);
    }
  };

  const toggleBloodTypeDropdown = () => {
    setBloodTypeDropdownVisible(!bloodTypeDropdownVisible);
  };

  const selectBloodType = (type, onChange) => {
    onChange(type);
    setBloodTypeDropdownVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ElderList', { user })}>
        <Image source={require('../../assets/back_button.png')} style={styles.backButtonImage} />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image source={require('../../assets/elders/elder_1.png')} style={styles.elderImage} />
      </View>

      <View style={styles.formContainer}>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/user.png')} style={styles.iconUser} />
          <View style={styles.inputContainer}>
            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
            <Controller
              control={control}
              rules={{ required: 'O nome é obrigatório' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, styles.textInputWithPadding]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Nome"
                />
              )}
              name="name"
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/birthday.png')} style={styles.iconBirthday} />
          <View style={styles.inputContainer}>
            {errors.birthdate && <Text style={styles.errorText}>{errors.birthdate.message}</Text>}
            <Controller
              control={control}
              rules={{ required: 'A data de nascimento é obrigatória' }}
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
                  placeholder="Data de nascimento"
                />
              )}
              name="birthdate"
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/tipo_sanguineo.png')} style={styles.bloodIcon} />
          <View style={styles.inputContainer}>
            {errors.bloodtype && <Text style={styles.errorText}>{errors.bloodtype.message}</Text>}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TextInput
                    style={[styles.input, styles.textInputWithPadding]}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Tipo sanguíneo"
                  />
                  <TouchableOpacity onPress={toggleBloodTypeDropdown} style={styles.dropdownButton}>
                    <Image source={require('../../assets/registerElder/Down-arrow.png')} style={styles.dropdownIcon} />
                  </TouchableOpacity>
                  {bloodTypeDropdownVisible && (
                    <View style={styles.dropdownContainer}>
                      <ScrollView
                        style={styles.dropdownList}
                        contentContainerStyle={styles.dropdownContentContainer}
                      >
                        {bloodTypes.map((item) => (
                          <TouchableOpacity
                            key={item}
                            onPress={() => selectBloodType(item, onChange)}
                            style={styles.dropdownItem}
                          >
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              )}
              name="bloodtype"
            />
          </View>
        </View>
        
        {/* Alimentacao */}
        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/alimento.png')} style={styles.iconAlimento} />
          <View style={styles.inputContainer}>
            {errors.food && <Text style={styles.errorText}>{errors.food.message}</Text>}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, styles.textInputWithPadding, styles.alimentoInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Alimentação"
                  multiline
                  textAlignVertical="top"
                />
              )}
              name="food"
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/medication.png')} style={styles.iconMedication} />
          <View style={styles.inputContainer}>
            {errors.medication && <Text style={styles.errorText}>{errors.medication.message}</Text>}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, styles.textInputWithPadding, styles.medicationInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Medicamentos"
                  multiline
                  textAlignVertical="top"
                />
              )}
              name="medication"
            />
          </View>
        </View>


        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/phone.png')} style={styles.iconPhone} />
          <View style={styles.inputContainer}>
            {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
            <Controller
              control={control}
              rules={{ required: 'O telefone é obrigatório' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, styles.textInputWithPadding]}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                  placeholder="Telefone Responsável"
                />
              )}
              name="phone"
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/nota.png')} style={styles.iconNota} />
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, styles.textInputWithPadding, { height: 60 }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Observações"
                  multiline
                />
              )}
              name="description"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.buttonCadastro} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('ElderList', { user })}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>

      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalMessage}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={successModalVisible} onBackdropPress={() => setSuccessModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{successModalMessage}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => setSuccessModalVisible(false)}>
          <Text style={styles.modalButtonText}></Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  backButton: {
    marginTop: 10,
    width: 40,
    height: 40,
  },
  backButtonImage: {
    width: 40,
    height: 40,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  elderImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  formContainer: {
    marginBottom: 10,
    marginTop: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flex: 1,
  },
  textInputWithPadding: {
    paddingLeft: 40,
    paddingRight: 16,
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 8,
  },
  errorText: {
    position: 'absolute',
    color: 'red',
    bottom: -20,
    marginTop: 4,
  },
  buttonCadastro: {
    backgroundColor: '#2CCDB5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 12,
    alignItems: 'center',
    marginTop: 12,
    alignSelf: 'center',
  },
  cancelButtonText: {
    color: 'red',
    fontSize: 16,
  },
  iconBirthday: {
    width: 18,
    height: 22,
    marginRight: -20,
  },
  bloodIcon: {
    width: 29,
    height: 24,
    left: -5,
    marginRight: -30,
  },
  iconPhone: {
    width: 18,
    height: 18,
    marginRight: -20,
  },

  iconMedication: {
    width: 14,
    height: 26,
    marginRight: -15,
  },

  iconAlimento: {
    width: 18,
    height: 22,
    marginRight: -15,
  },

  medicationInput: {
     paddingTop: 10,
  },

  alimentoInput: {
    paddingTop: 10,
  },  

  iconNota: {
    width: 22,
    height: 22,
    marginRight: -20,
  },

  iconUser: {
    width: 20,
    height: 20,
    marginRight: -20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },

  modalButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    
  },
  modalButtonText: {
    color: 'red',
    fontSize: 16,
  },

  successModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successModalText: {
    fontSize: 16,
    marginBottom: 15,
  },
  dropdownButton: {
    position: 'absolute',
    right: 20,
    top: 16,
  },
  dropdownIcon: {
    width: 20,
    height: 13,
    resizeMode: 'contain',
  },
  dropdownList: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 45,
    width: '100%',
    zIndex: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },

   dropdownContainer: {
      top: -45,
      zIndex: 1000,
   },

  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ElderRegistration;
