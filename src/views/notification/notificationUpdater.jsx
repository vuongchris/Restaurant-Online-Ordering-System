/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Grid, TextField } from '@mui/material';

function NotificationUpdater({
  sendAccountEmail,
}) {
  return (
    <div>
      <div className="container">
        <form onSubmit={sendAccountEmail}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <h1>Send Account Notification Email to User</h1>
            </Grid>
            <Grid item>
              <TextField
                label="User Name"
                name="name"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="User Email"
                name="email"
                required
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                size="large"
                value="Send Message"
              >
                Submit Changes

              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default NotificationUpdater;
