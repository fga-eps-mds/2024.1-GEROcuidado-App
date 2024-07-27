import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInputMask } from 'react-native-masked-text';
import database, { idososCollection } from '../db';

const ElderRegistration = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      birthdate: '',
      bloodtype: '',
      phone: '',
      description: '',
    }
  });

  const createIdoso = async (data) => {
    await database.write(async () => {
      try {
        await idososCollection.create((idoso) => {
          idoso.nome = data.name;
          idoso.dataNascimento = new Date(data.birthdate); 
          idoso.telefoneResponsavel = data.phone;
          idoso.tipoSanguineo = data.bloodtype || ''; // Lida com campo opcional
          idoso.observacoes = data.description || ''; // Lida com campo opcional
        });
        console.log("Idoso criado com sucesso!");
      } catch (error) {
        console.error("Erro ao criar idoso:", error);
      }
    });
  };

  const onSubmit = async (data) => {
    console.log(data);
    await createIdoso(data);
    navigation.navigate('ElderList');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ElderList')}>
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
                <TextInput
                  style={[styles.input, styles.textInputWithPadding]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Tipo sanguíneo"
                />
              )}
              name="bloodtype"
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
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('ElderList')}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

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
});

export default ElderRegistration;
