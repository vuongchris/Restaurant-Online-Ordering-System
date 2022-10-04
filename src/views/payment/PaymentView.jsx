/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PaymentView(submitPayment) {
  const [startDate, setStartDate] = useState(new Date());
  const useSaved = false;
  return (
    <div>
      <div>
        <form onSubmit={submitPayment}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <h3>Card Number</h3>
            </Grid>
            <Grid item>
              <TextField
                label="cardNumber"
                required
              />
            </Grid>
            <Grid item>
              <h3>Name on card</h3>
            </Grid>
            <Grid item>
              <TextField
                label="name"
                required
              />
            </Grid>
            <Grid item>
              <h3>Expiry Date</h3>
            </Grid>
            <Grid item>
              <DatePicker
                label="expiryDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                required
              />
            </Grid>
            <Grid item>
              <h3>CCV</h3>
            </Grid>
            <Grid item>
              <TextField
                label="ccv"
                required
              />
            </Grid>
            <Grid item>
              Save Payment Details?
            </Grid>
            <Grid item>
              <CheckBox
                label="Save"
                required
              />
            </Grid>
            <Grid item>
              Use Saved Payment Details?
            </Grid>
            <Grid item>
              <CheckBox
                label="UseSaved"
                required
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
      </div>
      <div>
        {useSaved && <h1>Saved Payment Details</h1> }
      </div>
    </div>
  );
}

export default PaymentView;

/* {payments.map((card, index) => (
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
                  {card.expiry}
                </h4>
                <h4>
                  CVV:
                  {' '}
                  {card.cvv}
                </h4>
              </div>
            ))}; */
