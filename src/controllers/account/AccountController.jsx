import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { getSavedPaymentDetails } from '../../services/account/AccountService';
import AccountView from '../../views/account/AccountView';

function AccountController() {
  const { currentUser } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState([]);

  // Retrieve the user's saved payment details for display when the screen loads
  useEffect(() => {
    const setState = async () => setPaymentMethods(await getSavedPaymentDetails(currentUser.uid));
    setState();
  }, []);
  return <AccountView payments={paymentMethods} />;
}

export default AccountController;
