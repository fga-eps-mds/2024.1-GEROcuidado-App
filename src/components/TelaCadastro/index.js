import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
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
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');

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
                } else {
                    console.error("Erro: o usuário não foi encontrado após a criação.");
                    Alert.alert("Erro", "O usuário não foi encontrado após o cadastro.");
                }

                navigation.navigate('Login');
            } catch (error) {
                console.error("Erro ao criar usuário:", error);
                Alert.alert("Erro", "Houve um erro ao criar o usuário.");
            }
        });
    }

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

        // Chamar a função de criação de usuário
        createUser();
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
                <Icon name="person" size={20} color="#CCCCCC" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    keyboardType="default"
                    value={nome}
                    onChangeText={setNome}
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
                    value={confirmSenha}
                    onChangeText={setConfirmSenha}
                />
            </View>            
  
            <TouchableOpacity
                style={styles.button}
                onPress={handleCadastro}
                style={styles.button}
                onPress={handleCadastro}
            >
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}

