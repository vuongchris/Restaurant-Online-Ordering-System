import React from 'react';
import ReviewView from '../../views/review/CreateReviewView';
import ReviewHistoryView from '../../views/review/ReviewsView';

function ReviewController({ view }) {
  const reviewViews = {
    review: <ReviewView />,
    reviewHistory: <ReviewHistoryView />,
  };
  return reviewViews[view];
}

export default ReviewController;
