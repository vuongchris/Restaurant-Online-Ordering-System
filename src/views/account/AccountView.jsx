/* eslint-disable react/prop-types */
import { Grid, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth/AuthContext';
import { db } from '../../firebase';

function AccountView({ payments }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const deletePayment = async (id) => {
    const docRef = doc(db, 'payment', id);
    await deleteDoc(docRef);
    window.location.reload();
  };

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
      <Grid container justifyContent="center" alignItems="center" flexDirection="row" gap={5}>
        {!payments.length ? (<h3>No saved payment details.</h3>) : payments.map((card, index) => (
          <Grid item key={card.cardNumber} minWidth={300}>
            <Paper elevation={8} sx={{ padding: 2 }}>
              <h2>
                Payment method #
                {index + 1}
              </h2>
              <h4>
                Name on Card:
                {' '}
                {card.cardName}
              </h4>
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
              <Button
                variant="contained"
                size="large"
                sx={{ marginX: 2 }}
              >
                Update
              </Button>
              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={() => deletePayment(card.id)}
              >
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <h1>Order History</h1>
      <Button variant="contained" onClick={() => navigate('/orderHistory')}>Go to Order History</Button>
    </div>
  );
}

export default AccountView;
