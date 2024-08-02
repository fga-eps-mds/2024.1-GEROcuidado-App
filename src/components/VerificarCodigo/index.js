import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './style';

export default function VerifyCode({ route, navigation }) {
  const [code, setCode] = useState('');

  const handleVerifyCode = () => {
    // Lógica para verificar o código
    if (code === "123456") { // Exemplo: código estático obs: Tirar o comentário e colocar a lógica randomica do código  
      Alert.alert("Código verificado!", "Agora você pode redefinir sua senha.");
      navigation.navigate('RedefinirSenha'); // Redireciona para a tela de redefinição de senha
    } else {
      Alert.alert("Erro", "Código de verificação incorreto.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifique seu e-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Código de verificação"
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleVerifyCode}
      >
        <Text style={styles.buttonText}>Verificar</Text>
      </TouchableOpacity>
    </View>
  );
}
