/* eslint-disable linebreak-style */
import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/AuthContext';

function HomeView() {
  // Temporarily place logout button in homepage
  const { currentUser, logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(ex);
    }
  };
  return (
    <div
      style={{ textAlign: 'center' }}
    >
      <h1>Welcome to Restaurant Online Ordering System!</h1>
      {!currentUser && (
      <div>
        <Link to="login">LOGIN</Link>
        <br />
        <Link to="register">REGISTER</Link>
        <br />
        <h3>Please Login or Register to access all of the available functionalities.</h3>
      </div>
      )}
      {currentUser && (
      <div>
        <Link to="cart">CART</Link>
        <br />
        <Link to="payment">PAYMENT</Link>
        <br />
        <Link to="Locations">LOCATIONS</Link>
        <br />
        <Link to="restaurantList">Restaurant List</Link>
        <br />
        <Link to="restaurantMenu">Menu</Link>
        <br />
        <Link to="notifier">Notification</Link>
        <br />
        <Link to="customerService">CUSTOMER SERVICE</Link>
        <br />
        <Link to="reviews">REVIEW</Link>
      </div>
      )}

      {/** Display a logout button if a user is signed in */}
      {currentUser && (
        <div>
          <h3>
            Welcome,
            {' '}
            {currentUser.email}
          </h3>
          <Button
            variant="contained"
            size="large"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}

export default HomeView;
