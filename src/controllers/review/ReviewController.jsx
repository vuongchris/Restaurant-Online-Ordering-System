/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import {
  collection, deleteDoc, doc, getDocs, query, where, updateDoc, addDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router';
import CreateReviewView from '../../views/review/CreateReviewView';
import EditReviewView from '../../views/review/EditReviewView';
import ReviewsView from '../../views/review/ReviewsView';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/auth/AuthContext';

function ReviewController({ view }) {
  const { currentUser } = useAuth();

  const reviewCollectionRef = collection(db, 'review');
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  const getReviews = async () => {
    const q = query(reviewCollectionRef, where('userid', '==', currentUser.uid));
    const data = await getDocs(q);
    setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getReviews();
  }, []);

  const openReview = async (reviewId, reviewItem, reviewRating, reviewDescription) => {
    navigate('/editReview', {
      state: {
        id: reviewId, item: reviewItem, rating: reviewRating, description: reviewDescription,
      },
    });
  };

  const deleteReview = async (id) => {
    try {
      const reviewDoc = doc(db, 'review', id);
      await deleteDoc(reviewDoc);
      console.log('Document deleted!');
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
    getReviews();
    alert('Review successfully deleted!');
  };

  const toReviews = async () => {
    getReviews();
    navigate('/restaurantMenu');
  };

  const handleCreateReview = async (newItem, newRating, newDescription) => {
    try {
      await addDoc(reviewCollectionRef, {
        userid: currentUser.uid,
        item: newItem,
        rating: newRating,
        description: newDescription,
      });
      toReviews();
      console.log('Document created!');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleUpdateReview = async (id, newItem, newRating, newDescription) => {
    try {
      const docRef = doc(db, 'review', id);
      await updateDoc(docRef, {
        userid: currentUser.uid,
        item: newItem,
        rating: newRating,
        description: newDescription,
      });
      toReviews();
      console.log('Document created!');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const reviewViews = {
    createReview: <CreateReviewView
      toReviews={toReviews}
      handleCreateReview={handleCreateReview}
    />,
    editReview: <EditReviewView
      toReviews={toReviews}
      handleUpdateReview={handleUpdateReview}
    />,
    reviews: <ReviewsView
      reviews={reviews}
      openReview={openReview}
      deleteReview={deleteReview}
    />,
  };
  return reviewViews[view];
}

export default ReviewController;
