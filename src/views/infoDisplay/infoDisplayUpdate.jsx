/* eslint-disable react/prop-types */
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
// import { Link } from 'react-router-dom';

function InfoDisplayUpdate({
  infoDisplay,
}) {
  return (
    <>
      <div>

        <table>
          <tbody>
            <tr>
              <th>Restaurant Name</th>
              <th>Location</th>
            </tr>

            {infoDisplay.map((restaurant) => (

              <tr key={restaurant.Location}>
                <td>{restaurant.restaurantBranch}</td>
                <td>{restaurant.Location}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <form>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <h1>Update the Restaurant Info</h1>
          </Grid>
          <Grid item>
            <input readOnly value={document.id} />
          </Grid>
          <Grid item>
            <TextField
              label="Restaurant Name"
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Restaurant Location"
              required
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Submit Changes

            </Button>
          </Grid>
        </Grid>
      </form>

    </>
  );
}

export default InfoDisplayUpdate;
