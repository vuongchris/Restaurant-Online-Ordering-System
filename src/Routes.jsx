import React from 'react';
import {
  BrowserRouter as Router, Link, Route, Routes as AppRoutes,
} from 'react-router-dom';
import { AuthProvider } from './contexts/auth/AuthContext';
import AuthController from './controllers/auth/AuthController';
import HomeController from './controllers/home/HomeController';
import PaymentController from './controllers/payment/PaymentController';

function Routes() {
  return (
    <Router>
      <AuthProvider>
        <Link to="/">HOME</Link>
        <AppRoutes>
          <Route index element={<HomeController />} />
          <Route path="/login" element={<AuthController view="login" />} />
          <Route path="/register" element={<AuthController view="register" />} />
          <Route path="/payment" element={<PaymentController view="payment"/>} />
        </AppRoutes>
      </AuthProvider>
    </Router>
  );
}

export default Routes;
