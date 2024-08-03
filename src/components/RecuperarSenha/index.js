import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./style";
import Icon from 'react-native-vector-icons/MaterialIcons';
import emailjs from 'emailjs-com';
import database from '../../db';
import { Q } from '@nozbe/watermelondb';


const sendEmail = (email, code) => {
    const templateParams = {
        to_email: email,
        verification_code: code,
    };
  
    emailjs.send('service_6g3ogk9', 'template_4am7eqm', templateParams, '3SMsRsRznGKJA1cFH')
      .then((response) => {
        console.log('Email enviado com sucesso:', response);
      })
      .catch((error) => {
        console.log('Erro ao enviar o e-mail:', error);
      });
  };

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

        const code = generateRandomCode();
        sendEmail(email, code);
        Alert.alert("E-mail enviado!", `Código de verificação: ${code}`);

//        console.log('Email:', email);
//        console.log('Generated Code:', code);

        navigation.navigate('VerificarCodigo', { email, code });
    };

    const generateRandomCode = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let code = '';
        
        for (let i = 0; i < 3; i++) {
            code += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        for (let i = 0; i < 3; i++) {
            code += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }

        return code;
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
