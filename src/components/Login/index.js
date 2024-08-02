import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert, Pressable } from "react-native";
import styles from "./style";
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '../../db';
import { Q } from '@nozbe/watermelondb';

const logo = require('../../../assets/logo_login_gerocuidado.png');

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        if (!email || !senha) {
            Alert.alert("Erro", "Todos os campos são obrigatórios.");
            return;
        }

        try {
            const userCollection = database.collections.get('users');
            const users = await userCollection.query(Q.where('email', email)).fetch();

            if (users.length > 0) {
                const user = users[0];

                const isPasswordValid = user.senha === senha;

                if (isPasswordValid) {
                    Alert.alert("Sucesso", "Login realizado com sucesso.");
                    navigation.navigate('UserProfile', { user });
                } else {
                    Alert.alert("Erro", "Senha incorreta.");
                }
            } else {
                Alert.alert("Erro", "Usuário não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao tentar logar:", error);
            Alert.alert("Erro", "Houve um erro ao tentar logar.");
        }
    };

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
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#333333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />
            </View>
            <View style={styles.recover}>
                <Pressable onPress={() => navigation.navigate('RecuperarSenha')}>
                    <Text style={styles.recoverText}>Esqueci minha senha</Text>
                </Pressable>
            </View>
  
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}
