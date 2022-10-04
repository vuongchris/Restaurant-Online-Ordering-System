/* eslint-disable no-unused-vars */
import { render, screen, getDefaultNormalizer } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateReviewView from './CreateReviewView';

test('renders react component', async () => {
  render(
    <Router>
      <CreateReviewView />
    </Router>,
  );
});

describe('Checkout View tests', () => {
  const item = screen.getByLabelText('Item', {
    normalizer: getDefaultNormalizer({ trim: false }),
  });
  const reviewDescription = screen.getByLabelText('Description', {
    normalizer: getDefaultNormalizer({ trim: false }),
  });
  const submit = screen.getByText('Submit', {
    normalizer: getDefaultNormalizer({ trim: false }),
  });
  const cancel = screen.getByText('Cancel', {
    normalizer: getDefaultNormalizer({ trim: false }),
  });

  it('All fields should be present on the page', () => {
    expect(item).toBeInTheDocument();
    expect(reviewDescription).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    expect(cancel).toBeInTheDocument();
  });
});
