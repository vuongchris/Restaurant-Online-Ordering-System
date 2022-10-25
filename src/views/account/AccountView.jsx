/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth/AuthContext';

function AccountView({ payments }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Personal Information</h1>
      {currentUser && (
      <h3>
        User ID:
        {' '}
        {currentUser.uid}
        <br />
        Email:
        {' '}
        {currentUser.email}
      </h3>
      )}
      <h1>Saved Payment Details</h1>
      {payments.map((card, index) => (
        <div key={card.cardNumber}>
          <h2>
            Payment method #
            {index + 1}
          </h2>
          <h4>
            Card Number:
            {' '}
            {card.cardNumber}
          </h4>
          <h4>
            Expiry:
            {' '}
            {new Date(card.expiry.seconds).toUTCString()}
          </h4>
          <h4>
            CVV:
            {' '}
            {card.cvv}
          </h4>
        </div>
      ))}
      <h1>Order History</h1>
      <Button variant="contained" onClick={() => navigate('/orderHistory')}>Go to Order History</Button>
    </div>
  );
}

export default AccountView;
