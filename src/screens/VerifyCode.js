import React from 'react';
import VerificarCodigo from '../components/VerificarCodigo'

export default function VerifyCode({ route, navigation }) {
    const { email } = route.params || {}; // Garantir que params não é undefined
    const { code: generatedCode } = route.params || {}; 
    return (<VerificarCodigo navigation={navigation} route={{ params: { email, code: generatedCode } }} />);

}