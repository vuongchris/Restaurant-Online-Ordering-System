/* eslint-disable no-unused-vars */
import { render, screen, getDefaultNormalizer } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CheckoutView from './CheckoutView';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

describe('Review View tests', () => {
  it('All items should be present on the page', () => {
    // Arrange

    // Act
    render(
      <Router>
        <CheckoutView />
      </Router>,
    );
    const checkout = screen.getByText(/Checkout/i);
    const checkoutItem = screen.getByText(/Item/i);
    const checkoutQuantity = screen.getByText(/Quantity/i);
    const checkoutTotal = screen.getByText(/Total/i);

    // Assert
    expect(checkout).toBeInTheDocument();
    expect(checkoutItem).toBeInTheDocument();
    expect(checkoutQuantity).toBeInTheDocument();
    expect(checkoutTotal).toBeInTheDocument();
  });
});
