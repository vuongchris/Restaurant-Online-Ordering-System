/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

function CustomerService() {
  const [newCustomerTicket, setCustomerTicket] = useState('');

  const customerServiceRef = collection(db, 'customerTicket');

  const handleSubmitButton = async () => {
    try {
      await addDoc(customerServiceRef, {
        customerTicket: newCustomerTicket,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error, cant create ticket: ', e);
    }
  };

  return (
    <div
      style={{ textAlign: 'center' }}
    >
      {/* might change to some other user story, too hard to implement */}
      <h1>Welcome to the Customer Service</h1>
      <div>
        Please state what assistant do you need and our agent will get back to you shortly.
      </div>
      <div>
        <TextField
          style={{ width: '30%', fontSize: '20px', margin: '20px' }}
          label="Customer Service"
          multiline
          minRows={5}
          maxRows={10}
          required
          onChange={(event) => {
            setCustomerTicket(event.target.value);
          }}
        />
        <br />
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmitButton}
        >
          Submit
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          size="large"
        >
          Cancel
        </Button>
      </div>
    </div>

  );
}

export default CustomerService;
