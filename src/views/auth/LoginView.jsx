/* eslint-disable react/prop-types */
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function LoginView({
  emailRef, passwordRef, handleLogin, loading,
}) {
  return (
    <form onSubmit={handleLogin}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <h1>Login</h1>
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
            type="password"
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
            Login
          </Button>
        </Grid>
        <Grid item>
          <Link to="/register">Need an account? Register now.</Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginView;
