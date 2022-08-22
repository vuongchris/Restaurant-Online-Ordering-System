import { Button, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function LoginView() {
  return (
    <div>
      <h1>LoginView</h1>
      <TextField label="Username" />
      <TextField label="Password" />
      <Button variant="contained" size="large">Login</Button>
      <Link to="/register">Need an account? Register now.</Link>
    </div>
  );
}

export default LoginView;
