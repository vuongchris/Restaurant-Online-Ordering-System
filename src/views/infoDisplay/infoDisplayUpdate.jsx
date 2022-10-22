/* eslint-disable react/prop-types */
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';

function InfoDisplayUpdate({
  infoDisplay: restaurant, updateRestaurant, setNewRestaurant, setNewLocation,
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
            <tr>
              <td>{restaurant.restaurantBranch}</td>
              <td>{restaurant.Location}</td>
            </tr>
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
          <h3>
            Restaurant ID:
            {' '}
            {restaurant.id}
          </h3>
          <Grid item>
            <TextField
              label="Restaurant Name"
              required
              onChange={(event) => setNewRestaurant(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Restaurant Location"
              required
              onChange={(event) => setNewLocation(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              onClick={updateRestaurant}
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
