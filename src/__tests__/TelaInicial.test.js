import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TelaInicial from '../components/TelaInicial';

describe('TelaInicial', () => {
  it('renders correctly', () => {
    const { getByText } = render(<TelaInicial navigation={{ navigate: jest.fn() }} />);
    expect(getByText('Seja um GEROcuidador!')).toBeTruthy();
  });

  it('navigates to Login on button press', () => {
    const navigate = jest.fn();
    const { getByText } = render(<TelaInicial navigation={{ navigate }} />);

    fireEvent.press(getByText('Login'));
    expect(navigate).toHaveBeenCalledWith('Login');
  });

  it('navigates to TelaCadastro on button press', () => {
    const navigate = jest.fn();
    const { getByText } = render(<TelaInicial navigation={{ navigate }} />);

    fireEvent.press(getByText('Cadastre-se'));
    expect(navigate).toHaveBeenCalledWith('TelaCadastro');
  });
});
