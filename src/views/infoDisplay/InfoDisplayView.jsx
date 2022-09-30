/* eslint-disable react/prop-types */
import React from 'react';
import './table.css';
import '../../controllers/infoDisplay/InfoDisplayController';

function InfoDisplayView({ infoDisplay }) {
  return (
    <div>
      {infoDisplay.map((restaurant) => (
        <table>
          <tr>
            <th>Restaurant Name</th>
            <th>Location</th>
            <th>Distance</th>
          </tr>
          <tr>
            <td>{restaurant.Restaurant_Branch}</td>
            <td>Haymarket</td>
            <td>1.2 km away</td>
          </tr>
        </table>
      ))}
    </div>
  );
}

export default InfoDisplayView;
