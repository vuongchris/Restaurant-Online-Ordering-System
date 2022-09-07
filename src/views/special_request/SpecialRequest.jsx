/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';

function SpecialRequest({
  specialReqRef,
}) {
  return (
    <div
      style={{ textAlign: 'center' }}
    >
      <h1>Please add your special request here</h1>
      <div>
        {/* text field for special reuqests */}
        <TextField
          style={{ width: '20%', fontSize: '20px' }}
          label="Special Request"
          required
          multiline
          rows={5}
          maxRows={11}
          inputRef={specialReqRef}
        />
      </div>
    </div>

  );
}

export default SpecialRequest;
