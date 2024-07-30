import React from 'react';
import { render } from '@testing-library/react-native';
import TelaCadastro from '../components/TelaCadastro'; 

jest.mock('../db', () => ({
  collections: {
    get: jest.fn().mockReturnValue({
      create: jest.fn(),
      find: jest.fn(),
      query: jest.fn().mockReturnValue({
        fetch: jest.fn(),
      }),
    }),
  },
}));

jest.mock('@nozbe/watermelondb', () => ({
  Q: {
    where: jest.fn(),
  },
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Mock do React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('TelaCadastro Component', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText, getByText } = render(<TelaCadastro />);
    
    // Verifica se os elementos básicos estão sendo renderizados
    expect(getByPlaceholderText('Nome completo')).toBeTruthy();
    expect(getByPlaceholderText('Digite seu e-mail')).toBeTruthy();
    expect(getByText('Cadastrar')).toBeTruthy();
  });
});
