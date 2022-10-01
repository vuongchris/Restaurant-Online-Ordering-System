/* eslint-disable react/prop-types */
import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

function ReviewView({ descriptionRef, handleReviewSubmit }) {
  const [value, setValue] = React.useState(2);
  return (
    <div>
      <form onSubmit={handleReviewSubmit}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h3">Review</Typography>
          </Grid>
          <Grid item>
            <Rating
              value={value}
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <TextField
              style={{ width: '100%', fontSize: '20px' }}
              label="Review Description"
              required
              multiline
              rows={5}
              maxRows={20}
              inputRef={descriptionRef}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ReviewView;
