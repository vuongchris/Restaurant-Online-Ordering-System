/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  collection, getDocs, addDoc, deleteDoc, setDoc, query, where, updateDoc, doc,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import RestaurantMenuView from '../../views/infoDisplay/restaurantMenuView';
import { db } from '../../firebase';

function RestaurantMenuController() {
  // Add the Create function into the controller
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuCategory, setNewMenuCategory] = useState('');
  const [newMenuDescription, setNewMenuDescription] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState('');

  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const menuCollectionRef = collection(db, 'menu');

  const addRestaurantMenu = async () => {
    await addDoc(menuCollectionRef, {
      name: newMenuName,
      category: newMenuCategory,
      description: newMenuDescription,
      price: newMenuPrice,
    });
  };

  const updateMenu = async () => {
    const q = query(collection(db, 'menu'), where('name', '==', newMenuName));
    // basically gets a query going for specifically restaurant docs
    const querySnapshot = await getDocs(q);
    let id = '';
    querySnapshot.forEach(async (document) => {
      // this line will get the document id of the restaurant
      id = document.id;
      const getMenu = doc(db, 'menu', id);
      // Set the updated document
      await updateDoc(getMenu, {
        name: newMenuName,
        price: newMenuPrice,
      });
    });
  };

  const deleteMenu = async (id) => {
    const restaurantMenuDoc = doc(db, 'menu', id);
    await deleteDoc(restaurantMenuDoc);
  };

  useEffect(() => {
    const getRestaurantMenu = async () => {
      const data = await getDocs(menuCollectionRef);
      setRestaurantMenu(await Promise.all(
        (data.docs.map((document) => ({ ...document.data(), id: document.id }))
        ),
      ));
    };

    getRestaurantMenu();
  }, []);

  return (
    <RestaurantMenuView
      restaurantMenu={restaurantMenu}
      addRestaurantMenu={addRestaurantMenu}
      setNewMenuName={setNewMenuName}
      setNewMenuCategory={setNewMenuCategory}
      setNewMenuDescription={setNewMenuDescription}
      setNewMenuPrice={setNewMenuPrice}
      deleteMenu={deleteMenu}
      updateMenu={updateMenu}
    />
  );
}

export default RestaurantMenuController;
