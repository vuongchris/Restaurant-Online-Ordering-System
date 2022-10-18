import { Timestamp } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth/AuthContext';
import { savePaymentDetails } from '../../services/payment/PaymentService';
import PaymentView from '../../views/payment/PaymentView';

function PaymentController() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Refs are used to control inputs and retrieve their values
  const refs = {
    cardNameRef: useRef(),
    cardNumberRef: useRef(),
    expiryRef: useRef(),
    cvvRef: useRef(),
    saveDetailsRef: useRef(),
  };

  // Save and submit payment
  const submitPayment = async (e) => {
    e.preventDefault();

    // Data to send to Firebase backend
    const data = {
      userid: currentUser.uid,
      cardName: refs.cardNameRef.current.value,
      cardNumber: refs.cardNumberRef.current.value,
      expiry: Timestamp.fromDate(new Date(refs.expiryRef.current.value)),
      cvv: refs.cvvRef.current.value,
      isSaved: refs.saveDetailsRef.current.checked,
    };

    // Try-catch to handle errors during Firebase save process
    try {
      setLoading(true);
      await savePaymentDetails(data);
      alert('Successfully saved payment details!');
      navigate('/');
    } catch (error) {
      console.log(`Failed to save payment details with error ${error}`);
      setLoading(false);
    }
  };

  return (
    <PaymentView
      refs={refs}
      submitPayment={submitPayment}
      loading={loading}
    />
  );
}

export default PaymentController;
