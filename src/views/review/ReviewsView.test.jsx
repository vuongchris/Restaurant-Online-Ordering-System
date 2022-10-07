/* eslint-disable no-unused-vars */
import { render, screen, getDefaultNormalizer } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReviewsView from './ReviewsView';

describe('Review View tests', () => {
  it('All items should be present on the page', () => {
    // Arrange

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
