import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import UserProfile from './src/screens/UserProfile';
import ElderList from './src/screens/ElderList';
import ElderRegistration from './src/screens/ElderRegistration';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const elders = [
    {
      name: 'Elder 1',
      birthdate: '01/01/1950',
      bloodType: 'O+',
      phone: '123-456-7890',
      description: 'Description for Elder 1',
      image: require('./assets/elders/elder_1.png'),
    },
    {
      name: 'Elder 2',
      birthdate: '02/02/1950',
      bloodType: 'A-',
      phone: '234-567-8901',
      description: 'Description for Elder 2',
      image: require('./assets/elders/elder_2.png'),
    },
    {
      name: 'Elder 1',
      birthdate: '01/01/1950',
      bloodType: 'O+',
      phone: '123-456-7890',
      description: 'Description for Elder 1',
      image: require('./assets/elders/elder_1.png'),
    },
    {
      name: 'Elder 2',
      birthdate: '02/02/1950',
      bloodType: 'A-',
      phone: '234-567-8901',
      description: 'Description for Elder 2',
      image: require('./assets/elders/elder_2.png'),
    },
    {
      name: 'Elder 2',
      birthdate: '02/02/1950',
      bloodType: 'A-',
      phone: '234-567-8901',
      description: 'Description for Elder 2',
      image: require('./assets/elders/elder_2.png'),
    },
    {
      name: 'Elder 1',
      birthdate: '01/01/1950',
      bloodType: 'O+',
      phone: '123-456-7890',
      description: 'Description for Elder 1',
      image: require('./assets/elders/elder_1.png'),
    },
    {
      name: 'Elder 2',
      birthdate: '02/02/1950',
      bloodType: 'A-',
      phone: '234-567-8901',
      description: 'Description for Elder 2',
      image: require('./assets/elders/elder_2.png'),
    },
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserProfile"
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ElderList">
          {props => <ElderList {...props} elders={elders} />}
        </Stack.Screen>
        <Stack.Screen name="ElderRegistration" component={ElderRegistration} />
        <Stack.Screen name="ElderVisualization" component={ElderRegistration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;