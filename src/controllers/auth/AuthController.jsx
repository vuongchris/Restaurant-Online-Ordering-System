/* eslint-disable react/prop-types */
import React from 'react';
import LoginView from '../../views/auth/LoginView';
import RegisterView from '../../views/auth/RegisterView';

function AuthController({ view }) {
  const authViews = {
    login: <LoginView />,
    register: <RegisterView />,
  };
  return authViews[view];
}

export default AuthController;
