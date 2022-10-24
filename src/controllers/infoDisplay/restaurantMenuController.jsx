/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  collection, getDoc, addDoc, deleteDoc, getDocs, updateDoc, doc,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import RestaurantMenuView from '../../views/infoDisplay/restaurantMenuView';
import RestaurantMenuUpdate from '../../views/infoDisplay/restaurantMenuUpdate';
import { db } from '../../firebase';

function RestaurantMenuController({ view }) {
  // Add the Create function into the controller
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuCategory, setNewMenuCategory] = useState('');
  const [newMenuDescription, setNewMenuDescription] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState('');

  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const menuCollectionRef = collection(db, 'menu');
  const { RestaurantName, menuId } = useParams();

  const addRestaurantMenu = async () => {
    await addDoc(menuCollectionRef, {
      name: newMenuName,
      category: newMenuCategory,
      description: newMenuDescription,
      price: newMenuPrice,
    });
  };

  const updateMenu = async () => {
    const menuRef = doc(db, 'menu', restaurantMenu.id);
    await updateDoc(menuRef, {
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
      const data = await getDocs(menuCollectionRef);
      setRestaurantMenu(await Promise.all(
        (data.docs.map((document) => ({ ...document.data(), id: document.id }))
        ),
      ));
    } else if (menuId && view === 'Menu2') {
      const docRef = doc(db, 'menu', menuId);
      const menu = await getDoc(docRef);
      setRestaurantMenu({ id: menu.id, ...menu.data() });
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
  }, [RestaurantName, menuId]);

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
    />,
    Menu2: <RestaurantMenuUpdate
      RestaurantName={RestaurantName}
      restaurantMenu={restaurantMenu}
      setNewMenuName={setNewMenuName}
      setNewMenuCategory={setNewMenuCategory}
      setNewMenuDescription={setNewMenuDescription}
      setNewMenuPrice={setNewMenuPrice}
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
    />,
  };

  return (
    RestaurantView[view]
  );
}

export default RestaurantMenuController;
