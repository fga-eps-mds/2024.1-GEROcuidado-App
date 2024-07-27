import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from './src/components/TelaInicial'; 
import Login from './src/components/Login';
import TelaCadastro from './src/components/TelaCadastro';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial"
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
