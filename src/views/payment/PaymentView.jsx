/* eslint-disable linebreak-style */
import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/AuthContext';

function PaymentView() {
  // Temporarily place logout button in homepage
  const { currentUser, logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div
      style={{ textAlign: 'center' }}
    >
      <h1>Welcome to 41026 - Advanced Software Development!</h1>
      <br />
      <form action="/OrderConfirmed" method="POST">
        Card Number:
        <input type="text" name="cardNumber" required />
        Name:
        <input type="text" name="name" required />
        Expiry Date:
        <input type="date" name="expiryDate" required />
        CVC:
        <input type="text" name="CVC" required />
      </form>


      {/** Display a logout button if a user is signed in */}
      {currentUser && (
        <div>
          <h3>
            Welcome,
            {' '}
            {currentUser.email}
          </h3>
          <Button
            variant="contained"
            size="large"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}

export default PaymentView;