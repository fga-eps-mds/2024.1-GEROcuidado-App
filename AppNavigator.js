import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './src/screens/UserProfile';
import ElderList from './src/screens/ElderList';
import ElderRegistration from './src/screens/ElderRegistration';
import ElderVisualization from './src/screens/ElderVisualization';
import ElderEdit from './src/screens/ElderEdit';
import Home from './src/screens/Home';
import ScreenLogin from './src/screens/ScreenLogin';
import Register from './src/screens/Register';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="TelaInicial"
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TelaInicial" component={Home} />
        <Stack.Screen name="Login" component={ScreenLogin} />
        <Stack.Screen name="TelaCadastro" component={Register} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ElderList">
          {props => <ElderList {...props} elders={elders} />}
        </Stack.Screen>
        <Stack.Screen name="ElderRegistration" component={ElderRegistration} />
        <Stack.Screen name="ElderVisualization" component={ElderVisualization} />
        <Stack.Screen name="ElderEdit" component={ElderEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;