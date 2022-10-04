import { render, screen } from '@testing-library/react';
import React from 'react';
import CheckoutView from './CheckoutView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Checkout View tests', () => {
  render(<CheckoutView />);
  const firstName = screen.getByLabelText(/First Name/i);
  const lastName = screen.getByLabelText(/Last Name/i);
  const addressLineOne = screen.getByLabelText(/Address Line 1/i);
  const addressLineTwo = screen.getByLabelText(/Address Line 2/i);
  const city = screen.getByLabelText(/City/i);
  const state = screen.getByLabelText(/State/i);
  const country = screen.getByLabelText(/Country/i);
  const postcode = screen.getByLabelText(/Postcode/i);
  const phoneNumber = screen.getByLabelText(/Phone Number/i);
  const deliveryInstructions = screen.getByLabelText(/Delivery Instructions/i);
  const specialRequests = screen.getByLabelText(/Special Requests/i);

  it('All fields should be present on the page', () => {
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(addressLineOne).toBeInTheDocument();
    expect(addressLineTwo).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(state).toBeInTheDocument();
    expect(country).toBeInTheDocument();
    expect(postcode).toBeInTheDocument();
    expect(phoneNumber).toBeInTheDocument();
    expect(deliveryInstructions).toBeInTheDocument();
    expect(specialRequests).toBeInTheDocument();
  });
});
