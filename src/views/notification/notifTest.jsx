/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { sendFullOrderEmail } from '../../controllers/notification/notificationController';

// This is purely for testing functionality without changing other existing page function.
function NotifTest() {
  return (
    <div>
      <form onSubmit={sendFullOrderEmail}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <h1>Enter Order Details Here</h1>
          </Grid>

          <Grid item>
            <TextField
              label="User Name"
              placeholder="First Last"
              name="name"
              required
            />
          </Grid>

          <Grid item>
            <TextField
              type="email"
              label="User Email"
              placeholder="User@email.com"
              name="email"
              required
            />
          </Grid>

          <Grid item>
            <TextField
              label="Subject"
              placeholder="Order Subject"
              name="subject"
              required
            />
          </Grid>

          <Grid item>
            <TextField
              sx={{
                width: { sm: 400, md: 400 },
                '& .MuiInputBase-root': {
                  height: 200,
                },
              }}
              label="Message"
              multiline
              rows={7}
              variant="filled"
              name="message"
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
              Submit Order Details

            </Button>
          </Grid>

          <div className="col-8 form-group pt-2 mx-auto">
            <input type="hidden" className="form-control" value={Math.floor(Math.random() * (10000 - 1) + 1)} name="contact_number" />
          </div>

        </Grid>
      </form>
    </div>
  );
}

export default NotifTest;
