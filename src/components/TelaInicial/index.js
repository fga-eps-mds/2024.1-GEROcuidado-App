import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

const logo = require('../../../assets/logo_gerocuidado.png');

export default function TelaInicial({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={logo}
          style={styles.image}
        />
      </View>
      <Text style={styles.textCuidador}>Seja um GEROcuidador!</Text>

      <TouchableOpacity style={styles.greenButton}>
        <Text style={styles.textButton}>Acesse o Fórum</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.greenButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.textButton}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.purpleButton}>
        <Text style={styles.textButton}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
