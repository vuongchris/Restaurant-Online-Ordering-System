import React, { useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import ReviewView from '../../views/review/ReviewView';
import ReviewHistoryView from '../../views/review/ReviewHistoryView';
import { db } from '../../firebase';

function ReviewController({ view }) {
  const ratingRef = useRef();
  const descriptionRef = useRef();
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'review'), {
        rating: ratingRef,
        description: descriptionRef,
      });
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(ex);
    }
  };

  const reviewViews = {
    review: <ReviewView
      descriptionRef={descriptionRef}
      ratingRef={ratingRef}
      submitReview={handleReviewSubmit}
    />,
    reviewHistory: <ReviewHistoryView />,
  };
  return reviewViews[view];
}

export default ReviewController;
