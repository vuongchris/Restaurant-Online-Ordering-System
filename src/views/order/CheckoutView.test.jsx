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
  // const firstName = screen.getByLabelText('First Name', {
  //   normalizer: getDefaultNormalizer({ trim: false }),
  // });
  // const lastName = screen.getByLabelText('Last Name', {
  //   normalizer: getDefaultNormalizer({ trim: false }),
  // });
  // const addressLineOne = screen.getByLabelText('Address Line 1', {
  //   normalizer: getDefaultNormalizer({ trim: false }),
  // });
  // const addressLineTwo = screen.getByLabelText('Address Line 2', {
  //   normalizer: getDefaultNormalizer({ trim: false }),
  // });
  // const city = screen.getByLabelText('City', {
  //   normalizer: getDefaultNormalizer({ trim: false }),
  // });
  // const state = screen.getByLabelText('State', {
  //   normalizer: getDefaultNormalizer({ trim: false }),
  // });
  // const country = screen.getByLabelText('Country', {
  //   normalizer: getDefaultNormalizer({ trim: false }),
  // });
  // const postcode = screen.getByLabelText('Postcode', {
  //   normalizer: getDefaultNormalizer({ trim: false }),
  // });
  // const phoneNumber = screen.getByLabelText('Phone Number', {
  //   normalizer: getDefaultNormalizer({ trim: false }),
  // });
  // const deliveryInstructions = screen.getByLabelText('Delivery Instructions', {
  //   normalizer: getDefaultNormalizer({ trim: false }),
  // });
  // const specialRequests = screen.getByLabelText('Special Requests', {
  //   normalizer: getDefaultNormalizer({ trim: false }),
  // });

  it('All fields should be present on the page', () => {
    // expect(firstName).toBeInTheDocument();
    // expect(lastName).toBeInTheDocument();
    // expect(addressLineOne).toBeInTheDocument();
    // expect(addressLineTwo).toBeInTheDocument();
    // expect(city).toBeInTheDocument();
    // expect(state).toBeInTheDocument();
    // expect(country).toBeInTheDocument();
    // expect(postcode).toBeInTheDocument();
    // expect(phoneNumber).toBeInTheDocument();
    // expect(deliveryInstructions).toBeInTheDocument();
    // expect(specialRequests).toBeInTheDocument();
  });
});
