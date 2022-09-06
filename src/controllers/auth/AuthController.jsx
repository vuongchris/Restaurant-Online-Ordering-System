/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth/AuthContext';
import LoginView from '../../views/auth/LoginView';
import RegisterView from '../../views/auth/RegisterView';

function AuthController({ view }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  const { register, login } = useAuth();

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value.trim().length < 6) {
      // eslint-disable-next-line no-alert
      alert('Password length must be at least 6 characters.');
      return;
    }
    try {
      setLoading(true);
      await register(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(ex);
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(ex);
      setLoading(false);
    }
  };

  const authViews = {
    login: <LoginView
      emailRef={emailRef}
      passwordRef={passwordRef}
      handleLogin={handleLogin}
      loading={loading}
    />,
    register: <RegisterView
      emailRef={emailRef}
      passwordRef={passwordRef}
      handleRegistration={handleRegistration}
      loading={loading}
    />,
  };
  return authViews[view];
}

export default AuthController;
