import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import database, { idososCollection } from '../db';

const ElderVisualization = ({ route, navigation }) => {
  const { elderId, user } = route.params;
  const [elder, setElder] = useState(null);

  useEffect(() => {
    const fetchElder = async () => {
      const idoso = await idososCollection.find(elderId);

      const birthdate = new Date(idoso._raw.dataNascimento).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      setElder({
        name: idoso._raw.nome,
        birthdate: birthdate,
        bloodType: idoso._raw.tipoSanguineo,
        medication: idoso._raw.medicacoes,
        phone: idoso._raw.telefoneResponsavel,
        description: idoso._raw.observacoes,
        image: require('../../assets/elders/elder_1.png'),
      });
    };
    fetchElder();
  }, [elderId]);

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
            value={elder.name}
            editable={false}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/birthday.png')} style={styles.iconBirthday} />
          <TextInput
            style={styles.input}
            value={elder.birthdate}
            editable={false}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/tipo_sanguineo.png')} style={styles.bloodIcon} />
          <TextInput
            style={styles.input}
            value={elder.bloodType}
            editable={false}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/medication.png')} style={styles.iconMedication} />
          <TextInput
            style={styles.input}
            value={elder.medication}
            editable={false}
            multiline
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/phone.png')} style={styles.iconPhone} />
          <TextInput
            style={styles.input}
            value={elder.phone}
            editable={false}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/registerElder/nota.png')} style={styles.iconNota} />
          <TextInput
            style={[styles.input, { height: 60 }]}
            value={elder.description}
            editable={false}
            multiline
          />
        </View>
      </View>
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

  iconMedication: {
    width: 14,
    height: 26,
    marginRight: -15,
  },

  medicationInput: {
    paddingTop: 10,
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

export default ElderVisualization;
