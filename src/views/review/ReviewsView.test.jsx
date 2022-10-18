import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as Auth from '../../contexts/auth/AuthContext';
import ReviewsView from './ReviewsView';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

describe('Review View tests', () => {
  it('All items should be present on the page', () => {
    // Arrange
    const contextValues = { currentUser: { email: 'Test@email.com' } };
    jest.spyOn(Auth, 'useAuth').mockImplementation(() => contextValues);

    // Act
    render(
      <Router>
        <ReviewsView />
      </Router>,
    );
    const reviews = screen.getByText(/Reviews/i);
    const reviewItem = screen.getByText(/Item/i);
    const reviewRating = screen.getByText(/Rating/i);
    const reviewDescription = screen.getByText(/Description/i);

    // Assert
    expect(reviews).toBeInTheDocument();
    expect(reviewItem).toBeInTheDocument();
    expect(reviewRating).toBeInTheDocument();
    expect(reviewDescription).toBeInTheDocument();
  });
});
