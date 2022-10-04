import { render, screen } from '@testing-library/react';
import React from 'react';
import PaymentView from './PaymentView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Payment View tests', () => {
  render(<PaymentView />);
  const cardNumber = screen.getByText(/card number/i);
  const name = screen.getByText(/name/i);
  const expiryDate = screen.getByText(/expiryDate/i);
  const ccv = screen.getByText(/ccv/i);
  const save = screen.getByText(/Save/i);

  it('All fields should be present on the page', () => {
    expect(cardNumber).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(expiryDate).toBeInTheDocument();
    expect(ccv).toBeInTheDocument();
    expect(save).toBeInTheDocument();
  });
});
