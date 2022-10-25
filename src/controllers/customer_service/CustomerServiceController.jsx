/* eslint-disable no-console */
/* eslint-disable no-alert */
import { addDoc, collection } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth/AuthContext';
import { db } from '../../firebase';
import CustomerService from '../../views/customer_service/CustomerService';

function CustomerServiceController() {
  const { currentUser } = useAuth();
  const newCustomerTicket = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // This function submits the customer's query to the database
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Try-catch block to handle any errors in the Firebase backend
    try {
      // Disable the submit button to prevent spam
      setLoading(true);

      // Get the collection AKA the "table"
      const customerServiceRef = collection(db, 'customerTicket');

      // Insert a new "column" into the database "table"
      await addDoc(customerServiceRef, {
        userid: currentUser.uid,
        customerTicket: newCustomerTicket.current.value,
      });

      alert('Successfully submitted query!');

      // Redirect to homepage after submitting
      navigate('/');
    } catch (error) {
      console.error('Error, cant create ticket: ', error);
    }
  };

  // Return the view
  return (
    <CustomerService
      newCustomerTicket={newCustomerTicket}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
}

export default CustomerServiceController;
