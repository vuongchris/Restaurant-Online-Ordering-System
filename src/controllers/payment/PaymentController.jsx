/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import PaymentView from '../../views/payment/PaymentView';

function PaymentController() {
  const numberRef = useRef();
  const nameRef = useRef();
  const expiryRef = useRef();
  const ccvRef = useRef();
  const saveRef = useRef();

  /* const submitPayment = async (e) => {
    e.PreventDefault();
  }; */
  return <PaymentView />;
}

export default PaymentController;
