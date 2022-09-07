import React from 'react';
import {
  BrowserRouter as Router, Link, Route, Routes as AppRoutes,
} from 'react-router-dom';
import { AuthProvider } from './contexts/auth/AuthContext';
import AuthController from './controllers/auth/AuthController';
import HomeController from './controllers/home/HomeController';
import PaymentController from './controllers/payment/PaymentController';
import CheckoutController from './controllers/checkout/CheckoutController';
import CartController from './controllers/cart/CartController';
import SpecialRequest from './views/special_request/SpecialRequest';
import InfoDisplayController from './controllers/infoDisplay/InfoDisplayController';
import CustomerService from './views/customer_service/CustomerService';

function Routes() {
  return (
    <Router>
      <AuthProvider>
        <Link to="/">HOME</Link>
        <AppRoutes>
          <Route index element={<HomeController />} />
          <Route path="/login" element={<AuthController view="login" />} />
          <Route path="/register" element={<AuthController view="register" />} />
          <Route path="/checkout" element={<CheckoutController />} />
          <Route path="/payment" element={<PaymentController view="payment" />} />
          <Route path="/cart" element={<CartController />} />
          <Route path="/specialRequest" element={<SpecialRequest view="specialrequest" />} />
          <Route path="/restaurantList" element={<InfoDisplayController view="restaurantList" />} />
          <Route path="/customerService" element={<CustomerService />} />
        </AppRoutes>
      </AuthProvider>
    </Router>
  );
}

export default Routes;
