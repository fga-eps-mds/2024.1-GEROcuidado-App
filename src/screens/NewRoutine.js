import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const NewRoutine = ({ navigation, route }) => {
    const { user } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('TabBarRoutes', { user })}>
                    <Image source={require('../../assets/back_button.png')} style={styles.backButtonImage} />
                </TouchableOpacity>
                <Text style={styles.helloMessage}>Nova Rotina</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        height: 100,
        width: '100%',
        alignItems: 'center',
        paddingLeft: 20,
        backgroundColor: "#2CCDB5",
        flexDirection: 'row',
    },
    backButton: {
        marginRight: 10,
    },
    backButtonImage: {
        width: 30,
        height: 30,
    },
    helloMessage: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default NewRoutine;