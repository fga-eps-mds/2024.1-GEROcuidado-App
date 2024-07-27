import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./style";
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '../../db';

const logo = require('../../../assets/logo_login_gerocuidado.png');

export default function TelaCadastro({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    
    const [nomeError, setNomeError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [confirmEmailError, setConfirmEmailError] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const [confirmSenhaError, setConfirmSenhaError] = useState('');

    const createUser = async () => {
        await database.write(async () => {
            try {
                const newUser = await database.collections.get('users').create(user => {
                    user.name = nome;
                    user.email = email;
                    user.password = senha;
                    user.created_at = new Date().toISOString();
                    user.updated_at = new Date().toISOString();
                });

                console.log('Usuário criado com sucesso!');

                const savedUser = await database.collections.get('users').find(newUser.id);
                if (savedUser) {
                    console.log('Usuário salvo:', savedUser);
                    Alert.alert("Sucesso", "Usuário cadastrado com sucesso.");
                    resetForm();
                    navigation.navigate('Login');
                } else {
                    console.error("Erro: o usuário não foi encontrado após a criação.");
                    Alert.alert("Erro", "O usuário não foi encontrado após o cadastro.");
                }
            } catch (error) {
                console.error("Erro ao criar usuário:", error);
                Alert.alert("Erro", "Houve um erro ao criar o usuário.");
            }
        });
    };

    const resetForm = () => {
        setNome('');
        setEmail('');
        setConfirmEmail('');
        setSenha('');
        setConfirmSenha('');
        setNomeError('');
        setEmailError('');
        setConfirmEmailError('');
        setSenhaError('');
        setConfirmSenhaError('');
    };

    const handleCadastro = () => {
        let valid = true;
        
        if (!nome) {
            setNomeError("Nome é obrigatório.");
            valid = false;
        } else {
            setNomeError("");
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError("Email é obrigatório.");
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Digite um email válido.");
            valid = false;
        } else {
            setEmailError("");
        }
        
        if (email !== confirmEmail) {
            setConfirmEmailError("Os e-mails não correspondem.");
            valid = false;
        } else {
            setConfirmEmailError("");
        }
        
        if (senha.length < 8) {
            setSenhaError("A senha deve ter pelo menos 8 caracteres.");
            valid = false;
        } else {
            setSenhaError("");
        }
        
        if (senha !== confirmSenha) {
            setConfirmSenhaError("As senhas não correspondem.");
            valid = false;
        } else {
            setConfirmSenhaError("");
        }
        
        if (valid) {
            createUser();
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('TelaInicial')}>
                <Image source={require('../../../assets/back_button.png')} style={styles.backButtonImage} />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image source={logo} style={styles.image} />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="person" size={20} color="#333333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    keyboardType="default"
                    value={nome}
                    onChangeText={setNome}
                />
            </View>
            {nomeError ? <Text style={styles.errorText}>{nomeError}</Text> : null}

            <View style={styles.inputContainer}>
                <Icon name="email" size={20} color="#333333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <View style={styles.inputContainer}>
                <Icon name="email" size={20} color="#333333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirme seu e-mail"
                    keyboardType="email-address"
                    value={confirmEmail}
                    onChangeText={setConfirmEmail}
                />
            </View>
            {confirmEmailError ? <Text style={styles.errorText}>{confirmEmailError}</Text> : null}

            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#333333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />
            </View>
            {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}

            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#333333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirme sua senha"
                    secureTextEntry
                    value={confirmSenha}
                    onChangeText={setConfirmSenha}
                />
            </View>
            {confirmSenhaError ? <Text style={styles.errorText}>{confirmSenhaError}</Text> : null}

            <TouchableOpacity
                style={styles.button}
                onPress={handleCadastro}
            >
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}