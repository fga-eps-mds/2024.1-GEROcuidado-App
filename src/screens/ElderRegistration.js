import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Button, ScrollView, TextInput} from 'react-native';
import {useForm, Controller} from 'react-hook-form'
import {TextInputMask} from 'react-native-masked-text';

const ElderRegistration = ({ navigation }) => {
  const {control, handleSubmit, formState: {errors} } = useForm();

  const onSubmit = data => {
      console.log(data);
      // Aqui você pode adicionar o código para enviar os dados para o backend
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

        {/* Img do icon */}
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
      </View>
    </ScrollView>
  );
    

}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    marginBottom: 20,
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
  // marginEnd: 1,
},
formContainer: {
  marginBottom: 20,
},
inputWrapper: {
  alignItems: 'center',
  marginBottom: 10,
},
input: {
  height: 30,
  borderColor: 'gray',
  borderBottomWidth: 1, // add input em linha
  marginBottom: 10,
  paddingHorizontal: 10,
  borderRadius: 5, // tamanho do input
},
});

export default ElderRegistration;