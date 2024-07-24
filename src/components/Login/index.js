import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import styles from "./style";
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const logo = require('../../../assets/logo_login_gerocuidado.png');

export default function Login() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={logo}
                    style={styles.image}
                />
            </View>
            <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
            
            <View style={styles.inputContainer}>
                <Icon name="email" size={20} color="#CCCCCC" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                />
            </View>
            
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#CCCCCC" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    secureTextEntry
                />
            </View>
  
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}
