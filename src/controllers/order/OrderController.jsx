/* eslint-disable object-shorthand */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import {
  collection, addDoc, doc, getDoc, getDocs, updateDoc, serverTimestamp, deleteDoc, query, where,
} from 'firebase/firestore';
import { useNavigate } from 'react-router';
import CartView from '../../views/order/CartView';
import CheckoutView from '../../views/order/CheckoutView';
import OrderHistoryView from '../../views/order/OrderHistoryView';
import { useAuth } from '../../contexts/auth/AuthContext';
import { db } from '../../firebase';
import OrderConfirmationView from '../../views/order/OrderConfirmationView';
import ViewOrderView from '../../views/order/ViewOrderView';
import EditOrderView from '../../views/order/EditOrderView';
import AddItemView from '../../views/order/AddItemView';

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

  const updateQuantityRef = useRef();

  const [items, setItems] = useState([]);
  const [lastOrderItems, setLastOrderItems] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  const [viewOrderItems, setViewOrderItems] = useState([]);

  const getItems = async () => {
    if (currentUser != null) {
      const docSnap = await getDoc(docRef);
      const itemsCollectionRef = collection(db, 'order', docSnap.data().activeOrder, 'items');
      const data = await getDocs(itemsCollectionRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  };

  const getAllOrders = async () => {
    const orderCollectionRef = collection(db, 'order');
    const data = await getDocs(orderCollectionRef);
    setAllOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getLastOrderItems = async () => {
    if (currentUser != null) {
      const docSnap = await getDoc(docRef);
      const itemsCollectionRef = collection(db, 'order', docSnap.data().lastOrder, 'items');
      const data = await getDocs(itemsCollectionRef);
      setLastOrderItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  };

  const getUserOrders = async () => {
    const orderCollectionRef = collection(db, 'order');
    const q = query(orderCollectionRef, where('userid', '==', currentUser.uid));
    const data = await getDocs(q);
    setUserOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getLastOrderItems();
    getItems();
    getUserOrders();
    getAllOrders();
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
      getAllOrders();
      const nextOrderId = allOrders.length + 1;
      const docSnap = await getDoc(docRef);
      const orderDoc = doc(db, 'order', docSnap.data().activeOrder);
      await updateDoc(orderDoc, {
        orderid: nextOrderId,
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
        timestamp: serverTimestamp(),
        total: items.map((item) => item.total).reduce((a, b) => a + b),
      });
      navigate('/payment', {
        state: {
          total: items.map((item) => item.total).reduce((a, b) => a + b),
        },
      });
      console.log('Document created!');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleEditSubmit = async (id) => {
    const orderDoc = doc(db, 'order', id);
    await updateDoc(orderDoc, {
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
    });
    getUserOrders();
    navigate('/orderHistory');
  };

  const addOrder = async () => {
    const orderCollectionRef = collection(db, 'order');
    const newOrderDoc = await addDoc(orderCollectionRef, {
      userid: currentUser.uid,
      email: currentUser.email,
    });
    await updateDoc(docRef, {
      activeOrder: newOrderDoc.id,
    });
  };

  const addItem = async (itemName, itemCategory, itemDescription, itemPrice) => {
    let docSnap = await getDoc(docRef);
    if (docSnap.data().activeOrder === 'N/A') {
      addOrder();
    }
    docSnap = await getDoc(docRef);
    const itemsCollectionRef = collection(db, 'order', docSnap.data().activeOrder, 'items');
    const quantityValue = parseInt(updateQuantityRef.current.value, 10);
    const totalPrice = quantityValue * itemPrice;
    await addDoc(itemsCollectionRef, {
      item: itemName,
      category: itemCategory,
      description: itemDescription,
      quantity: quantityValue,
      price: itemPrice,
      total: totalPrice,
    });
    getItems();
    alert('Item has been added');
    navigate('/restaurantMenu');
  };

  const openOrder = async (id) => {
    const orderDoc = doc(db, 'order', id);
    const orderSnap = await getDoc(orderDoc);
    const getViewOrderItems = async () => {
      const itemsCollectionRef = collection(db, 'order', id, 'items');
      const data = await getDocs(itemsCollectionRef);
      setViewOrderItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getViewOrderItems();
    navigate('/viewOrder', {
      state: {
        id: id,
        orderid: orderSnap.data().orderid,
        firstName: orderSnap.data().firstName,
        lastName: orderSnap.data().lastName,
        addressLineOne: orderSnap.data().address.addressLineOne,
        addressLineTwo: orderSnap.data().address.addressLineTwo,
        city: orderSnap.data().address.city,
        country: orderSnap.data().address.country,
        postcode: orderSnap.data().address.postcode,
        state: orderSnap.data().address.state,
        phoneNumber: orderSnap.data().phoneNumber,
        deliveryInstructions: orderSnap.data().deliveryInstructions,
        specialRequests: orderSnap.data().specialRequests,
        status: orderSnap.data().status,
        timestamp: orderSnap.data().timestamp,
        cardName: orderSnap.data().payment.cardName,
        cardNumber: orderSnap.data().payment.cardNumber,
        cvv: orderSnap.data().payment.cvv,
        expiry: orderSnap.data().payment.expiry,
        total: orderSnap.data().total,
      },
    });
  };

  const editOrder = async (id) => {
    const orderDoc = doc(db, 'order', id);
    const orderSnap = await getDoc(orderDoc);
    const getViewOrderItems = async () => {
      const itemsCollectionRef = collection(db, 'order', id, 'items');
      const data = await getDocs(itemsCollectionRef);
      setViewOrderItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getViewOrderItems();
    navigate('/editOrder', {
      state: {
        id: id,
        orderid: orderSnap.data().orderid,
        firstName: orderSnap.data().firstName,
        lastName: orderSnap.data().lastName,
        addressLineOne: orderSnap.data().address.addressLineOne,
        addressLineTwo: orderSnap.data().address.addressLineTwo,
        city: orderSnap.data().address.city,
        country: orderSnap.data().address.country,
        postcode: orderSnap.data().address.postcode,
        state: orderSnap.data().address.state,
        phoneNumber: orderSnap.data().phoneNumber,
        deliveryInstructions: orderSnap.data().deliveryInstructions,
        specialRequests: orderSnap.data().specialRequests,
        status: orderSnap.data().status,
        timestamp: orderSnap.data().timestamp,
        cardName: orderSnap.data().payment.cardName,
        cardNumber: orderSnap.data().payment.cardNumber,
        cvv: orderSnap.data().payment.cvv,
        expiry: orderSnap.data().payment.expiry,
        total: orderSnap.data().total,
      },
    });
  };

  const handleCancelOrder = async (id) => {
    const orderDoc = doc(db, 'order', id);
    const orderSnap = await getDoc(orderDoc);
    await updateDoc(orderDoc, {
      status: 'Cancelled',
    });
    getUserOrders();
    navigate('/orderHistory');
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
    orderHistory: <OrderHistoryView
      userOrders={userOrders}
      openOrder={openOrder}
    />,
    orderConfirmation: <OrderConfirmationView
      lastOrderItems={lastOrderItems}
    />,
    viewOrder: <ViewOrderView
      viewOrderItems={viewOrderItems}
      editOrder={editOrder}
      handleCancelOrder={handleCancelOrder}
    />,
    editOrder: <EditOrderView
      refs={refs}
      viewOrderItems={viewOrderItems}
      handleEditSubmit={handleEditSubmit}
      handleCancelOrder={handleCancelOrder}
    />,
    addItem: <AddItemView
      updateQuantityRef={updateQuantityRef}
      addItem={addItem}
    />,
  };
  return orderViews[view];
}

export default OrderController;
