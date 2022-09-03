/* eslint-disable react/prop-types */
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function RegisterView({
  emailRef, passwordRef, handleRegistration, loading,
}) {
  return (
    <form onSubmit={handleRegistration}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <h1>Register</h1>
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            required
            inputRef={emailRef}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Password"
            required
            inputRef={passwordRef}
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            Register
          </Button>
        </Grid>
        <Grid item>
          <Link to="/login">Already have an account? Click here to login.</Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default RegisterView;
