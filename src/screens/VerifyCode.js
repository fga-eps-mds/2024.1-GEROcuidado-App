import React from 'react';
import VerificarCodigo from '../components/VerificarCodigo'

export default function VerifyCode({ route, navigation })  {
    const { email } = route.params
    return (<VerificarCodigo navigation={navigation} />)

}