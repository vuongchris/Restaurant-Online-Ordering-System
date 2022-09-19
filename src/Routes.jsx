import React from 'react';
import {
  BrowserRouter as Router, Route, Routes as AppRoutes,
} from 'react-router-dom';
import { AuthProvider } from './contexts/auth/AuthContext';
import AccountController from './controllers/account/AccountController';
import AuthController from './controllers/auth/AuthController';
import CartController from './controllers/cart/CartController';
import CheckoutController from './controllers/checkout/CheckoutController';
import HomeController from './controllers/home/HomeController';
import InfoDisplayController from './controllers/infoDisplay/InfoDisplayController';
import PaymentController from './controllers/payment/PaymentController';
import CustomerService from './views/customer_service/CustomerService';
import Navbar from './views/navbar/Navbar';
import SpecialRequest from './views/special_request/SpecialRequest';

function Routes() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
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
          <Route path="/account" element={<AccountController />} />
        </AppRoutes>
      </AuthProvider>
    </Router>
  );
}

export default Routes;
