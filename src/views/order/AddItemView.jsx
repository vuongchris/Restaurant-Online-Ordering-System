/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router';

function AddItemView({ updateQuantityRef, addItem }) {
  const location = useLocation();

  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(location.state.price);

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h3">Add Item</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            Item Name:
            {' '}
            {`${location.state.item}`}
          </Typography>
          <br />
          <Typography variant="h6">
            Item Category:
            {' '}
            {`${location.state.category}`}
          </Typography>
          <br />
          <Typography variant="h6">
            Item Price:
            {' '}
            {`${location.state.price}`}
          </Typography>
          <br />
          <TextField
            type="number"
            label="Quantity"
            inputRef={updateQuantityRef}
            defaultValue={1}
            onChange={(event) => {
              setTotalPrice(event.target.value * location.state.price);
            }}
          />
          <br />
          <br />
          <Typography variant="h6">
            Total:
            {' '}
            {`${totalPrice}`}
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => { addItem(location.state.item, location.state.category, location.state.description, location.state.price); }}>Add Item</Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={() => navigate('/restaurantMenu')}
          >
            Cancel

          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddItemView;
