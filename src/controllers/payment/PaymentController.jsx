/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { getSavedPaymentDetails } from '../../services/account/AccountService';
import PaymentView from '../../views/payment/PaymentView';

function PaymentController() {
  const currentUser = useAuth();
  const [paymentMethods, setPaymentMethods] = useState([]);
  /* const [formData] = useState(
    {
      cardName: '',
      cardNumber: '',
      ccv: null,
      expiryDate: null,
    },
  ); */
  useEffect(() => {
    const setState = async () => setPaymentMethods(await getSavedPaymentDetails(currentUser.uid));
    setState();
  }, []);
  /* const submitPayment = async (e) => {
    e.PreventDefault();
  }; */
  return <PaymentView payments={paymentMethods} />;
}

export default PaymentController;
