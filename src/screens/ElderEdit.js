import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import database, { idososCollection } from '../db';

const ElderEdit = ({ route, navigation }) => {
  const { elderId, user } = route.params; // Recebendo elderId e user como parâmetros de rota
  const [elder, setElder] = useState(null);
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchElder = async () => {
      try {
        const idoso = await idososCollection.find(elderId);
        const data = idoso._raw;
        setElder({
          name: data.nome,
          birthdate: new Date(data.dataNascimento).toLocaleDateString('pt-BR'),
          bloodType: data.tipoSanguineo,
          phone: data.telefoneResponsavel,
          description: data.descricao,
          image: require('../../assets/elders/elder_1.png'),
        });
        setName(data.nome);
        setBirthdate(new Date(data.dataNascimento).toLocaleDateString('pt-BR'));
        setBloodType(data.tipoSanguineo);
        setPhone(data.telefoneResponsavel);
        setDescription(data.descricao);
      } catch (error) {
        console.error("Error fetching elder data: ", error);
      }
    };
    fetchElder();
  }, [elderId]);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const showErrorModal = (message) => {
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  const handleSave = async () => {
    const telefoneResponsavel = phone;
    const [dia, mes, ano] = birthdate.split('/').map(Number);

    if (!validarTelefone(telefoneResponsavel)) {
      showErrorModal("Número de telefone inválido. Deve conter 11 dígitos.");
      return;
    }

    if (!validarData(dia, mes, ano)) {
      showErrorModal("Data de nascimento inválida.");
      return;
    }

    try {
      await database.write(async () => {
        const idoso = await idososCollection.find(elderId);
        await idoso.update(idoso => {
          idoso.nome = name;
          idoso.dataNascimento = parseDate(birthdate).toISOString();
          idoso.tipoSanguineo = bloodType;
          idoso.telefoneResponsavel = phone;
          idoso.descricao = description;
        });
      });
      navigation.navigate('ElderList', { user }); // Passando o usuário na navegação
    } catch (error) {
      showErrorModal("Erro ao salvar: " + error.message);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async () => {
    try {
      await database.write(async () => {
        const idoso = await idososCollection.find(elderId);
        await idoso.markAsDeleted();
      });
      navigation.navigate('ElderList', { user }); // Passando o usuário na navegação
    } catch (error) {
      showErrorModal("Erro ao excluir: " + error.message);
    }
    hideModal();
  };

  if (!elder) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ElderList', { user })}>
        <Image source={require('../../assets/back_button.png')} style={styles.backButtonImage} />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image source={elder.image} style={styles.elderImage} />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/user.png')} style={styles.iconUser} />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/birthday.png')} style={styles.iconBirthday} />
          <TextInput
            style={styles.input}
            value={birthdate}
            onChangeText={setBirthdate}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/tipo_sanguineo.png')} style={styles.bloodIcon} />
          <TextInput
            style={styles.input}
            value={bloodType}
            onChangeText={setBloodType}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/phone.png')} style={styles.iconPhone} />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/nota.png')} style={styles.iconNota} />
          <TextInput
            style={[styles.input, { height: 60 }]}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>
      </View>

      <TouchableOpacity style={styles.buttonSalvar} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonExcluir} onPress={showModal}>
        <Text style={styles.cancelButtonText}>Excluir</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={hideModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Deseja mesmo excluir este idoso?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.noButton]} onPress={hideModal}>
              <Text style={[styles.modalButtonText, styles.noButtonText]}>Não</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.yesButton]} onPress={handleDelete}>
              <Text style={[styles.modalButtonText, styles.yesButtonText]}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={errorModalVisible}
        onBackdropPress={() => setErrorModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{errorMessage}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => setErrorModalVisible(false)}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const validarTelefone = (telefone) => {
  const regexTelefone = /^\d{11}$/;
  return regexTelefone.test(telefone);
};

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

  if (ano < 1900 || ano > 2024) {
    return false;
  }
  if (mes < 1 || mes > 12) {
    return false;
  }
  if (dia < 1 || dia > diasNoMes[mes]) {
    return false;
  }
  if (dia.toString().length !== 2 || mes.toString().length !== 2 || ano.toString().length !== 4) {
    return false;
  }
  return true;
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
  input: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 16,
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 8,
  },
  buttonSalvar: {
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
  buttonExcluir: {
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
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
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

export default ElderEdit;
