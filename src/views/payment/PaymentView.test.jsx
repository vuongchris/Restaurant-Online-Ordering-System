import { render, screen } from '@testing-library/react';
import React from 'react';
import * as Auth from '../../contexts/auth/AuthContext';
import PaymentView from './PaymentView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Payment View tests', () => {
  // Basically mock 'useRef' from React
  const ref = { current: {} };
  const refs = {
    cardNameRef: ref,
    cardNumberRef: ref,
    expiryRef: ref,
    cvvRef: ref,
    saveDetailsRef: ref,
  };

  it('All input fields should be present on the page', () => {
    // Arrange
    const contextValues = { currentUser: { email: 'Test@email.com' } };
    jest.spyOn(Auth, 'useAuth').mockImplementation(() => contextValues);

    // Act
    render(<PaymentView refs={refs} />);
    const cardNumber = screen.getByLabelText(/Card Number/i);
    const name = screen.getByLabelText(/Name on Card/i);
    const expiryDate = screen.getByText(/Expiry Date/i);
    const cvv = screen.getByLabelText(/CVV/i);
    const saveOption = screen.getByText(/Save Payment Details?/i);

    // Assert
    // All are present
    expect(cardNumber).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(expiryDate).toBeInTheDocument();
    expect(cvv).toBeInTheDocument();
    expect(saveOption).toBeInTheDocument();

    // Some fields must have the 'required' attribute
    expect(cardNumber).toBeRequired();
    expect(name).toBeRequired();
    expect(cvv).toBeRequired();
  });
});
