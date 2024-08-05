import React, { useState, useEffect  } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, FlatList, Switch, Alert, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller } from 'react-hook-form';
import { TextInputMask } from 'react-native-masked-text';
import moment from 'moment';
import database, { rotinasCollection } from '../../db';

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
  return dia > 0 && dia <= diasNoMes[mes];
};

const Rotina = ({ navigation, route }) => {

  const { user, idoso } = route.params;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rotinas, setRotinas] = useState([]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setValue('categoria', category);  // Atualiza o valor do campo de categoria no formulário
    setIsDropdownVisible(false);
  };

  const toggleNotificationSwitch = () => {
    setIsNotificationEnabled(previousState => !previousState);
  };

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      titulo: '',
      dataRotina: '',
      horaRotina: '',
      categoria: '',
      notificacao: '',
      domingo: false,
      segunda: false,
      terca: false,
      quarta: false,
      quinta: false,
      sexta: false,
      sabado: false,
      descricao: ''
    }
  });

  const categories = ['Tomar remédio', 'Hora da caminhada', 'Alimentar'];

  const onSubmit = async (data) => {
    
    const { titulo, dataRotina, horaRotina, categoria, notificacao, domingo ,descricao } = data;
    const [dia, mes, ano] = dataRotina.split('/').map(Number);

    if (!validarData(dia, mes, ano)) {
      setErrorMessage('Data de nascimento inválida.');
      setModalVisible(true);
      return;
    }
    const formattedData = `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;


    // Adicionando console.log para fazer testes
    console.log('Rotina cadastrada com Sucesso! Segue abaixo os dados:', {
      titulo,
      dataRotina: formattedData,
      horaRotina,
      categoria,
      notificacao,
      domingo,
      descricao,
      // idIdoso: idoso.id,
    });
    Alert.alert("Sucesso no cadastro da rotina!");

    try {
      setLoading(true);
      await database.write(async () => {
        await rotinasCollection.create((rotinas) => {
          rotinas.titulo = titulo;
          rotinas.dataRotina = formattedData;
          rotinas.horaRotina = horaRotina;
          rotinas.categoria = categoria;
          rotinas.notificacao = notificacao;
          rotinas.descricao = descricao;
          rotinas.idIdoso = idoso.id;
        });
      });
      // Atualiza a lista de rotinas
      // await fetchRotinas();
      setLoading(false);
      toggleModal();
      // reset();
      // navigation.navigate('NewRoutine', { user });
    } catch (error) {
      setLoading(false);
      setErrorMessage('Erro ao cadastrar rotina.');
      setModalVisible(true);
    }
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

      <TouchableOpacity style={styles.buttonCadastro} onPress={() => navigation.navigate('NewRoutine', { user })}>
        <Text style={styles.buttonText}>visualizar</Text>
      </TouchableOpacity>
  
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>

          <View style={styles.modalContent}>
            <View style={styles.header2}>
              <TouchableOpacity style={styles.backButton} onPress={toggleModal}>
                <Image source={require('../../../assets/back_button_white.png')} style={styles.backButtonImage} />
              </TouchableOpacity>
              <Text style={styles.helloMessage2}>Nova Rotina</Text>
            </View>

            <View style={styles.formContainer}>
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

              <View style={styles.inputWrapper}>
                <Image source={require('../../../assets/newRoutine/calendar.png')} style={styles.iconCalendar} />
                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    rules={{ required: true, pattern: /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/(20\d{2})$/ }}
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

              <View style={styles.inputWrapper}>
                <Image source={require('../../../assets/newRoutine/clock.png')} style={styles.iconClock} />
                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    rules={{ required: true, pattern: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInputMask
                        type={'datetime'}
                        options={{
                          format: 'HH:mm'
                        }}
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

              <View style={styles.inputWrapper}>
                <Image source={require('../../../assets/newRoutine/grid.png')} style={styles.categoryIcon} />
                <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
                  <Text style={styles.dropdownText}>{selectedCategory || "Categoria"}</Text>
                  <Image source={require('../../../assets/newRoutine/dropSelect.png')} style={styles.dropdownIcon} />
                </TouchableOpacity>
                {isDropdownVisible && (
                  <View style={styles.dropdown}>
                    <FlatList
                      data={categories}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <TouchableOpacity style={styles.dropdownItem} onPress={() => handleCategorySelect(item)}>
                          <Text style={styles.dropdownItemText}>{item}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                )}
              </View>
            </View>

            <View style={styles.switchWrapper}>
              <Switch
                trackColor={{ false: "#767577", true: "#2CCDB5" }}
                thumbColor={isNotificationEnabled ? "#ffff" : "#ffff"}
                onValueChange={toggleNotificationSwitch}
                value={isNotificationEnabled}
              />
              <Text style={styles.switchText}>Ativar notificação</Text>
            </View>
            <Text style={styles.repeteText}>Se repete às:</Text>
            <View style={styles.repeteContainer}>
                <View style={styles.inputWrapperRepete}>
                  <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                          <TouchableOpacity
                              style={value ? styles.repeteSelectedButton : styles.repeteButton}
                              onPress={() => setValue('domingo', !value)}
                          >
                            <Text style={value ? styles.repeteSelectedButtonText : styles.repeteButtonText}>
                              D
                            </Text>
                          </TouchableOpacity>
                      )}
                      name="domingo"
                  />
                  <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                          <TouchableOpacity
                              style={value ? styles.repeteSelectedButton : styles.repeteButton}
                              onPress={() => setValue('segunda', !value)}
                          >
                            <Text style={value ? styles.repeteSelectedButtonText : styles.repeteButtonText}>
                              S
                            </Text>
                          </TouchableOpacity>
                      )}
                      name="segunda"
                  />
                  <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                          <TouchableOpacity
                              style={value ? styles.repeteSelectedButton : styles.repeteButton}
                              onPress={() => setValue('terca', !value)}
                          >
                            <Text style={value ? styles.repeteSelectedButtonText : styles.repeteButtonText}>
                              T
                            </Text>
                          </TouchableOpacity>
                      )}
                      name="terca"
                  />
                  <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                          <TouchableOpacity
                              style={value ? styles.repeteSelectedButton : styles.repeteButton}
                              onPress={() => setValue('quarta', !value)}
                          >
                            <Text style={value ? styles.repeteSelectedButtonText : styles.repeteButtonText}>
                              Q
                            </Text>
                          </TouchableOpacity>
                      )}
                      name="quarta"
                  />
                  <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                          <TouchableOpacity
                              style={value ? styles.repeteSelectedButton : styles.repeteButton}
                              onPress={() => setValue('quinta', !value)}
                          >
                            <Text style={value ? styles.repeteSelectedButtonText : styles.repeteButtonText}>
                              Q
                            </Text>
                          </TouchableOpacity>
                      )}
                      name="quinta"
                  />
                  <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                          <TouchableOpacity
                              style={value ? styles.repeteSelectedButton : styles.repeteButton}
                              onPress={() => setValue('sexta', !value)}
                          >
                            <Text style={value ? styles.repeteSelectedButtonText : styles.repeteButtonText}>
                              S
                            </Text>
                          </TouchableOpacity>
                      )}
                      name="sexta"
                  />
                  <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                          <TouchableOpacity
                              style={value ? styles.repeteSelectedButton : styles.repeteButton}
                              onPress={() => setValue('sabado', !value)}
                          >
                            <Text style={value ? styles.repeteSelectedButtonText : styles.repeteButtonText}>
                              S
                            </Text>
                          </TouchableOpacity>
                      )}
                      name="sabado"
                  />
                </View>
            </View>
            
            {/* <ScrollView contentContainerStyle={styles.containerScrow}> */}
              <View style={styles.inputWrapperDescrição}>
                <Image source={require('../../../assets/registerElder/nota.png')} style={styles.iconNota} />
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
                        placeholder="Descrição"
                      />
                    )}
                    name="descricao"
                  />
                </View>
              </View>
          {/* </ScrollView> */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.saveButtonText}>Criar</Text>
            </TouchableOpacity>

          </View>

      </Modal>
    </View>
  );
};

const { height } = Dimensions.get('window');
const modalHeight = height * 0.92;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  // containerScrow: {
  //   flexGrow: 1,
  //   padding: -40,
  //   paddingBottom: 32,
  //   justifyContent: 'center',
  // },
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
    top: '20%',
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10, // Adiciona borda arredondada na parte inferior esquerda
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  header2: {
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
  inputWrapperDescrição: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 120,
    marginLeft: -1,
    width: 325,
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
    width: 25,
    height: 25,
    marginRight: -20,
    color: "#616161",
  },
  iconClock: {
    width: 25,
    height: 25,
    marginRight: -27,
    color: "#616161",
  },
  categoryIcon: {
    width: 25,
    height: 25,
    marginRight: -30,
    color: "#616161",
  },
  textInputWithPadding: {
    paddingLeft: 43,
    height: 55,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 4,
  },
  textInputWithPadding2: {
    paddingLeft: 15,
    width: 170,
    height: 55,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 4,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 45,
    height: 55,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 4,
    width: 320,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  dropdownIcon: {
    width: 27.5,
    height: 14.5,
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: 'black',
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    justifyContent: 'space-between',
    width: 185,
    marginLeft: -135,
  },
  switchText: {
    fontSize: 16,
    color: 'black',
  },
  repeteText:  {
    position: 'absolute',
    top: 420,
    left: 20,
    fontSize: 16,
    marginBottom: 12,
    textAlign:'left',
    color: '#616161',
  },
  repeteContainer: {
    width: '100%',
    position: 'absolute',
    top: 455,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapperRepete: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  repeteButton: {
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    width: 40,
    height: 40,
  },
  repeteSelectedButton: {
    backgroundColor: '#2CCDB5',
    padding: 4,
    borderRadius: 50,
    borderWidth: 2,
    color: 'white',
    borderColor: '#2CCDB5',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    width: 40,
    height: 40,
  },
  repeteButtonText: {
    color: "#616161",
    fontSize: 20,
    fontWeight: 'semibold',
  },
  repeteSelectedButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'semibold',
  },
  saveButton: {
    backgroundColor: '#2CCDB5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 60,
    alignSelf: 'center',
    width: '70%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonCadastro: {
    backgroundColor: '#2CCDB5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 100,
    alignSelf: 'center',
    width: '50%',
    marginBottom: -150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconNota: {
    width: 22,
    height: 22,
    marginRight: -20,
  },
});

export default Rotina;