import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image , Alert} from 'react-native';
import OptionProfile from '../../components/OptionProfile';

const Perfil = ({ navigation }) => {

  const handlePress = (message) => {
    console.log(message);
  };

  // Function para o botão de alerta ao clicar no logout
  const alertButton = () => {

    Alert.alert(
      
      // title
      'Tem certeza que deseja sair?',
      'Esta ação não poderá ser desfeita!',
      [
        // Botão de não
        { text: 'Não', onPress: () => { console.log('Não Pressionado'); } },
        // Botão de sim
        { text: 'Sim', onPress: () => navigation.navigate('Login') }
      ]
    )
  };

  return (
    <View style={styles.container}>

        <View style={styles.header}>
            <Image
            source={require('../../../assets/User.png')}
            style={styles.logo_caregiver}
            />
            <Text style={styles.helloMessage}>Olá, nome do usuário</Text>

            {/* Adição do logout button */}
            <View style={styles.logoutContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={alertButton}
            >
                <Image
                source={require('../../../assets/logout.png')}
                style={styles.LogoutImage}
                />
            </TouchableOpacity> 
            </View>
        </View>

        <View style={styles.optionWrapper}>
            <OptionProfile
            name="Perfil de Usuário"
            description="Edite sua conta"
            smallImage={require('../../../assets/engrenagem.png')} // Imagem do icone da engrenagem
            rightImage={require('../../../assets/Arrow.png')} // Imagem do arrow
            onPress={() => handlePress('Perfil')}
            style={styles.optionSpacing} // Adiciona espaçamento ao primeiro botão
            />
        </View>

        <View style={styles.optionWrapper}>
            <OptionProfile
            name="Gerenciar idosos"
            description="Visualize e edite seus idosos"
            smallImage={require('../../../assets/IconIdoso.png')} // Imagem do icone Idoso
            rightImage={require('../../../assets/Arrow.png')} // Imagem do arrow
            onPress={ () => navigation.navigate('ElderList')}
            style={styles.optionSpacing} // Adiciona espaçamento ao segundo botão
            />
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '20%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: "#2CCDB5",
  },
  logoutContainer: {
    position: 'absolute',
    right: 25,
    height: '20%',
    flexDirection: 'row',
    paddingLeft: 0,
  },
  logo_caregiver: {
    width: 65,
    height: 65,
    marginRight: 10,
    marginTop: 10,
  },
  helloMessage: {
    fontSize: 18,
    color: 'white',
  },
  optionSpacing: {
    marginTop: 40, // add espaçamento do primeiro botão
    marginBottom: -10, // Adiciona espaçamento ao segundo botão
  },
  optionWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: -20, // Espaço entre os botões
    marginTop: 20, // Espaço do topo
  },
  LogoutImage: {
    width: 35,
    height: 35,
  },
});

export default Perfil;