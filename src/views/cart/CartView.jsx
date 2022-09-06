import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

function CartView() {
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <h1>Cart</h1>
        </Grid>

        <Grid item>
          <p>No items in cart!</p>
        </Grid>
        <Grid>
          <p>Total: 0.00</p>
        </Grid>
        <Grid item>
          <Link to="/checkout">Checkout</Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default CartView;
