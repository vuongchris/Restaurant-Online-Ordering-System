import { render, screen } from '@testing-library/react';
import React from 'react';
import * as Auth from '../../contexts/auth/AuthContext';
import PaymentView from './PaymentView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Payment View tests', () => {
  it('All fields should be present on the page', () => {
    // Arrange
    const contextValues = { currentUser: { email: 'Test@email.com' } };
    jest.spyOn(Auth, 'useAuth').mockImplementation(() => contextValues);

    // Act
    render(<PaymentView />);
    const cardNumber = screen.getByText(/Card Number/i);
    const name = screen.getByText(/name on card/i);
    const expiryDate = screen.getByText(/Expiry Date/i);
    // const ccv = screen.getByText(/CCV/i);
    const save = screen.getByText(/Save Payment Details?/i);
    // Assert
    expect(cardNumber).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(expiryDate).toBeInTheDocument();
    // expect(ccv).toBeInTheDocument();
    expect(save).toBeInTheDocument();
  });
});
