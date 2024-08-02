import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./style";
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '../../db'; // Importe o banco de dados
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

        // Verificação de formato de e-mail
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            Alert.alert("Erro", "Por favor, insira um e-mail válido.");
            return;
        }

        try {
            const userCollection = database.collections.get('users');
            const users = await userCollection.query(Q.where('email', email)).fetch();

            if (users.length > 0) {
                // Aqui você pode adicionar a lógica para enviar o e-mail de redefinição de senha
                Alert.alert("E-mail enviado!", "Verifique sua caixa de entrada.");
            } else {
                Alert.alert("Erro", "E-mail não cadastrado.");
            }
        } catch (error) {
            console.error("Erro ao tentar enviar e-mail de recuperação:", error);
            Alert.alert("Erro", "Houve um erro ao tentar enviar o e-mail de recuperação.");
        }
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
