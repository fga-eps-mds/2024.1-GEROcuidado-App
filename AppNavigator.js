import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import ScreenLogin from './src/screens/ScreenLogin';
import Register from './src/screens/Register';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial"
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TelaInicial" component={Home} />
        <Stack.Screen name="Login" component={ScreenLogin} />
        <Stack.Screen name="TelaCadastro" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
