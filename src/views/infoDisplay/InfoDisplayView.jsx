import React from 'react';
import './table.css';

function InfoDisplayView() {
  return (
    <div>
      {/* This table represent the list*/}
      <table>
        <tr>
          <th>Restaurant Name</th>
          <th>Location</th>
          <th>Distance</th>
        </tr>
        <tr>
          <td>Mcdonalds</td>
          <td>Haymarket</td>
          <td>1.2 km away</td>
        </tr>
        <tr>
          <td>KFC</td>
          <td>Bondi Beach</td>
          <td>2.7 km away</td>
        </tr>
        <tr>
          <td>Starbucks</td>
          <td>China Town</td>
          <td>3.3 km away</td>
        </tr>
        <tr>
          <td>Hungry Jacks</td>
          <td>Campertown</td>
          <td>less than 1 km</td>
        </tr>
        <tr>
          <td>Obama Care Center</td>
          <td>Darlinghurst</td>
          <td>2.4 km away</td>
        </tr>
        <tr>
          <td>Oporto</td>
          <td>Alexandria</td>
          <td>1.7 km away</td>
        </tr>
        <tr>
          <td>Chicken Dino</td>
          <td>Alexandria</td>
          <td>1.9 km away</td>
        </tr>
      </table>
    </div>
  );
}

export default InfoDisplayView;
