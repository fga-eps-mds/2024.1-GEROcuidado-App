import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
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
    return new Date(year, month - 1, day); // Mês começa em 0 no JavaScript
  };

  const handleSave = async () => {
    try {
      await database.write(async () => {
        const idoso = await idososCollection.find(elderId);
        await idoso.update(idoso => {
          idoso.nome = name;
          idoso.dataNascimento = parseDate(birthdate).toISOString(); // Ajustar formato da data
          idoso.tipoSanguineo = bloodType;
          idoso.telefoneResponsavel = phone;
          idoso.descricao = description;
        });
      });
      navigation.navigate('ElderList');
    } catch (error) {
      console.error("Error saving elder data: ", error);
    }
  };

  const handleDelete = async () => {
    try {
      await database.write(async () => {
        const idoso = await idososCollection.find(elderId);
        await idoso.markAsDeleted(); // Será excluído no próximo sync
      });
      navigation.navigate('ElderList');
    } catch (error) {
      console.error("Error deleting elder data: ", error);
    }
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

      <TouchableOpacity style={styles.buttonSalvar} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonExcluir} onPress={handleDelete}>
        <Text style={styles.cancelButtonText}>Excluir</Text>
      </TouchableOpacity>
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

