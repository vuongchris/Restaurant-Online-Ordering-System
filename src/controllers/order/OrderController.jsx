/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import {
  collection, addDoc, doc, getDoc, getDocs, setDoc, updateDoc, serverTimestamp, deleteDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router';
import CartView from '../../views/order/CartView';
import CheckoutView from '../../views/order/CheckoutView';
import OrderHistoryView from '../../views/order/OrderHistoryView';
import { useAuth } from '../../contexts/auth/AuthContext';
import { db } from '../../firebase';

function OrderController({ view }) {
  const { currentUser } = useAuth();

  const docRef = doc(db, 'user', currentUser.uid);

  const navigate = useNavigate();

  const refs = {
    firstNameRef: useRef(),
    lastNameRef: useRef(),
    addressLineOneRef: useRef(),
    addressLineTwoRef: useRef(),
    cityRef: useRef(),
    stateRef: useRef(),
    countryRef: useRef(),
    postcodeRef: useRef(),
    phoneNumberRef: useRef(),
    deliveryInstructionsRef: useRef(),
    specialRequestsRef: useRef(),
  };

  const [items, setItems] = useState([]);

  const getItems = async () => {
    const docSnap = await getDoc(docRef);
    const itemsCollectionRef = collection(db, 'order', docSnap.data().activeOrder, 'items');
    const data = await getDocs(itemsCollectionRef);
    setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getItems();
  }, []);

  const toCheckout = async () => {
    getItems();
    navigate('/checkout');
  };

  const deleteItem = async (id) => {
    const docRef = doc(db, 'user', currentUser.uid);
    const docSnap = await getDoc(docRef);
    const itemDoc = doc(db, 'order', docSnap.data().activeOrder, 'items', id);
    await deleteDoc(itemDoc);
    getItems();
    alert('Item successfully deleted');
  };

  const updateQuantity = async (id, quantity, price) => {
    if (quantity > 0) {
      const docRef = doc(db, 'user', currentUser.uid);
      const totalPrice = parseInt(quantity, 10) * parseInt(price, 10);
      const docSnap = await getDoc(docRef);
      const itemDoc = doc(db, 'order', docSnap.data().activeOrder, 'items', id);
      await updateDoc(itemDoc, {
        quantity: parseInt(quantity, 10),
        total: totalPrice,
      });
      getItems();
    } else {
      deleteItem(id);
    }
  };

  const handleOrderSubmit = async () => {
    try {
      const docSnap = await getDoc(docRef);
      const orderDoc = doc(db, 'order', docSnap.data().activeOrder);
      await updateDoc(orderDoc, {
        userid: currentUser.uid,
        email: currentUser.email,
        firstName: refs.firstNameRef.current.value,
        lastName: refs.lastNameRef.current.value,
        address: {
          addressLineOne: refs.addressLineOneRef.current.value,
          addressLineTwo: refs.addressLineTwoRef.current.value,
          city: refs.cityRef.current.value,
          state: refs.stateRef.current.value,
          country: refs.countryRef.current.value,
          postcode: refs.postcodeRef.current.value,
        },
        phoneNumber: refs.phoneNumberRef.current.value,
        deliveryInstructions: refs.deliveryInstructionsRef.current.value,
        specialRequests: refs.specialRequestsRef.current.value,
        status: 'Preparing',
        timestamp: serverTimestamp(),
      });
      navigate('/payment');
      console.log('Document created!');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const orderViews = {
    cart: <CartView
      items={items}
      updateQuantity={updateQuantity}
      deleteItem={deleteItem}
      toCheckout={toCheckout}
    />,
    checkout: <CheckoutView
      refs={refs}
      items={items}
      handleOrderSubmit={handleOrderSubmit}
    />,
    orderHistory: <OrderHistoryView />,
  };
  return orderViews[view];
}

export default OrderController;
