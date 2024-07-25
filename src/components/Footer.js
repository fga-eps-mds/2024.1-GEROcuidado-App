import React from 'react';
import { View, Text, Image,StyleSheet, TouchableOpacity } from 'react-native';

const Footer = ({onPress}) => {
  return (
    <View style={styles.footer}>

       <TouchableOpacity style={[styles.footerButton]} onPress={onPress}>
            <Text style={styles.footerText}>Rotinas</Text>
            <Image
              source={require('../../assets/footer/calendar.png')}
              style={styles.RotinaImageFooter}
            />
       </TouchableOpacity>

        <TouchableOpacity style={[styles.footerButton]} onPress={onPress}>
            <Text style={styles.footerText}>Registros</Text>
            <Image
                source={require('../../assets/footer/registro.png')}
                style={styles.RegistroImageFooter}
            />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.footerButton]} onPress={onPress}>
            <Text style={styles.footerText}>Portal</Text>
            <Image
                source={require('../../assets/footer/portal.png')}
                style={styles.PortalImageFooter}
            />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.footerButton]} onPress={onPress}>
            <Text style={styles.footerText}>Perfil</Text>
            <Image
                source={require('../../assets/footer/user.png')}
                style={styles.PerfilImageFooter}
            />
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
    footer: {
      position: 'absolute', // posicao absolute
      bottom: 0,
      width: '100%', // largura
      height: 56, // altura do footer
      backgroundColor: '#2CCDB5',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    footerButton: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column-reverse', // posiciona de cima pra baixo
    },
    RotinaImageFooter: {
      width: 22,
      height: 22,
    },
    PortalImageFooter: {
      width: 19,
      height: 19,
    },
    RegistroImageFooter: {
      width: 20.9,
      height: 18.23,
    },
    PerfilImageFooter: {
      width: 23,
      height: 23,
    },
    footerText: {
      color: 'white',
      fontSize: 12,
      marginTop: 3,
      textAlign: 'center',
    },
  });

export default Footer;