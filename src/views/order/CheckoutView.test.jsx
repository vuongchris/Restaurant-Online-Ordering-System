import { render, screen } from '@testing-library/react';
import React from 'react';
import CheckoutView from './CheckoutView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Checkout View tests', () => {
  render(<CheckoutView />);
  const checkout = screen.getByText(/Checkout/i);
  const firstName = screen.getByLabelText(/First Name/i);
  const lastName = screen.getByLabelText(/Last Name/i);
  const addressLine1 = screen.getByLabelText(/Address Line 1/i);
  const addressLine2 = screen.getByLabelText(/Address Line 2/i);
  const city = screen.getByLabelText(/City/i);
  const state = screen.getByLabelText(/State/i);
  const country = screen.getByLabelText(/Country/i);
  const postcode = screen.getByLabelText(/Postcode/i);
  const deliveryInstructors = screen.getByLabelText(/Delivery Instructions/i);
  const specialRequest = screen.getByLabelText(/Special Requests/i);
  const phoneNumber = screen.getByLabelText(/Phone Number/i);

  it('All fields should be present on the page', () => {
    expect(checkout).toBeInTheDocument();
    expect(addressLine1).toBeInTheDocument();
    expect(addressLine2).toBeInTheDocument();
    expect(deliveryInstructors).toBeInTheDocument();
    expect(phoneNumber).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(state).toBeInTheDocument();
    expect(country).toBeInTheDocument();
    expect(postcode).toBeInTheDocument();
    expect(specialRequest).toBeInTheDocument();
  });
});
