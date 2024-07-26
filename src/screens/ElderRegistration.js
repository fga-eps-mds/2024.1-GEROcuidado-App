import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Button, ScrollView, TextInput} from 'react-native';
import {useForm, Controller} from 'react-hook-form'
import {TextInputMask} from 'react-native-masked-text';

const ElderRegistration = ({ navigation }) => {
  const {control, handleSubmit, formState: {errors} } = useForm();

  const onSubmit = data => {
      console.log(data);
      alert('Idoso cadastrado com sucesso!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ElderList')}>
            <Image source={require('../../assets/back_button.png')} style={styles.backButtonImage} />
        </TouchableOpacity>

        <View style={styles.imageContainer}>
            <Image source={require('../../assets/elders/elder_1.png')} style={styles.elderImage} />
      </View>

      {/* conteiner principal */}
      <View style={styles.formContainer}>

        {/* Primeiro field */}
        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/user.png')} style={styles.iconUser} />
        </View>
        <Controller
            control={control}
            rules={{ required: 'O nome é obrigatório' }}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            )}
        name="name"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
        
        {/* SEGUNDO field */}
        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/birthday.png')} style={styles.IconBirthday} />
        </View>
          <Controller
              control={control}
              rules={{ required: 'A data de nascimento é Obrigatória' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputMask
                  type={'datetime'}
                  options={{
                      format: 'DD/MM/YYYY'
                  }}
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
          name="birthdate"
        />
        {errors.birthdate && <Text style={styles.errorText}>{errors.birthdate.message}</Text>}
        
        {/* TERCEIRO field */}
        <View style={styles.inputWrapper}>
            <Image source={require('../../assets/registerElder/tipo_sanguineo.png')} style={styles.bloodIcon} />
        </View>
        <Controller
          control={control}
          rules={{ required: 'O tipo sanguíneo é obrigatório' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="bloodType"
        />
        {errors.bloodType && <Text style={styles.errorText}>{errors.bloodType.message}</Text>}
        
        {/* QUARTO field */}
        <View style={styles.inputWrapper}>
            <Image source={require('../../assets/registerElder/phone.png')} style={styles.iconPhone} />
        </View>
        <Controller
          control={control}
          rules={{ required: 'O telefone é Obrigatório' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="phone"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
          
        {/* Quinto field */}
        <View style={styles.inputWrapper}>
            <Image source={require('../../assets/registerElder/nota.png')} style={styles.iconNota} />
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, { height: 30 }]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
        name="notes"
        />
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.buttonCadastro} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    marginBottom: 20,
    marginTop: 10,
  },
  elderImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  backButtonImage: {
    marginTop: 10,
    width: 40,
    height: 40,
  },
  iconUser: {
    width: 20.218,
    height: 20.012,
    marginBottom: -15,
    marginRight: 270,
  },
  IconBirthday:{
    width: 18,
    height: 22,
    marginBottom: -9,
    marginRight: 270,
  },
  bloodIcon:{
    width: 29,
    height: 24,
    marginBottom: -12,
    marginRight: 270,
  },
  iconPhone:{
    width: 18,
    height: 18,
    marginBottom: -10,
    marginRight: 270,
  },
  iconNota:{
    width: 22,
    height: 22,
    marginBottom: -10,
    marginRight: 270,
  },
  formContainer: {
    marginBottom: 10,
    marginTop: 30,
  },
  inputWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    height: 20,
    borderColor: 'gray',
    borderBottomWidth: 1, // add input em linha
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5, // tamanho do input
  },
  textInputWithPadding: {
    paddingLeft: 50, // adicionando espaço entre o texto e a imagem
  },
  buttonCadastro: {
    backgroundColor: '#2CCDB5',
    padding: 10,
    borderRadius: 8,
    width: 128,
    height: 40,
    alignItems: 'center',
    marginBottom: 20, // Espaçamento entre os botões
    marginTop: 30,
    marginLeft: 93,
  },
  buttonText: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  cancelButton: {
    padding: 10,
    width: 128,
    height: 40,
    alignItems: 'center',
    marginBottom: 20, // Espaçamento entre os botões
    marginTop: -10,
    marginLeft: 93,
},
  cancelButtonText: {
    color: 'red',
    fontStyle: 'normal',
    fontSize: 16,
},
  errorText: {
    color: 'red',
    marginBottom: -20,
    paddingLeft: 50,
  },
});
export default ElderRegistration;