import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Elder from '../components/Elder'; 

describe('Elder Component', () => {
  const mockOnPress = jest.fn();
  const mockOnEdit = jest.fn();

  const defaultProps = {
    name: 'John Doe',
    birthdate: '01/01/1950',
    bloodType: 'O+',
    phone: '123-456-7890',
    description: 'Test Description',
    image: require('../../assets/logo.png'), // fiz com a imagem do logo
    onPress: mockOnPress,
    onEdit: mockOnEdit,
  };

  it('renders correctly with given props', () => {
    const { getByText, getByTestId } = render(<Elder {...defaultProps} />);

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByTestId('elder-image')).toBeTruthy();
    expect(getByTestId('edit-button')).toBeTruthy();
  });

  it('calls onPress when image is pressed', () => {
    const { getByTestId } = render(<Elder {...defaultProps} />);

    fireEvent.press(getByTestId('elder-image-container'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('calls onEdit when edit button is pressed', () => {
    const { getByTestId } = render(<Elder {...defaultProps} />);

    fireEvent.press(getByTestId('edit-button'));
    expect(mockOnEdit).toHaveBeenCalled();
  });
});
