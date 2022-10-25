/* eslint-disable react/prop-types */
import { Button, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

// 3 function parameters passed from the controller
function CustomerService({ newCustomerTicket, handleSubmit, loading }) {
  // Redirect the user to another page using this
  const navigate = useNavigate();
  return (
    <div
      style={{ textAlign: 'center' }}
    >
      <h1>Welcome to the Customer Service</h1>
      <div>
        Please state what assistant do you need and our agent will get back to you shortly.
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            style={{
              width: '30%',
              fontSize: '20px',
              margin: '20px',
            }}
            label="Customer Service"
            multiline
            minRows={5}
            maxRows={10}
            required
            inputRef={newCustomerTicket}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            Submit
          </Button>
          <br />
          <br />
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>

  );
}

export default CustomerService;
