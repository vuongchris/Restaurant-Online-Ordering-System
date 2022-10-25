/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

function CreateReviewView({ toReviews, handleCreateReview }) {
  const location = useLocation();

  const [newRating, setRating] = useState(0);
  const [newDescription, setDescription] = useState('');
  const [newItem, setItem] = useState(location.state.item);

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h3">Create Review</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Item"
            required
            disabled
            defaultValue={newItem}
            onChange={(event) => {
              setItem(event.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Rating
            precision={0.5}
            onChange={(event) => {
              setRating(event.target.value);
            }}
          />
          <TextField
            style={{ width: '100%', fontSize: '20px' }}
            label="Description"
            required
            multiline
            minRows={5}
            maxRows={20}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            onClick={() => { handleCreateReview(newItem, newRating, newDescription); }}
          >
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={() => { toReviews(); }}
          >
            Cancel

          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateReviewView;
