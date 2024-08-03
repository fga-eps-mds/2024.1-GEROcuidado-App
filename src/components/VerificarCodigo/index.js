import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './style';

export default function VerificarCodigo({ navigation, route }) {
  const [code, setCode] = useState('');
  const { email, code: generatedCode } = route.params || {};

//  console.log('Received Email:', email);
 console.log('Received Generated Code:', generatedCode);

  const handleVerifyCode = () => {
    if (code === generatedCode) { 
      Alert.alert("Código verificado!", "Agora você pode redefinir sua senha.");
      navigation.navigate('RedefinirSenha', { email });
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
        keyboardType="email-address"
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
