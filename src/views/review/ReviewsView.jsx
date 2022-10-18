/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import {
  collection, deleteDoc, doc, getDocs, query, where,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/auth/AuthContext';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'item',
    numeric: false,
    disablePadding: false,
    label: 'Item',
  },
  {
    id: 'rating',
    numeric: false,
    disablePadding: false,
    label: 'Rating',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'options',
    numeric: false,
    disablePadding: false,
    label: 'Options',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null }
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function ReviewsView() {
  const { currentUser } = useAuth();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('total');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const reviewCollectionRef = collection(db, 'review');
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser != null) {
      const q = query(reviewCollectionRef, where('userid', '==', currentUser.uid));
      const getReviews = async () => {
        const data = await getDocs(q);
        setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getReviews();
    }
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openReview = async (reviewId, reviewItem, reviewRating, reviewDescription) => {
    navigate('/editReview', {
      state: {
        id: reviewId, item: reviewItem, rating: reviewRating, description: reviewDescription,
      },
    });
  };

  const deleteReview = async (id) => {
    try {
      const reviewDoc = doc(db, 'review', id);
      await deleteDoc(reviewDoc);
      console.log('Document deleted!');
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
    window.location.reload();
  };

  if (currentUser != null) {
    return (
      <div>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <Typography variant="h3">Reviews</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => navigate('/createReview')}>Create Review</Button>
          </Grid>
          <Grid item>
            <Paper>
              <TableContainer>
                <Table>
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {reviews.slice().sort(getComparator(order, orderBy)).map((row) => (
                      <TableRow key={row.item}>
                        <TableCell>
                          {row.item}
                        </TableCell>
                        <TableCell>
                          {row.rating}
                        </TableCell>
                        <TableCell>
                          {row.description}
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => {
                            openReview(row.id, row.item, row.rating, row.description);
                          }}
                          >
                            Edit
                          </Button>
                          <Button color="error" onClick={() => { deleteReview(row.id); }}><DeleteIcon /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={reviews.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Typography variant="h3">Reviews</Typography>
        </Grid>
        <Grid item>
          <Typography variant="p">To create, edit or view reviews, you need to login.</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default ReviewsView;
