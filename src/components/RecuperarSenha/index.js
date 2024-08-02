import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./style";
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '../../db';
import { Q } from '@nozbe/watermelondb';

export default function RecuperarSenha({ navigation }) {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    const handleRecuperarSenha = async () => {
        if (!email || !confirmEmail) {
            Alert.alert("Erro", "Todos os campos são obrigatórios.");
            return;
        }

        if (email !== confirmEmail) {
            Alert.alert("Erro", "Os e-mails não são iguais.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            Alert.alert("Erro", "Por favor, insira um e-mail válido.");
            return;
        }

        Alert.alert("E-mail enviado! Verifique sua caixa de entrada");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
                <Image source={require('../../../assets/back_button.png')} style={styles.backButtonImage} />
            </TouchableOpacity>
            <Text style={styles.welcomeText}>Insira seu e-mail</Text>
            <View style={styles.instructionsContainer}>
                <Image source={require('../../../assets/Help_icon.png')} style={styles.instructionsIcon} />
                <Text style={styles.instructionsText}>Confirme seu e-mail para que possamos lhe enviar um link para redefinir sua senha</Text>
            </View>
            
            <View style={styles.inputContainer}>
                <Icon name="email" size={20} color="#333333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="email" size={20} color="#333333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirme seu Email"
                    keyboardType="email-address"
                    value={confirmEmail}
                    onChangeText={setConfirmEmail}
                />
            </View>
  
            <TouchableOpacity
                style={styles.button}
                onPress={handleRecuperarSenha}
            >
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}
