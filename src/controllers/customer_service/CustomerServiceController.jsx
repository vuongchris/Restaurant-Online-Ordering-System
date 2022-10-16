import React from 'react';
import CustomerService from '../../views/customer_service/CustomerService';

function CustomerServiceController({ view }) {
  const customerTicketView = {
    createCustomerTicket: <CustomerService />,
  };
  return customerTicketView[view];
}

export default CustomerServiceController;
