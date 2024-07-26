import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import styles from "./style";
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const logo = require('../../../assets/logo_login_gerocuidado.png');

export default function TelaCadastro({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={logo}
                    style={styles.image}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="person" size={20} color="#CCCCCC" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    keyboardType="default"
                />
            </View> 
            
            <View style={styles.inputContainer}>
                <Icon name="email" size={20} color="#CCCCCC" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="email" size={20} color="#CCCCCC" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirme seu e-mail"
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

            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#CCCCCC" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirme sua senha"
                    secureTextEntry
                />
            </View>            
  
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TelaCadastro')}
            >
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}