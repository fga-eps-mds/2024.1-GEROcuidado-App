import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import database, { usersCollection } from '../db';
import { launchImageLibrary } from 'react-native-image-picker';
import { Q } from '@nozbe/watermelondb';

const UserEdit = ({ route, navigation }) => {
    const { user } = route.params;  // userId foi removido
    const [name, setName] = useState(user.nome);
    const [email, setEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [foto, setFoto] = useState(user.foto || '');
    const [senhaFeedback, setSenhaFeedback] = useState('');
    const [senhaFeedbackColor, setSenhaFeedbackColor] = useState('red');
    const [isPasswordStrong, setIsPasswordStrong] = useState(false);

    const checkPasswordStrength = (password) => {
        let feedback = '';
        let color = 'red';
        let strength = false;

        if (password.length >= 8) {
            if (/[A-Z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                feedback = 'Senha forte';
                color = styles.passwordStrength.color;
                strength = true;
            } else {
                feedback = 'Senha média. Reforce a senha usando letras maiúsculas e caracteres especiais Ex: !@#$%"*()';
                color = styles.mediumPassword.color;
                strength = true;
            }
        } else {
            feedback = 'Senha fraca! A senha deve ter pelo menos 8 caracteres!';
            color = 'red';
            strength = false;
        }

        setSenhaFeedback(feedback);
        setSenhaFeedbackColor(color);
        setIsPasswordStrong(strength);
    };

    const handleSave = async () => {
        if (!name) {
            Alert.alert("Erro", "Nome completo é obrigatório.");
            return;
        }

        if (newPassword && newPassword !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        if (newPassword && !isPasswordStrong) {
            Alert.alert("Erro", "A senha deve ser no mínimo média ou forte.");
            return;
        }

        try {
            await database.write(async () => {
                // Busca o usuário pelo e-mail
                const userToUpdate = await usersCollection.query(Q.where('email', email)).fetch();
                if (userToUpdate.length === 0) {
                    throw new Error("Usuário não encontrado");
                }

                await userToUpdate[0].update((user) => {
                    user.nome = name;
                    user.email = email;
                    user.foto = foto;
                    if (newPassword) {
                        user.senha = newPassword;
                    }
                });
            });

            Alert.alert("Sucesso", "Dados atualizados com sucesso.");
            navigation.goBack();
        } catch (error) {
            console.log(error);  // Para debugar o erro específico
            Alert.alert("Erro", "Não foi possível atualizar os dados.");
        }
    };

    const handleChoosePhoto = () => {
        launchImageLibrary({}, response => {
            if (response.assets && response.assets.length > 0) {
                setFoto(response.assets[0].uri);
            }
        });
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja apagar a conta?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Apagar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            // Buscando o usuário pelo e-mail
                            const userToDelete = await usersCollection.query(Q.where('email', email)).fetch();
                            if (userToDelete.length === 0) {
                                throw new Error("Usuário não encontrado");
                            }

                            await userToDelete[0].markAsDeleted();
                            await userToDelete[0].destroyPermanently();

                            Alert.alert("Sucesso", "Conta apagada com sucesso.");
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert("Erro", "Não foi possível apagar a conta.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/back_button.png')} style={styles.backButtonImage} />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                {foto ? (
                    <Image source={{ uri: foto }} style={styles.elderImage} />
                ) : (
                    <TouchableOpacity onPress={handleChoosePhoto} style={styles.photoButton}>
                        <Icon name="photo-camera" size={40} color="#333333" />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                    <Icon name="person" size={20} color="#333333" style={styles.iconUser} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nome completo"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Icon name="email" size={20} color="#333333" style={styles.iconUser} />
                    <TextInput
                        style={styles.input}
                        placeholder="email@exemplo.com"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Icon name="lock" size={20} color="#333333" style={styles.iconUser} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nova Senha"
                        value={newPassword}
                        secureTextEntry
                        onChangeText={text => {
                            setNewPassword(text);
                            checkPasswordStrength(text);
                        }}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Icon name="lock" size={20} color="#333333" style={styles.iconUser} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirme Senha"
                        value={confirmPassword}
                        secureTextEntry
                        onChangeText={setConfirmPassword}
                    />
                </View>

                <Text style={[styles.passwordStrength, { color: senhaFeedbackColor }]}>
                    {senhaFeedback}
                </Text>

                <TouchableOpacity
                    style={styles.buttonSalvar}
                    onPress={handleSave}
                >
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonExcluir}
                    onPress={handleDeleteAccount}
                >
                    <Text style={styles.cancelButtonText}>Apagar conta</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 32,
        justifyContent: 'space-between',
    },
    backButton: {
        marginTop: 10,
        width: 40,
        height: 40,
    },
    backButtonImage: {
        width: 40,
        height: 40,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    elderImage: {
        width: 150,
        height: 150,
        borderRadius: 5,
    },
    photoButton: {
        width: 150,
        height: 150,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        marginBottom: 10,
        marginTop: 30,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        flex: 1,
        paddingLeft: 40,
        paddingRight: 16,
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        borderRadius: 8,
    },
    buttonSalvar: {
        backgroundColor: '#2CCDB5',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center',
        width: '50%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonExcluir: {
        padding: 12,
        alignItems: 'center',
        marginTop: 12,
        alignSelf: 'center',
    },
    cancelButtonText: {
        color: 'red',
        fontSize: 16,
    },
    iconUser: {
        position: 'absolute',
        left: 10,
    },
    passwordStrength: {
        marginTop: 10,
        fontSize: 14,
    },
    mediumPassword: {
        color: 'orange',
    },
    passwordStrength: {
        color: 'green',
    },
});

export default UserEdit;
