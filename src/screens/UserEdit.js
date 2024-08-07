import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import database, { usersCollection } from '../db';
import { launchImageLibrary } from 'react-native-image-picker';

const UserEdit = ({ route, navigation }) => {
    const { user } = route.params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = async () => {
        if (!name) {
            Alert.alert("Erro", "Nome completo é obrigatório.");
            return;
        }

        if (newPassword && newPassword !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        try {
            const { userId } = route.params;
            const user = await usersCollection.find(userId);
            await user.update((usr) => {
                usr.name = name;
                if (newPassword) {
                    usr.password = newPassword;
                }
                usr.updated_at = Date.now();
            });

            Alert.alert("Sucesso", "Dados atualizados com sucesso.");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível atualizar os dados.");
        }
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
                            const { userId } = route.params;
                            const user = await usersCollection.find(userId);
                            await user.markAsDeleted();
                            await user.destroyPermanently();

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
                        onChangeText={setNewPassword}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Icon name="lock" size={20} color="#333333" style={styles.iconUser} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirme sua Senha"
                        value={confirmPassword}
                        secureTextEntry
                        onChangeText={setConfirmPassword}
                    />
                </View>
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
});

export default UserEdit;
