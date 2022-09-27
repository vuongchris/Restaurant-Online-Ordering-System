/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import React from 'react';
import CartView from '../../views/order/CartView';
import CheckoutView from '../../views/order/CheckoutView';
import OrderHistoryView from '../../views/order/OrderHistoryView';

function OrderController({ view }) {
  const orderViews = {
    cart: <CartView />,
    checkout: <CheckoutView />,
    orderHistory: <OrderHistoryView />,
  };
  return orderViews[view];
}

export default OrderController;
