import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons'

// Novos
import Perfil from '../screens/tabBar/Perfil';
import Portal from '../screens/tabBar/Portal';
import Registro from '../screens/tabBar/Registro';
import Rotina from '../screens/tabBar/Rotina';

const Tab = createBottomTabNavigator();

function TabBarRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#ffff',
                tabBarInactiveTintColor: '#D3D3D3',
                tabBarShowLabel: true,
                tabBarStyle:{
                    position: 'absolute',
                    backgroundColor: '#2CCDB5',
                    borderTopWidth: 0,
                    bottom: 0,
                    left: 1,
                    right: 1,
                    elevation: 2,
                    borderRadius: 5,
                }
            }}
        >
            <Tab.Screen
                name="Rotinas"
                component={Rotina}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {
                        if(focused){
                            return <Ionicons name="calendar" size={size} color={color}  />
                        }
                        return <Ionicons name="calendar-outline" size={size} color={color}  />
                    }
                }}
            />
            
            <Tab.Screen
                name="Registros"
                component={Registro}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {
                        if(focused){
                            return <Ionicons name="heart" size={size} color={color}  />
                        }
                        return <Ionicons name="heart-outline" size={size} color={color}  />
                    }
                }}
            />

            <Tab.Screen
                name="Portal"
                component={Portal}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {
                        if(focused){
                            return <Ionicons name="chatbubbles" size={size} color={color}  />
                        }
                        return <Ionicons name="chatbubbles" size={size} color={color}  />
                    }
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {
                        if(focused){
                            return <Ionicons name="person" size={size} color={color}  />
                        }
                        return <Ionicons name="person-outline" size={size} color={color}  />
                    }
                }}
            />
        </Tab.Navigator>
    );
}

export default TabBarRoutes;
