import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import database, { idososCollection } from '../db';

const ElderEdit = ({ route, navigation }) => {
  const { elderId } = route.params;
  const [elder, setElder] = useState(null);
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchElder = async () => {
      const idoso = await idososCollection.find(elderId);
      setElder({
        name: idoso._raw.nome,
        birthdate: new Date(idoso._raw.dataNascimento).toLocaleDateString(),
        bloodType: idoso._raw.tipoSanguineo,
        phone: idoso._raw.telefoneResponsavel,
        description: idoso._raw.descricao,
        image: require('../../assets/elders/elder_1.png'),
      });
      setName(idoso._raw.nome);
      setBirthdate(new Date(idoso._raw.dataNascimento).toLocaleDateString());
      setBloodType(idoso._raw.tipoSanguineo);
      setPhone(idoso._raw.telefoneResponsavel);
      setDescription(idoso._raw.descricao);
    };
    fetchElder();
  }, [elderId]);

  const handleSave = async () => {
    await idososCollection.update(elderId, {
      nome: name,
      dataNascimento: new Date(birthdate).toISOString(),
      tipoSanguineo: bloodType,
      telefoneResponsavel: phone,
      descricao: description,
    });
    navigation.navigate('ElderList');
  };

  if (!elder) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ElderList')}>
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

      <Button title="Salvar" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 32,
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
    color: 'black',
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

export default ElderEdit;

