/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  collection, getDocs, addDoc, deleteDoc, setDoc, query, where, updateDoc, doc,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import InfoDisplayView from '../../views/infoDisplay/InfoDisplayView';
import { db } from '../../firebase';

function InfoDisplayController({ view }) {
  // Add the Create function into the controller
  const [newRestaurant, setNewRestaurant] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDistance, setNewDistance] = useState('');
  const [newHours, setNewHours] = useState('');
  const [newPickUp, setNewPickUp] = useState('');

  const [infoDisplay, setInfoDisplays] = useState([]);
  const infoDisplayCollection = collection(db, 'restaurant');

  const addRestaurant = async () => {
    await addDoc(infoDisplayCollection, {
      restaurantBranch: newRestaurant,
      Location: newLocation,
      Distance: newDistance,
      Hours: newHours,
      pickUp: newPickUp,
    });
  };

  const updateRestaurant = async () => {
    const q = query(collection(db, 'restaurant'), where('restaurantBranch', '==', newRestaurant));
    // basically gets a query going for specifically restaurant docs
    const querySnapshot = await getDocs(q);
    let id = '';
    querySnapshot.forEach(async (document) => {
    // this line will get the document id of the restaurant
      id = document.id;
      const getRestaurant = doc(db, 'restaurant', id);
      // Set the updated document
      await updateDoc(getRestaurant, {
        restaurantBranch: newRestaurant,
        location: newLocation,
      });
    });
  };

  const deleteBranch = async (id) => {
    const restaurantDoc = doc(db, 'restaurant', id);
    await deleteDoc(restaurantDoc);
  };

  useEffect(() => {
    const getInfoDisplay = async () => {
      const data = await getDocs(infoDisplayCollection);
      setInfoDisplays(await Promise.all(
        (data.docs.map((document) => ({ ...document.data(), id: document.id }))
        ),
      ));
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
  return (
    <InfoDisplayView
      infoDisplay={infoDisplay}
      addRestaurant={addRestaurant}
      setNewRestaurant={setNewRestaurant}
      setNewLocation={setNewLocation}
      setNewDistance={setNewDistance}
      setNewHours={setNewHours}
      setNewPickUp={setNewPickUp}
      deleteBranch={deleteBranch}
      updateRestaurant={updateRestaurant}
    />
  );
}

export default InfoDisplayController;
