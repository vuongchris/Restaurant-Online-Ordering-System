import { render, screen } from '@testing-library/react';
import React from 'react';
import CheckoutView from './CheckoutView';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(),
}));

describe('Payment View tests', () => {
  render(<CheckoutView />);
  const firstName = screen.getByText(/First Name/i);
  const lastName = screen.getByText(/Last Name/i);
  const addressLineOne = screen.getByText(/Address Line 1/i);
  const addressLineTwo = screen.getByText(/Address Line 2/i);
  const city = screen.getByText(/City/i);
  const state = screen.getByText(/State/i);
  const country = screen.getByText(/Country/i);
  const postcode = screen.getByText(/Postcode/i);
  const phoneNumber = screen.getByText(/Phone Number/i);
  const deliveryInstructions = screen.getByText(/Delivery Instructions/i);
  const specialRequests = screen.getByText(/Special Requests/i);
  const submit = screen.getByText(/Submit/i);

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
    expect(submit).toBeInTheDocument();
  });
});
