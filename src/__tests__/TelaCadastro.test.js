import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TelaCadastro from '../components/TelaCadastro'; 
import { Alert } from 'react-native';


jest.mock('../db', () => ({
  write: jest.fn().mockImplementation(async (callback) => {
    await callback(); 
  }),
  collections: {
    get: jest.fn().mockReturnValue({
      create: jest.fn().mockResolvedValue({
        id: 'mock-id', 
      }),
      find: jest.fn().mockResolvedValue({
        id: 'mock-id',
      }),
      query: jest.fn().mockReturnValue({
        fetch: jest.fn().mockResolvedValue([]), 
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


jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('TelaCadastro Component', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText, getByText } = render(<TelaCadastro />);
    
    expect(getByPlaceholderText('Nome completo')).toBeTruthy();
    expect(getByPlaceholderText('Digite seu e-mail')).toBeTruthy();
    expect(getByPlaceholderText('Confirme seu e-mail')).toBeTruthy();
    expect(getByPlaceholderText('Digite sua senha')).toBeTruthy();
    expect(getByPlaceholderText('Confirme sua senha')).toBeTruthy();
    expect(getByText('Cadastrar')).toBeTruthy();
  });

  it('validates form inputs and shows errors', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(<TelaCadastro />);

    fireEvent.changeText(getByPlaceholderText('Nome completo'), '');
    fireEvent.changeText(getByPlaceholderText('Digite seu e-mail'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Confirme seu e-mail'), 'another-email');
    fireEvent.changeText(getByPlaceholderText('Digite sua senha'), 'short');
    fireEvent.changeText(getByPlaceholderText('Confirme sua senha'), 'different');

    fireEvent.press(getByText('Cadastrar'));

    await waitFor(() => {
      expect(findByText('Nome é obrigatório.')).toBeTruthy();
      expect(findByText('Digite um email válido.')).toBeTruthy();
      expect(findByText('Os e-mails não correspondem.')).toBeTruthy();
      expect(findByText('Senha fraca! A senha deve ter pelo menos 8 caracteres!')).toBeTruthy();
      expect(findByText('As senhas não correspondem.')).toBeTruthy();
    });
  });

  it('calls createUser on successful validation and navigates to Login', async () => {
    const mockNavigate = jest.fn();
    const { getByPlaceholderText, getByText } = render(<TelaCadastro navigation={{ navigate: mockNavigate }} />);

    fireEvent.changeText(getByPlaceholderText('Nome completo'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Digite seu e-mail'), 'john.doe@example.com');
    fireEvent.changeText(getByPlaceholderText('Confirme seu e-mail'), 'john.doe@example.com');
    fireEvent.changeText(getByPlaceholderText('Digite sua senha'), 'StrongPass123!');
    fireEvent.changeText(getByPlaceholderText('Confirme sua senha'), 'StrongPass123!');

    jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    fireEvent.press(getByText('Cadastrar'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Sucesso", "Usuário cadastrado com sucesso.");
      expect(mockNavigate).toHaveBeenCalledWith('Login');
    });
  });
});
