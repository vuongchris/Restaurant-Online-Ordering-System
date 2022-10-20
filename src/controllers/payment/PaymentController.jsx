/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  doc, getDoc, updateDoc, serverTimestamp, Timestamp,
} from 'firebase/firestore';
import { useAuth } from '../../contexts/auth/AuthContext';
import { savePaymentDetails } from '../../services/payment/PaymentService';
import { db } from '../../firebase';
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

  const updateOrderPayment = async () => {
    const docRef = doc(db, 'user', currentUser.uid);
    const docSnap = await getDoc(docRef);
    const orderDoc = doc(db, 'order', docSnap.data().activeOrder);
    await updateDoc(orderDoc, {
      payment: {
        cardName: refs.cardNameRef.current.value,
        cardNumber: refs.cardNumberRef.current.value,
        expiry: Timestamp.fromDate(new Date(refs.expiryRef.current.value)),
        cvv: refs.cvvRef.current.value,
        isSaved: refs.saveDetailsRef.current.checked,
      },
      status: 'Submitted',
      timestamp: serverTimestamp(),
    });
    await updateDoc(docRef, {
      activeOrder: 'N/A',
    });
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
      await updateOrderPayment();
      if (refs.saveDetailsRef.current.checked) {
        await savePaymentDetails(data);
      }
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
