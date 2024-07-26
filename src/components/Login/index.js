import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import styles from "./style";
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const logo = require('../../../assets/logo_login_gerocuidado.png');

export default function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('TelaInicial')}>
                    <Image source={require('../../../assets/back_button.png')} style={styles.backButtonImage} />
                  </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image
                    source={logo}
                    style={styles.image}
                />
            </View>
            <Text style={styles.welcomeText}>Bem Vindo de volta!</Text>
            
            <View style={styles.inputContainer}>
                <Icon name="email" size={20} color="#333333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                />
            </View>
            
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#333333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry
                />
            </View>
  
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TelaInicial')}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}
