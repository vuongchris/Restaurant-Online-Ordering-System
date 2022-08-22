import { Button, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function RegisterView() {
  return (
    <div>
      <h1>RegisterView</h1>
      <TextField label="Username" />
      <TextField label="Password" />
      <TextField label="Confirm Password" />
      <Button variant="contained" size="large">Register</Button>
      <Link to="/login">Already have an account? Click here to login.</Link>
    </div>
  );
}

export default RegisterView;
