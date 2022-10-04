import React from 'react';
import CreateReviewView from '../../views/review/CreateReviewView';
import EditReviewView from '../../views/review/EditReviewView';
import ReviewsView from '../../views/review/ReviewsView';

function ReviewController({ view }) {
  const reviewViews = {
    createReview: <CreateReviewView />,
    editReview: <EditReviewView />,
    reviews: <ReviewsView />,
  };
  return reviewViews[view];
}

export default ReviewController;
