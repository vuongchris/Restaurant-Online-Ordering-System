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
import RestaurantMenuController from './controllers/infoDisplay/restaurantMenuController';
import LocationController from './controllers/location/LocationController';
import NotificationController from './controllers/notification/notificationController';
import OrderController from './controllers/order/OrderController';
import PaymentController from './controllers/payment/PaymentController';
import ReviewController from './controllers/review/ReviewController';
import Navbar from './views/navbar/Navbar';
import SpecialRequest from './views/special_request/SpecialRequest';
import NotifTest from './views/notification/notifTest';

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
          <Route path="/restaurantList" element={<InfoDisplayController view="display" />} />
          <Route path="/restaurantMenu" element={<RestaurantMenuController view="menu" />} />
          <Route path="/restaurantMenu/:RestaurantName" element={<RestaurantMenuController view="Menu1" />} />
          <Route path="/restaurantListEdit/:restaurantId" element={<InfoDisplayController view="update" />} />
          <Route path="/restaurantMenu/:RestaurantName/:menuId" element={<RestaurantMenuController view="Menu2" />} />
          <Route path="/notifier" element={<NotificationController view="order" />} />
          <Route path="/notifierUpdate" element={<NotificationController view="update" />} />
          <Route path="/notifTest" element={<NotifTest />} />
          <Route path="/customerService" element={<CustomerServiceController />} />
          <Route path="/account" element={<AccountController />} />
          <Route path="/orderHistory" element={<OrderController view="orderHistory" />} />
          <Route path="/createReview" element={<ReviewController view="createReview" />} />
          <Route path="/editReview" element={<ReviewController view="editReview" />} />
          <Route path="/reviews" element={<ReviewController view="reviews" />} />
          <Route path="/orderConfirmation" element={<OrderController view="orderConfirmation" />} />
          <Route path="/viewOrder" element={<OrderController view="viewOrder" />} />
          <Route path="/editOrder" element={<OrderController view="editOrder" />} />
          <Route path="/addItem" element={<OrderController view="addItem" />} />
        </AppRoutes>
      </AuthProvider>
    </Router>
  );
}

export default Routes;
