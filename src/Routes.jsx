import React from 'react';
import {
  BrowserRouter as Router, Route, Routes as AppRoutes,
} from 'react-router-dom';
import { AuthProvider } from './contexts/auth/AuthContext';
import AccountController from './controllers/account/AccountController';
import AuthController from './controllers/auth/AuthController';
import CustomerServiceController from './controllers/customer_service/CustomerServiceController';
import HomeController from './controllers/home/HomeController';
import InfoDisplayController from './controllers/infoDisplay/InfoDisplayController';
import LocationController from './controllers/location/LocationController';
import NotificationController from './controllers/notification/notificationController';
import OrderController from './controllers/order/OrderController';
import PaymentController from './controllers/payment/PaymentController';
import ReviewController from './controllers/review/ReviewController';
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
          <Route path="/checkout" element={<OrderController view="checkout" />} />
          <Route path="/payment" element={<PaymentController view="payment" />} />
          <Route path="/locations" element={<LocationController view="Locations" />} />
          <Route path="/cart" element={<OrderController view="cart" />} />
          <Route path="/specialRequest" element={<SpecialRequest view="specialrequest" />} />
          <Route path="/restaurantList" element={<InfoDisplayController view="restaurantList" />} />
          <Route path="/restaurantDemo" element={<InfoDisplayController view="display" />} />
          <Route path="/notifier" element={<NotificationController />} />
          <Route path="/customerService" element={<CustomerServiceController />} />
          <Route path="/account" element={<AccountController />} />
          <Route path="/orderHistory" element={<OrderController view="orderHistory" />} />
          <Route path="/createReview" element={<ReviewController view="createReview" />} />
          <Route path="/editReview" element={<ReviewController view="editReview" />} />
          <Route path="/reviews" element={<ReviewController view="reviews" />} />
        </AppRoutes>
      </AuthProvider>
    </Router>
  );
}

export default Routes;
