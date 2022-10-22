import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { db } from '../../firebase';
import InfoDisplayUpdate from '../../views/infoDisplay/infoDisplayUpdate';
import InfoDisplayView from '../../views/infoDisplay/InfoDisplayView';

function InfoDisplayController({ view }) {
  // Add the Create function into the controller
  const [newRestaurant, setNewRestaurant] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDistance, setNewDistance] = useState('');
  const [newHours, setNewHours] = useState('');
  const [newPickUp, setNewPickUp] = useState('');

  const [infoDisplay, setInfoDisplays] = useState([]);
  const infoDisplayCollection = collection(db, 'restaurant');
  const navigation = useNavigate();

  // This gets the :restaurantId parameter from the URL
  // Take a look at Routes.jsx
  // Also take a look at the URL when you visit the restaurant update screen
  const { restaurantId } = useParams();

  /**
   * Add a new restaurant
   */
  const addRestaurant = async () => {
    await addDoc(infoDisplayCollection, {
      restaurantBranch: newRestaurant,
      Location: newLocation,
      Distance: newDistance,
      Hours: newHours,
      pickUp: newPickUp,
    });
  };

  /**
   * Update an existing restaurant's details
   */
  const updateRestaurant = async () => {
    const restaurantRef = doc(db, 'restaurant', infoDisplay.id);
    await updateDoc(restaurantRef, {
      restaurantBranch: newRestaurant,
      Location: newLocation,
    });
    // Redirect to homepage
    navigation('/');
  };

  /**
   * Delete a restaurant
   * @param {*} id - The Firebase ID of the restaurant document to delete
   */
  const deleteBranch = async (id) => {
    const restaurantDoc = doc(db, 'restaurant', id);
    await deleteDoc(restaurantDoc);
  };

  /**
   * Retrieve the data to show when the page loads
   */
  const getInfoDisplay = async () => {
    // Case 1: Restaurant Update screen - only retrieve a single restaurant by its id
    if (restaurantId && view === 'update') {
      const docRef = doc(db, 'restaurant', restaurantId);
      const restaurant = await getDoc(docRef);
      setInfoDisplays({ id: restaurant.id, ...restaurant.data() });
    } else {
      // Case 2: Restaurant List screen - Retrieve all restaurants
      const data = await getDocs(infoDisplayCollection);
      setInfoDisplays(await Promise.all(
        (data.docs.map((document) => ({ ...document.data(), id: document.id }))
        ),
      ));
    }
  };

  useEffect(() => {
    getInfoDisplay();
  }, [restaurantId]); // KEVIN: Take note of this, it is very important
  // Basically, the page should retrieve the appropriate data whenever the
  // restaurantId in the URL changes

  const DisplayView = {
    display: <InfoDisplayView
      infoDisplay={infoDisplay}
      addRestaurant={addRestaurant}
      setNewRestaurant={setNewRestaurant}
      setNewLocation={setNewLocation}
      setNewDistance={setNewDistance}
      setNewHours={setNewHours}
      setNewPickUp={setNewPickUp}
      deleteBranch={deleteBranch}
      updateRestaurant={updateRestaurant}
    />,
    update: <InfoDisplayUpdate
      infoDisplay={infoDisplay}
      setNewRestaurant={setNewRestaurant}
      setNewLocation={setNewLocation}
      updateRestaurant={updateRestaurant}
    />,
  };

  return (
    DisplayView[view]
  );
}

export default InfoDisplayController;
