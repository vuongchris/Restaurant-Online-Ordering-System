import React from 'react';
import {
  BrowserRouter as Router, Link, Route, Routes as AppRoutes,
} from 'react-router-dom';
import AuthController from './controllers/auth/AuthController';
import HomeController from './controllers/home/HomeController';

function Routes() {
  return (
    <Router>
      <Link to="/">HOME</Link>
      <AppRoutes>
        <Route index element={<HomeController />} />
        <Route path="/login" element={<AuthController view="login" />} />
        <Route path="/register" element={<AuthController view="register" />} />
      </AppRoutes>
    </Router>
  );
}

export default Routes;
