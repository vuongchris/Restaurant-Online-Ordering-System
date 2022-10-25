/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  collection, doc, getDoc, getDocs, updateDoc, serverTimestamp, Timestamp,
} from 'firebase/firestore';
import { useAuth } from '../../contexts/auth/AuthContext';
import { savePaymentDetails } from '../../services/payment/PaymentService';
import { db } from '../../firebase';
import PaymentView from '../../views/payment/PaymentView';
import { sendFullOrderEmail } from '../notification/notificationController';

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
  };

  const goToOrderConfirmation = async () => {
    const docRef = doc(db, 'user', currentUser.uid);
    const docSnap = await getDoc(docRef);
    const orderDoc = doc(db, 'order', docSnap.data().activeOrder);
    const orderSnap = await getDoc(orderDoc);
    navigate('/orderConfirmation', {
      state: {
        orderid: orderSnap.data().orderid,
        firstName: orderSnap.data().firstName,
        lastName: orderSnap.data().lastName,
        addressLineOne: orderSnap.data().address.addressLineOne,
        addressLineTwo: orderSnap.data().address.addressLineTwo,
        city: orderSnap.data().address.city,
        country: orderSnap.data().address.country,
        postcode: orderSnap.data().address.postcode,
        state: orderSnap.data().address.state,
        phoneNumber: orderSnap.data().phoneNumber,
        deliveryInstructions: orderSnap.data().deliveryInstructions,
        specialRequests: orderSnap.data().specialRequests,
        status: orderSnap.data().status,
        timestamp: orderSnap.data().timestamp,
        cardName: orderSnap.data().payment.cardName,
        cardNumber: orderSnap.data().payment.cardNumber,
        cvv: orderSnap.data().payment.cvv,
        expiry: orderSnap.data().payment.expiry,
        total: orderSnap.data().total,
      },
    });
    await updateDoc(docRef, {
      lastOrder: docSnap.data().activeOrder,
      activeOrder: 'N/A',
    });
  };

  // Send the email notification for orders
  const testEmail = async () => {
    const docRef = doc(db, 'user', currentUser.uid);
    const docSnap = await getDoc(docRef);
    const orderDoc = doc(db, 'order', docSnap.data().activeOrder);
    const orderSnap = await getDoc(orderDoc);
    const subCollection = collection(db, 'order', orderDoc.id, 'items');
    const subCollectSnap = await getDocs(subCollection);
    const itemNames = subCollectSnap.docs.map((item) => item.data().name);

    // Load the information to an constant
    const e = {
      target: {
        email: currentUser.email,
        name: orderSnap.data().firstName,
        subject: (`Your order has been submitted ${orderSnap.data().orderid}`),
        message: itemNames,
        contact_number: orderSnap.data().orderid,
      },
    };
    // sent the information to the Email function
    sendFullOrderEmail(e);
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
      testEmail();
      goToOrderConfirmation();
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
