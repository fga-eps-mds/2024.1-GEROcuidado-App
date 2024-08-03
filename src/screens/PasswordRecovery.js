import React from 'react';
import RedefinirSenha from '../components/RedefinirSenha';

export default function PasswordRecovery({ route, navigation }) {
    const { email } = route.params || {}; // Garantir que email é obtido da rota
    if (!email) {
        console.error('Email não encontrado nos parâmetros da rota');
    }

    return (
        <RedefinirSenha navigation={navigation} route={{ params: { email } }} />
    );
}