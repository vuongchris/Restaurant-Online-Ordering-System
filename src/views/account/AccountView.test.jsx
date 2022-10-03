import { render, screen } from '@testing-library/react';
import React from 'react';
import * as Auth from '../../contexts/auth/AuthContext';
import AccountView from './AccountView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Account View Test Cases', () => {
  // context
  const contextValues = {
    currentUser: {
      uid: 12345,
      email: 'Test@email.com',
    },
  };
  jest.spyOn(Auth, 'useAuth').mockImplementation(() => contextValues);

  // props
  const payments = [{
    cardNumber: 123456789,
    expiry: 'Jan 2000',
    cvv: 100,
  }];

  // render component
  render(<AccountView payments={payments} />);

  // test UI elements
  it('All blocks exist with correct information', () => {
    // Personal Information - Header
    const personalInfoHeader = screen.getByText('Personal Information');
    expect(personalInfoHeader).toBeInTheDocument();

    // Personal Information - User ID
    const uidElement = screen.getByText(/User ID/i);
    expect(uidElement).toBeInTheDocument();
    expect(uidElement).toHaveTextContent(contextValues.currentUser.uid);

    // Personal Information - Email
    const emailElement = screen.getByText(/Email/i);
    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveTextContent(contextValues.currentUser.email);

    // Saved Payment Details - Header
    const savedPaymentsHeader = screen.getByText('Saved Payment Details');
    expect(savedPaymentsHeader).toBeInTheDocument();

    // Saved Payment Details #1 - Title
    const payment1 = screen.getByText('Payment method #1');
    expect(payment1).toBeInTheDocument();

    // Saved Payment Details #1 - Card Number
    const cardNumberElement = screen.getByText(/Card Number/i);
    expect(cardNumberElement).toBeInTheDocument();
    expect(cardNumberElement).toHaveTextContent(payments[0].cardNumber);

    // Saved Payment Details #1 - Expiry
    const expiryElement = screen.getByText(/Expiry/i);
    expect(expiryElement).toBeInTheDocument();
    expect(expiryElement).toHaveTextContent(payments[0].expiry);

    // Saved Payment Details #1 - CVV
    const cvvElement = screen.getByText(/CVV/i);
    expect(cvvElement).toBeInTheDocument();
    expect(cvvElement).toHaveTextContent(payments[0].cvv);
  });
});
