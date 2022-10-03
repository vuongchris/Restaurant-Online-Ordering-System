/* eslint-disable react/prop-types */
import React from 'react';
import './table.css';
// import '../../controllers/infoDisplay/InfoDisplayController';

function InfoDisplayView({ infoDisplay }) {
  return (
    <div>
      {infoDisplay.map((restaurant) => (
        <table>
          <tr>
            <th>Restaurant Name</th>
            <th>Location</th>
            <th>Distance</th>
            <th>Operating Hours</th>
            <th>Allow Pickups?</th>
          </tr>
          <tr>
            <td>{restaurant.restaurantBranch}</td>
            <td>{restaurant.Location}</td>
            <td>{restaurant.Distance}</td>
            <td>{restaurant.Hours}</td>
            <td>{restaurant.pickUp}</td>
          </tr>
        </table>
      ))}
    </div>
  );
}

export default InfoDisplayView;
