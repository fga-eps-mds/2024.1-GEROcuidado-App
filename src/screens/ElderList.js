import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Elder from '../components/Elder';

const ElderList = ({ elders, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('UserProfile')}>
        <Image source={require('../../assets/back_button.png')} style={styles.backButtonImage} />
      </TouchableOpacity>
      <Text style={styles.headerText}>De quem está{"\n"}cuidando?</Text>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        {elders.map((elder, index) => (
          <Elder
            key={index}
            name={elder.name}
            birthdate={elder.birthdate}
            bloodType={elder.bloodType}
            phone={elder.phone}
            description={elder.description}
            image={elder.image}
            onPress={() => navigation.navigate('ElderVisualization')}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.plusButton} onPress={() => navigation.navigate('ElderRegistration')}>
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
    top: 15,
    left: 5,
  },
  backButtonImage: {
    width: 43,
    height: 43,
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
  },
  plusText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 33,
    fontWeight: '400'
  },
});

export default ElderList;
