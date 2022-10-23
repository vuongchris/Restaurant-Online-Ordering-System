/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  collection, getDoc, addDoc, deleteDoc, getDocs, updateDoc, doc,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import RestaurantMenuView from '../../views/infoDisplay/restaurantMenuView';
import { db } from '../../firebase';

function RestaurantMenuController({ view }) {
  // Add the Create function into the controller
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuCategory, setNewMenuCategory] = useState('');
  const [newMenuDescription, setNewMenuDescription] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState('');

  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const menuCollectionRef = collection(db, 'menu');
  const RestaurantName = useParams();

  const addRestaurantMenu = async () => {
    await addDoc(menuCollectionRef, {
      name: newMenuName,
      category: newMenuCategory,
      description: newMenuDescription,
      price: newMenuPrice,
    });
  };

  const updateMenu = async () => {
    const restaurantRef = doc(db, 'menu', RestaurantName);
    await updateDoc(restaurantRef, {
      name: newMenuName,
      category: newMenuCategory,
      description: newMenuDescription,
      price: newMenuPrice,
    });
  };

  const deleteMenu = async (id) => {
    const restaurantMenuDoc = doc(db, 'menu', id);
    await deleteDoc(restaurantMenuDoc);
  };

  const getRestaurantMenu = async () => {
    if (RestaurantName && view === 'Menu1') {
      // const docRef = doc(db, 'restaurant', RestaurantName);
      // const restaurant = await getDoc(docRef);
      const data = await getDocs(menuCollectionRef);
      // setRestaurantName({ id: restaurant.id, ...restaurant.data() });
      setRestaurantMenu(await Promise.all(
        (data.docs.map((document) => ({ ...document.data(), id: document.id }))
        ),
      ));
    } else {
      const data = await getDocs(menuCollectionRef);
      setRestaurantMenu(await Promise.all(
        (data.docs.map((document) => ({ ...document.data(), id: document.id }))
        ),
      ));
    }
  };

  useEffect(() => {
    getRestaurantMenu();
  }, []);

  const RestaurantView = {
    Menu1: <RestaurantMenuView
      RestaurantName={RestaurantName}
      restaurantMenu={restaurantMenu}
      addRestaurantMenu={addRestaurantMenu}
      setNewMenuName={setNewMenuName}
      setNewMenuCategory={setNewMenuCategory}
      setNewMenuDescription={setNewMenuDescription}
      setNewMenuPrice={setNewMenuPrice}
      deleteMenu={deleteMenu}
      updateMenu={updateMenu}
    />,
    menu: <RestaurantMenuView
      restaurantMenu={restaurantMenu}
      addRestaurantMenu={addRestaurantMenu}
      setNewMenuName={setNewMenuName}
      setNewMenuCategory={setNewMenuCategory}
      setNewMenuDescription={setNewMenuDescription}
      setNewMenuPrice={setNewMenuPrice}
      deleteMenu={deleteMenu}
      updateMenu={updateMenu}
    />,
  };

  return (
    RestaurantView[view]
  );
}

export default RestaurantMenuController;
