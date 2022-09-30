/* eslint-disable react/prop-types */
import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import InfoDisplayView from '../../views/infoDisplay/InfoDisplayView';
import { db } from '../../firebase';

function InfoDisplayController({ view }) {
  const [infoDisplay, setInfoDisplays] = useState([]);
  const infoDisplayCollection = collection(db, 'restaurant');

  useEffect(() => {
    const getInfoDisplay = async () => {
      const data = await getDocs(infoDisplayCollection);
      setInfoDisplays(await Promise.all((data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))));
    };

    getInfoDisplay();
  }, []);

  // const testViews = {
  //   display:
  //     (
  //       <div>
  //         {infoDisplay.map((restaurant) => (
  //           <table>
  //             <tr>
  //               <th>Restaurant Name</th>
  //               <th>Location</th>
  //               <th>Distance</th>
  //             </tr>
  //             <tr>
  //               <td>{restaurant.Restaurant_Branch}</td>
  //               <td>Haymarket</td>
  //               <td>1.2 km away</td>
  //             </tr>
  //           </table>
  //         ))}
  //       </div>
  //     ),
  // };

  // return testViews[view];
  return <InfoDisplayView />;
}

export default InfoDisplayController;
