import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';

const Login = () => {
  
  const handleLogin = ({ navigation }) => {
    console.log('Login button pressed');
    // navigation.navigate('NextPage'); TO-DO: Substituir'NextPage' pelo nome da página para a qual você deseja navegar
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.containerUm}>
        <Image
          source={require('../../assets/logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Seja um GEROcuidador!</Text>
      </View>
      <View style={styles.containerDois}>
        <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleLogin}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  containerUm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerDois: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 270,
    height: 270,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: "5%",
    marginBottom: -40,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    margimTop: -20,
  },
  button: {
    flexDirection: 'row', 
    height: 51,
    width: "65%",
    backgroundColor: '#2CCDB5',
    alignItems: 'center',
    justifyContent: 'center', 
    elevation: 3,
    borderRadius: 20
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    color: "#ffff",
  },
});

export default Login