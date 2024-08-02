import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '../../db';
import { Q } from '@nozbe/watermelondb';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from "./style";

export default function TelaCadastro({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [admin, setAdmin] = useState(false);
    const [foto, setFoto] = useState('');

    const [nomeError, setNomeError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [confirmEmailError, setConfirmEmailError] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const [confirmSenhaError, setConfirmSenhaError] = useState('');
    const [senhaFeedback, setSenhaFeedback] = useState('');
    const [senhaFeedbackColor, setSenhaFeedbackColor] = useState('');
    const [senhaCompatibilidadeError, setSenhaCompatibilidadeError] = useState('');

    const createUser = async () => {
        await database.write(async () => {
            try {
                const newUser = await database.collections.get('users').create(user => {
                    user.nome = nome;
                    user.email = email;
                    user.senha = senha;
                    user.admin = admin;
                    user.foto = foto;
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
        setAdmin(false);
        setFoto('');
        setNomeError('');
        setEmailError('');
        setConfirmEmailError('');
        setSenhaError('');
        setConfirmSenhaError('');
        setSenhaFeedback('');
        setSenhaFeedbackColor('');
        setSenhaCompatibilidadeError('');
    };

    const handleCadastro = async () => {
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
            const users = await database.collections.get('users').query(Q.where('email', email)).fetch();
            if(users.length > 0){
                Alert.alert("Erro", "Já existe um usuário cadastrado com esse email.");
            } else {
                createUser();
            }
        }
    };

    const checkPasswordStrength = (password) => {
        let feedback = '';
        let color = 'red';

        if (password.length >= 8) {
            if (/[A-Z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                feedback = 'Senha forte';
                color = styles.passwordStrength.color;
            } else {
                feedback = 'Senha média. Reforce a senha usando letras maiúsculas e caracteres especiais Ex: !@#$%"*()';
                color = styles.mediumPassword.color;
            }
        } else {
            feedback = 'Senha fraca! A senha deve ter pelo menos 8 caracteres!';
            color = 'red';
        }

        setSenhaFeedback(feedback);
        setSenhaFeedbackColor(color);
    };

    const checkPasswordCompatibility = (password, confirmPassword) => {
        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                setSenhaCompatibilidadeError("As senhas não correspondem.");
            } else {
                setSenhaCompatibilidadeError('');
            }
        } else {
            setSenhaCompatibilidadeError('');
        }
    };

    const handleChoosePhoto = () => {
        launchImageLibrary({}, response => {
            if (response.assets && response.assets.length > 0) {
                setFoto(response.assets[0].uri);
            }
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('TelaInicial')}>
                <Image source={require('../../../assets/back_button.png')} style={styles.backButtonImage} />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                {foto ? (
                    <Image source={{ uri: foto }} style={styles.profileImage} />
                ) : (
                    <TouchableOpacity onPress={handleChoosePhoto} style={styles.photoButton}>
                        <Icon name="photo-camera" size={40} color="#333333" />
                    </TouchableOpacity>
                )}
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
            {nomeError ? <Text style={[styles.messageText, styles.errorText]}>{nomeError}</Text> : null}

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
            {emailError ? <Text style={[styles.messageText, styles.errorText]}>{emailError}</Text> : null}

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
            {confirmEmailError ? <Text style={[styles.messageText, styles.errorText]}>{confirmEmailError}</Text> : null}

            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#333333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={(text) => {
                        setSenha(text);
                        checkPasswordStrength(text);
                        checkPasswordCompatibility(text, confirmSenha);
                    }}
                />
            </View>
            {senha.length > 0 && senhaFeedback ? (
                <Text style={[styles.messageText, { color: senhaFeedbackColor }]}>
                    {senhaFeedback}
                </Text>
            ) : null}
            {senhaError ? <Text style={[styles.messageText, styles.errorText]}>{senhaError}</Text> : null}

            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#333333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirme sua senha"
                    secureTextEntry
                    value={confirmSenha}
                    onChangeText={(text) => {
                        setConfirmSenha(text);
                        checkPasswordCompatibility(senha, text);
                    }}
                />
            </View>
            {confirmSenha.length > 0 && senhaCompatibilidadeError ? (
                <Text style={[styles.messageText, styles.errorText]}>
                    {senhaCompatibilidadeError}
                </Text>
            ) : null}
            {confirmSenhaError ? <Text style={[styles.messageText, styles.errorText]}>{confirmSenhaError}</Text> : null}

            <TouchableOpacity
                style={styles.button}
                onPress={handleCadastro}
            >
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}
