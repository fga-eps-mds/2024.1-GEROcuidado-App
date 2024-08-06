import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./style";
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import database from '../../db';
import { Q } from '@nozbe/watermelondb';


export default function RedefinirSenha({ navigation, route }) {
    const [email, setEmail] = useState(route.params?.email || '');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [senhaFeedback, setSenhaFeedback] = useState('');
    const [senhaFeedbackColor, setSenhaFeedbackColor] = useState('red');
    const [senhaCompatibilidadeError, setSenhaCompatibilidadeError] = useState('');

//    console.log('ReDEFINIR Email:', email);

    const handleRedefinirSenha = async () => {
        if (!senha || !confirmSenha) {
            Alert.alert("Erro", "Todos os campos são obrigatórios.");
            return;
        }

        if (senha !== confirmSenha) {
            Alert.alert("Erro", "As senhas não são iguais.");
            return;
        }

        if (senhaFeedback === 'Senha fraca! A senha deve ter pelo menos 8 caracteres!') {
            Alert.alert("Erro", "A senha é fraca. Por favor, crie uma senha mais forte.");
            return;
        }

        try {
            await database.write(async () => {
                const users = await database.collections.get('users').query(Q.where('email', email)).fetch();
                if (users.length > 0) {
                    const user = users[0];
                    await user.update(user => {
                        user.senha = senha;
                    });

                    Alert.alert("Senha redefinida com sucesso!");
                    navigation.navigate('Login');
                } else {
                    Alert.alert("Erro", "Usuário não encontrado.");
                }
            });
        } catch (error) {
            console.error("Erro ao atualizar a senha:", error);
            Alert.alert("Erro", "Erro ao atualizar a senha.");
        }
    };

    const checkPasswordStrength = (password) => {
        let feedback = '';
        let color = 'red';

        if (password.length >= 8) {
            if (/[A-Z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                feedback = 'Senha forte';
                color = 'darkgreen';
            } else {
                feedback = 'Senha média. Reforce a senha usando letras maiúsculas e caracteres especiais Ex: !@#$%"*()';
                color = '#f2c037';
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

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
                <Image source={require('../../../assets/back_button.png')} style={styles.backButtonImage} />
            </TouchableOpacity>
            <Text style={styles.welcomeText}>Redefinir Senha</Text>
            <View style={styles.instructionsContainer}>
                <Image source={require('../../../assets/Help_icon.png')} style={styles.instructionsIcon} />
                <Text style={styles.instructionsText}>Crie uma senha forte, por questão de segurança, ela deve ter pelo menos 8 caracteres.</Text>
            </View>
            
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#333333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nova senha"
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={(text) => {
                        setSenha(text);
                        checkPasswordStrength(text);
                        checkPasswordCompatibility(text, confirmSenha);
                    }}
                />
            </View>
            <Text style={{ color: senhaFeedbackColor }}>{senhaFeedback}</Text>

            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#333333" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirme sua nova senha"
                    secureTextEntry={true}
                    value={confirmSenha}
                    onChangeText={(text) => {
                        setConfirmSenha(text);
                        checkPasswordCompatibility(senha, text);
                    }}
                />
            </View>
            {senhaCompatibilidadeError ? <Text style={{ color: 'red' }}>{senhaCompatibilidadeError}</Text> : null}
  
            <TouchableOpacity
                style={styles.button}
                onPress={handleRedefinirSenha}
            >
                <Text style={styles.buttonText}>Redefinir Senha</Text>
            </TouchableOpacity>
        </View>
    );
}