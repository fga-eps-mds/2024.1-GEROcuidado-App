import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./style";
import Icon from 'react-native-vector-icons/MaterialIcons';

const logo = require('../../../assets/logo_login_gerocuidado.png');

export default function TelaCadastro({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');

    const handleCadastro = () => {
        if (!nome || !email || !confirmEmail || !senha || !confirmSenha) {
            Alert.alert("Erro", "Todos os campos são obrigatórios.");
            return;
        }
        if (email !== confirmEmail) {
            Alert.alert("Erro", "Os e-mails não correspondem.");
            return;
        }
        if (senha.length < 8) {
            Alert.alert("Erro", "A senha deve ter pelo menos 8 caracteres.");
            return;
        }
        if (senha !== confirmSenha) {
            Alert.alert("Erro", "As senhas não correspondem.");
            return;
        }

        // Navegar para a próxima tela após a validação bem-sucedida
        navigation.navigate('Login');
    };

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
                    value={nome}
                    onChangeText={setNome}
                />
            </View> 
            
            <View style={styles.inputContainer}>
                <Icon name="email" size={20} color="#CCCCCC" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="email" size={20} color="#CCCCCC" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirme seu e-mail"
                    keyboardType="email-address"
                    value={confirmEmail}
                    onChangeText={setConfirmEmail}
                />
            </View>            
            
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#CCCCCC" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#CCCCCC" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirme sua senha"
                    secureTextEntry
                    value={confirmSenha}
                    onChangeText={setConfirmSenha}
                />
            </View>            
  
            <TouchableOpacity
                style={styles.button}
                onPress={handleCadastro}
            >
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}
