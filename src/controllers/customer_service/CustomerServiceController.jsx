import { addDoc, collection } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { db } from '../../firebase';
import CustomerService from '../../views/customer_service/CustomerService';

function CustomerServiceController() {
  const { currentUser } = useAuth();
  const newCustomerTicket = useRef();
  const [loading, setLoading] = useState(false);

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
