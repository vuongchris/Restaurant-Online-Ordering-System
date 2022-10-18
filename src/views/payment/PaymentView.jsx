/* eslint-disable react/prop-types */
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

function PaymentView({ refs, submitPayment, loading }) {
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
          <h3>Name on card</h3>
        </Grid>
        <Grid item>
          <TextField
            label="Name on Card"
            required
            inputRef={refs.cardNumberRef}
          />
        </Grid>
        <Grid item>
          <h3>Card Number</h3>
        </Grid>
        <Grid item>
          <TextField
            label="Card Number"
            required
            inputRef={refs.cardNameRef}
          />
        </Grid>
        <Grid item>
          <h3>Expiry Date</h3>
        </Grid>
        <Grid item>
          <TextField
            type="date"
            required
            inputRef={refs.expiryRef}
          />
        </Grid>
        <Grid item>
          <h3>CVV</h3>
        </Grid>
        <Grid item>
          <TextField
            label="CVV"
            required
            inputRef={refs.cvvRef}
          />
        </Grid>
        <Grid item>
          Save Payment Details?
        </Grid>
        <Grid item>
          <input
            type="checkbox"
            label="Save Paymanent Details?"
            ref={refs.saveDetailsRef}
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="error"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
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
