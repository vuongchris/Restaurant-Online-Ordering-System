/* eslint-disable no-shadow */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/auth/AuthContext';

function EditReviewView() {
  const { currentUser } = useAuth();

  const location = useLocation();
  const [newRating, setRating] = useState(location.state.rating);
  const [newDescription, setDescription] = useState(location.state.description);
  const [newItem, setItem] = useState(location.state.item);

  const navigate = useNavigate();

  const handleReviewSubmit = async () => {
    try {
      const docRef = doc(db, 'review', location.state.id);
      await updateDoc(docRef, {
        userid: currentUser.uid,
        item: newItem,
        rating: newRating,
        description: newDescription,
      });
      navigate('/reviews');
      console.log('Document created!');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const toReviews = async () => {
    navigate('/reviews');
  };

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
          <Typography variant="h3">Edit Review</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Item"
            required
            defaultValue={location.state.item}
            onChange={(event) => {
              setItem(event.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Rating
            defaultValue={location.state.rating}
            precision={0.5}
            onChange={(event) => {
              setRating(event.target.value);
            }}
          />
          <TextField
            style={{ width: '100%', fontSize: '20px' }}
            label="Review Description"
            defaultValue={location.state.description}
            required
            multiline
            rows={5}
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
            onClick={handleReviewSubmit}
          >
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={toReviews}
          >
            Cancel

          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default EditReviewView;
