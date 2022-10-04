/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PaymentView(submitPayment, numberRef, nameRef, expiryRef, ccvRef, saveRef) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <form onSubmit={submitPayment}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          Card Number
        </Grid>
        <Grid item>
          <TextField
            label="cardNumber"
            required
            inputRef={numberRef}
          />
        </Grid>
        <Grid item>
          Name on card
        </Grid>
        <Grid item>
          <TextField
            label="name"
            required
            inputRef={nameRef}
          />
        </Grid>
        <Grid item>
          Expiry Date
        </Grid>
        <Grid item>
          <DatePicker
            label="expiryDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            required
            inputRef={expiryRef}
          />
        </Grid>
        <Grid item>
          CCV
        </Grid>
        <Grid item>
          <TextField
            label="ccv"
            required
            inputRef={ccvRef}
          />
        </Grid>
        <Grid item>
          Save Payment Details?
        </Grid>
        <Grid item>
          <CheckBox
            label="Save"
            required
            inputRef={saveRef}
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default PaymentView;
