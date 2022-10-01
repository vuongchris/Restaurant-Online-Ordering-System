import React from 'react';
import ReviewView from '../../views/review/ReviewView';
import ReviewHistoryView from '../../views/review/ReviewHistoryView';

function ReviewController({ view }) {
  const reviewViews = {
    review: <ReviewView />,
    reviewHistory: <ReviewHistoryView />,
  };
  return reviewViews[view];
}

export default ReviewController;
