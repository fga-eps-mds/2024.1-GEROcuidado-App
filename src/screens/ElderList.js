import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Elder from '../components/Elder'; // Certifique-se de que este caminho está correto
import database, { idososCollection } from '../db';
import { useFocusEffect } from '@react-navigation/native';

const ElderList = ({ route, navigation }) => {
  const { user } = route.params; // Certifique-se de que o `user` está sendo passado corretamente
  const [elders, setElders] = useState([]); // Inicialização correta do estado

  const fetchElders = async () => {
    try {
      const idosoRecords = await idososCollection.query().fetch();
      const idosoData = idosoRecords.map((idoso) => ({
        id: idoso._raw.id,
        name: idoso._raw.nome,
        birthdate: new Date(idoso._raw.dataNascimento).toLocaleDateString(),
        bloodType: idoso._raw.tipoSanguineo,
        phone: idoso._raw.telefoneResponsavel,
        description: idoso._raw.descricao,
        image: require('../../assets/elders/elder_1.png'), // Certifique-se de que o caminho da imagem está correto
      }));
      setElders(idosoData); // Atualização correta do estado
    } catch (error) {
      console.error('Erro ao buscar idosos:', error); // Adicione logs de erro para depuração
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchElders();
    }, [])
  );

  const handleEdit = (elderId) => {
    navigation.navigate('ElderEdit', { elderId });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('UserProfile', { user })}>
        <Image source={require('../../assets/back_button.png')} style={styles.backButtonImage} />
      </TouchableOpacity>
      <Text style={styles.headerText}>De quem está{"\n"}cuidando?</Text>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        {elders.map((elder) => (
          <Elder
            key={elder.id}
            name={elder.name}
            birthdate={elder.birthdate}
            bloodType={elder.bloodType}
            phone={elder.phone}
            description={elder.description}
            image={elder.image}
            onPress={() => navigation.navigate('ElderVisualization', { elderId: elder.id })}
            onEdit={() => handleEdit(elder.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.plusButton} onPress={() => navigation.navigate('ElderRegistration', { user })}>
            <Image source={require('../../assets/plus_button.png')} style={styles.plusButtonImage} />
        </TouchableOpacity>
      </View>
      <Text style={styles.plusText}>Cadastrar{'\n'}um idoso</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    marginTop: 25,
    marginLeft: 15,
    width: 40,
    height: 40,
  },
  backButtonImage: {
    width: 40,
    height: 40,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 37,
    fontWeight: '600',
    color: '#3D3D3D',
  },
  scrollView: {
    flex: 1,
    marginBottom: '10%',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 150,
    paddingLeft: "7%",
    paddingRight: "7%"
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '20%',
    backgroundColor: '#F2F1F7',
    alignItems: 'center',
  },
  plusButton: {
    width: 64,
    height: 64,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  plusButtonImage: {
    width: 64,
    height: 64,
    marginTop: -10,
  },
  plusText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '400'
  },
});

export default ElderList;
