/* eslint-disable react/prop-types */
import React from 'react';
import './Notification.css';
import { Button, Grid, TextField } from '@mui/material';

function NotificationView({
  sendOrderEmail,
  orderNum,
  randomizeOrderNum,
  changeToUpdateView,
}) {
  return (
    <div>
      <form onSubmit={sendOrderEmail}>
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
              onClick={randomizeOrderNum}
              value="Send Message"
            >
              Submit Order Details

            </Button>
          </Grid>

          <div className="col-8 form-group pt-2 mx-auto">
            <input type="hidden" className="form-control" value={orderNum} name="contact_number" />
          </div>

        </Grid>
      </form>

      <Grid
        // This is for a separate function to direct you to the account notification page.
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={8}
      >
        <Grid item>
          <h1> </h1>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            size="large"
            onClick={() => { changeToUpdateView(); }}
          >
            Go to Notification Update
          </Button>
        </Grid>
      </Grid>
    </div>

  );
}

export default NotificationView;
