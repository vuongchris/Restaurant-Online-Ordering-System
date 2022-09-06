import { render, screen } from '@testing-library/react';
import React from 'react';
import CheckoutView from './CheckoutView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Checkout View tests', () => {
  render(<CheckoutView />);
  const checkout = screen.getByText(/checkout/i);
  const address = screen.getByText(/address/i);
  const deliveryInstructors = screen.getByText(/delivery instructions/i);
  const deliveryTime = screen.getByText(/delivery time/i);
  const phoneNumber = screen.getByText(/phone number/i);

  it('All fields should be present on the page', () => {
    expect(checkout).toBeInTheDocument();
    expect(address).toBeInTheDocument();
    expect(deliveryInstructors).toBeInTheDocument();
    expect(deliveryTime).toBeInTheDocument();
    expect(phoneNumber).toBeInTheDocument();
  });
});
