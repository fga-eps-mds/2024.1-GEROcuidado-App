import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Footer from '../components/Footer'; // Atualize o caminho conforme necessário

describe('Footer Component', () => {
  const mockOnPress = jest.fn();

  it('renders correctly with given props', () => {
    const { getByText, getByTestId } = render(<Footer onPress={mockOnPress} />);

    // Verifica se os textos são renderizados corretamente
    expect(getByText('Rotinas')).toBeTruthy();
    expect(getByText('Registros')).toBeTruthy();
    expect(getByText('Portal')).toBeTruthy();
    expect(getByText('Perfil')).toBeTruthy();

    // Verifica se as imagens são renderizadas corretamente
    expect(getByTestId('image-rotinas')).toBeTruthy();
    expect(getByTestId('image-registros')).toBeTruthy();
    expect(getByTestId('image-portal')).toBeTruthy();
    expect(getByTestId('image-perfil')).toBeTruthy();
  });

  it('calls onPress when Rotinas button is pressed', () => {
    const { getByTestId } = render(<Footer onPress={mockOnPress} />);

    fireEvent.press(getByTestId('button-rotinas'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('calls onPress when Registros button is pressed', () => {
    const { getByTestId } = render(<Footer onPress={mockOnPress} />);

    fireEvent.press(getByTestId('button-registros'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('calls onPress when Portal button is pressed', () => {
    const { getByTestId } = render(<Footer onPress={mockOnPress} />);

    fireEvent.press(getByTestId('button-portal'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('calls onPress when Perfil button is pressed', () => {
    const { getByTestId } = render(<Footer onPress={mockOnPress} />);

    fireEvent.press(getByTestId('button-perfil'));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
