import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateReviewView from './CreateReviewView';

test('renders react component', async () => {
  render(
    <Router>
      <CreateReviewView />
    </Router>,
  );

  describe('Checkout View tests', () => {
    const item = screen.getByLabelText(/Item/i);
    const reviewDescription = screen.getByLabelText(/Review Description/i);
    const submit = screen.getByText(/Submit/i);
    const cancel = screen.getByText(/Cancel/i);

    it('All fields should be present on the page', () => {
      expect(item).toBeInTheDocument();
      expect(reviewDescription).toBeInTheDocument();
      expect(submit).toBeInTheDocument();
      expect(cancel).toBeInTheDocument();
    });
  });
});
