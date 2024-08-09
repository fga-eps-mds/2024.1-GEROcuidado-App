import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
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
    12: 31
  };
  
    // if (ano < 1900 || ano > 2024) {
    //   return false;
    // }
    // if (mes < 1 || mes > 12) {
    //   return false;
    // }
    // if (dia < 1 || dia > diasNoMes[mes]) {
    //   return false;
    // }
    // if (dia.toString().length !== 2 || mes.toString().length !== 2 || ano.toString().length !== 4) {
    //   return false;
    // }
    // return true;

  return dia > 0 && dia <= diasNoMes[mes];
};

const ElderRegistration = ({ route, navigation }) => {
  const { user } = route.params;
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    defaultValues: {
      nome: '',
      dataNascimento: '',
      tipoSanguineo: '',
      telefoneResponsavel: '',
      descricao: ''
    }
  });

  const onSubmit = async (data) => {
    const { nome, dataNascimento, tipoSanguineo, telefoneResponsavel, descricao } = data;
    const [dia, mes, ano] = dataNascimento.split('/').map(Number);

    if (!validarData(dia, mes, ano)) {
      setErrorMessage('Data de nascimento inválida.');
      setModalVisible(true);
      return;
    }

    const telefoneNumerico = telefoneResponsavel.replace(/\D/g, '');
    if (telefoneNumerico.length !== 11) {
      setErrorMessage('Número de telefone inválido. Deve conter 11 dígitos.');
      setModalVisible(true);
      return;
    }

    const formattedData = `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

    try {
      setLoading(true);
      await database.write(async () => {
        await idososCollection.create((idoso) => {
          idoso.nome = nome;
          idoso.dataNascimento = formattedData;
          idoso.tipoSanguineo = tipoSanguineo;
          idoso.telefoneResponsavel = telefoneResponsavel;
          idoso.descricao = descricao;
          idoso.idUsuario = user.id;
        });
      });
      setLoading(false);
      navigation.navigate('ElderList', { user });
    } catch (error) {
      setLoading(false);
      setErrorMessage('Erro ao cadastrar idoso.');
      setModalVisible(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/back_button.png')} style={styles.backButtonImage} />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image source={require('../../assets/elders/elder_1.png')} style={styles.elderImage} />
      </View>
      
      <View style={styles.formContainer}>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/user.png')} style={styles.iconUser} />
          <View style={styles.inputContainer}>
            {errors.nome && <Text style={styles.errorText}>Este campo é obrigatório.</Text>}
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.name && styles.inputError, styles.textInputWithPadding]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Nome"
                />
              )}
              name="nome"
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/birthday.png')} style={styles.iconBirthday} />
          <View style={styles.inputContainer}>
            {errors.dataNascimento && <Text style={styles.errorText}>A data de nascimento é obrigatória.</Text>}
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputMask
                  type={'datetime'}
                  options={{
                    format: 'DD/MM/YYYY'
                  }}
                  style={[styles.input, errors.dataNascimento && styles.inputError, styles.textInputWithPadding]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Data de nascimento"
                />
              )}
              name="dataNascimento"
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/tipo_sanguineo.png')} style={styles.bloodIcon} />
          <View style={styles.inputContainer}>
            {errors.tipoSanguineo && <Text style={styles.errorText}>O tipo Sanguíneo é obrigatório.</Text>}
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.tipoSanguineo && styles.inputError, styles.textInputWithPadding]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Tipo Sanguíneo"
                />
              )}
              name="tipoSanguineo"
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/phone.png')} style={styles.iconPhone} />
          <View style={styles.inputContainer}>
          {errors.telefoneResponsavel && <Text style={styles.errorText}>O Telefone é Obrigatório.</Text>}
            <Controller
              control={control}
              rules={{ 
                required: true,
                validate: value => value.replace(/\D/g, '').length === 11 || 'O telefone deve conter 11 dígitos'
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputMask
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}
                  style={[styles.input, errors.telefoneResponsavel && styles.inputError, styles.textInputWithPadding]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Telefone Responsável'
                />
              )}
              name="telefoneResponsavel"
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
                  style={[styles.input, styles.textInputWithPadding,]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Observações"
                />
              )}
              name="descricao"
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
          <Text style={styles.modalText}>{errorMessage}</Text>
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
    color: 'red',
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
    marginRight: -30,
  },
  iconPhone: {
    width: 18,
    height: 18,
    marginRight: -20,
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
});

export default ElderRegistration;
