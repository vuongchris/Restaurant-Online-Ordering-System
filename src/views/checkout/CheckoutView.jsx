import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function CheckoutView() {
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
          <h1>Checkout</h1>
        </Grid>
        <Grid item>
          <ButtonGroup style={{ margin: '20px' }} orientation="vertical">
            <Button variant="outline" startIcon={<LocationOnIcon />} endIcon={<ArrowForwardIosIcon />}>Address</Button>
            <Button variant="outline" startIcon={<DoorFrontIcon />} endIcon={<ArrowForwardIosIcon />}>Delivery Instructions</Button>
            <Button variant="outline" startIcon={<AccessTimeIcon />} endIcon={<ArrowForwardIosIcon />}>Delivery Time</Button>
            <Button variant="outline" startIcon={<PhoneIcon />} endIcon={<ArrowForwardIosIcon />}>Phone Number</Button>
          </ButtonGroup>
        </Grid>
        <Grid>
          <Link to="/">SUBMIT</Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default CheckoutView;
