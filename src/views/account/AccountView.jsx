import React from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';

function AccountView() {
  const { currentUser } = useAuth();
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Personal Information</h1>
      {currentUser && (
      <h3>
        Email:
        {' '}
        {currentUser.email}
      </h3>
      )}
      <h1>Saved Payment Details</h1>
      <h1>Order History</h1>
    </div>
  );
}

export default AccountView;
