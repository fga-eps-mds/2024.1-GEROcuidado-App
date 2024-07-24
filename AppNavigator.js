import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from './src/components/TelaInicial'; // ajuste o caminho conforme necessário
import Login from './src/components/Login'; // ajuste o caminho conforme necessário

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial"
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
