// Mocks para dependências
jest.mock('@nozbe/watermelondb', () => {
    const actual = jest.requireActual('@nozbe/watermelondb');
  
    return {
      ...actual,
      tableSchema: jest.fn().mockImplementation(() => ({})),
      appSchema: jest.fn().mockImplementation(() => ({})),
      Q: {
        where: jest.fn(),
      },
    };
  });
  
  jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
  
  // Mocks para outras dependências
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
  
  import React from 'react';
  import { render, fireEvent, waitFor } from '@testing-library/react-native';
  import Login from '../components/Login';
  import { Alert } from 'react-native';
  
  // Mock do Alert para testes
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  
  describe('Login Component', () => {
    it('renders without crashing', () => {
      const { getByPlaceholderText, getByText } = render(<Login navigation={{ navigate: jest.fn() }} />);
      
      // Verifica se os elementos básicos estão sendo renderizados
      expect(getByPlaceholderText('Email')).toBeTruthy();
      expect(getByPlaceholderText('Senha')).toBeTruthy();
      expect(getByText('Entrar')).toBeTruthy();
    });
  
    it('shows alert if email or password is empty', async () => {
      const { getByText } = render(<Login navigation={{ navigate: jest.fn() }} />);
      fireEvent.press(getByText('Entrar'));
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Erro', 'Todos os campos são obrigatórios.');
      });
    });
  
    it('shows alert if user is not found', async () => {
      // Mock para o método query
      const userCollection = {
        query: jest.fn().mockReturnValue({
          fetch: jest.fn().mockResolvedValue([]),
        }),
      };
  
      jest.spyOn(require('../db').collections, 'get').mockReturnValue(userCollection);
  
      const { getByPlaceholderText, getByText } = render(<Login navigation={{ navigate: jest.fn() }} />);
      fireEvent.changeText(getByPlaceholderText('Email'), 'notfound@example.com');
      fireEvent.changeText(getByPlaceholderText('Senha'), 'password');
      fireEvent.press(getByText('Entrar'));
  
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Erro', 'Usuário não encontrado.');
      });
    });
  
    it('navigates to UserProfile on successful login', async () => {
      // Mock para o método query
      const userCollection = {
        query: jest.fn().mockReturnValue({
          fetch: jest.fn().mockResolvedValue([{ password: 'password' }]),
        }),
      };
  
      jest.spyOn(require('../db').collections, 'get').mockReturnValue(userCollection);
  
      const navigate = jest.fn();
      const { getByPlaceholderText, getByText } = render(<Login navigation={{ navigate }} />);
      fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
      fireEvent.changeText(getByPlaceholderText('Senha'), 'password');
      fireEvent.press(getByText('Entrar'));
  
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Sucesso', 'Login realizado com sucesso.');
        expect(navigate).toHaveBeenCalledWith('UserProfile', { user: { password: 'password' } });
      });
    });
  });
  