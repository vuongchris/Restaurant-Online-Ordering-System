/* eslint-disable linebreak-style */
import { Button } from '@mui/material';
import React from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';

function LocationView() {
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
      <h1>Welcome to 41026 - Advanced Software Development!</h1>
      <br />
      <form action="/OrderConfirmed" method="POST">
        Postcode:
        <input type="text" name="postcode" required />
      </form>

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

export default LocationView;
