import { render, screen, getDefaultNormalizer } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CheckoutView from './CheckoutView';

test('renders react component', async () => {
  render(
    <Router>
      <CheckoutView />
    </Router>,
  );
});

describe('Checkout View tests', () => {
  const firstName = screen.getByText(/First Name/i, {
    normalizer: getDefaultNormalizer({ trim: false }),
  });
  const lastName = screen.getByText(/Last Name/i, {
    normalizer: getDefaultNormalizer({ trim: false }),
  });
  const addressLineOne = screen.getByText(/Address Line 1/i, {
    normalizer: getDefaultNormalizer({ trim: false }),
  });
  const addressLineTwo = screen.getByText(/Address Line 2/i, {
    normalizer: getDefaultNormalizer({ trim: false }),
  });
  const city = screen.getByText(/City/i, {
    normalizer: getDefaultNormalizer({ trim: false }),
  });
  const state = screen.getByText(/State/i, {
    normalizer: getDefaultNormalizer({ trim: false }),
  });
  const country = screen.getByText(/Country/i, {
    normalizer: getDefaultNormalizer({ trim: false }),
  });
  const postcode = screen.getByText(/Postcode/i, {
    normalizer: getDefaultNormalizer({ trim: false }),
  });
  const phoneNumber = screen.getByText(/Phone Number/i, {
    normalizer: getDefaultNormalizer({ trim: false }),
  });
  const deliveryInstructions = screen.getByText(/Delivery Instructions/i, {
    normalizer: getDefaultNormalizer({ trim: false }),
  });
  const specialRequests = screen.getByText(/Special Requests/i, {
    normalizer: getDefaultNormalizer({ trim: false }),
  });

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
