/* eslint-disable react/prop-types */
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';

function RestaurantMenuUpdate({
  RestaurantName,
  restaurantMenu: menu,
  setNewMenuName,
  setNewMenuCategory,
  setNewMenuDescription,
  setNewMenuPrice,
  updateMenu,
}) {
  return (
    <>
      <div>

        <table>
          <tbody>
            <tr>
              <th>Restaurant Name</th>
              <th>{RestaurantName}</th>
            </tr>
            <tr>
              <th>Menu List</th>
              <th>Menu Category</th>
              <th>Menu Price</th>
              <th>Menu Description</th>
            </tr>
            <tr>
              <td>{menu.name}</td>
              <td>{menu.category}</td>
              <td>{menu.price}</td>
              <td>{menu.description}</td>
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
            <h1>Update the Menu information</h1>
          </Grid>
          <h3>
            Menu ID:
            {' '}
            {menu.id}
          </h3>
          <Grid item>
            <TextField
              label="Menu Name"
              required
              onChange={(event) => setNewMenuName(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Menu Category"
              required
              onChange={(event) => setNewMenuCategory(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Menu Price"
              required
              onChange={(event) => setNewMenuPrice(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Menu Description"
              required
              onChange={(event) => setNewMenuDescription(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              onClick={updateMenu}
            >
              Submit Changes
            </Button>
          </Grid>
        </Grid>
      </form>

    </>
  );
}

export default RestaurantMenuUpdate;
