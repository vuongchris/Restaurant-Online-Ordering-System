/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './table.css';

function InfoDisplayView({
  infoDisplay,
  addRestaurant,
  setNewRestaurant,
  setNewLocation,
  setNewDistance,
  setNewHours,
  setNewPickUp,
  deleteBranch,
}) {
  const navigation = useNavigate();
  return (
    <>
      <div>

        <table>
          <tbody>
            <tr>
              <th>Restaurant Name</th>
              <th>Location</th>
              <th>Distance</th>
              <th>Operating Hours</th>
              <th>Allow Pickups?</th>
              <th>Delete Branch</th>
              <th>Update Branch</th>
              <th>Select Restaurant</th>
            </tr>

            {infoDisplay.map((restaurant) => (

              <tr key={restaurant.Location}>
                <td>{restaurant.restaurantBranch}</td>
                <td>{restaurant.Location}</td>
                <td>{restaurant.Distance}</td>
                <td>{restaurant.Hours}</td>
                <td>{restaurant.pickUp}</td>
                <td><button type="submit" onClick={() => { deleteBranch(restaurant.id); }}>Delete Branch</button></td>
                <td><button type="submit" onClick={() => navigation(`/restaurantListEdit/${restaurant.id}`)}>Update Branch</button></td>
                <td><button type="submit" onClick={() => navigation(`/restaurantMenu/${restaurant.restaurantBranch}`)}>Select Restaurant</button></td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <input placeholder="branch name..." onChange={(event) => { setNewRestaurant(event.target.value); }} />
      <input placeholder="branch location..." onChange={(event) => { setNewLocation(event.target.value); }} />
      <input placeholder="distance..." onChange={(event) => { setNewDistance(event.target.value); }} />
      <input placeholder="Hours..." onChange={(event) => { setNewHours(event.target.value); }} />
      <input placeholder="Pick Up Support..." onChange={(event) => { setNewPickUp(event.target.value); }} />
      <button type="submit" onClick={addRestaurant}> test button </button>
      <div />

    </>
  );
}

export default InfoDisplayView;
