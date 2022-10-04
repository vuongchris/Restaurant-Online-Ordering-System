/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import { Button } from '@mui/material';
import React from 'react';

function LocationView({ locations }) {
  // locationList.forEach((doc) => { <li>{doc.data()}</li>; });
  // const list = locationList.map((d) => (<li key={d.name}> {d.data} </li>));
  return (
    <div>
      <h1>Saved Payment Details</h1>
      {locations.map((location, index) => (
        <div key={location.Name}>
          <h2>
            Location #
            {index + 1}
          </h2>
          <h4>
            Name:
            {' '}
            {location.Name}
          </h4>
          <h4>
            Address:
            {' '}
            {location.Address}
          </h4>
          <h4>
            City:
            {' '}
            {location.City}
          </h4>
        </div>
      ))}
    </div>
  );
}

export default LocationView;
