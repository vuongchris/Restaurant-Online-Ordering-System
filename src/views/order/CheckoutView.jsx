/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
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
import TextField from '@mui/material/TextField';
import { visuallyHidden } from '@mui/utils';
import {
  collection, deleteDoc, doc, getDocs,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

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
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: 'Quantity',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Total',
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

function CheckoutView() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('total');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLineOne, setAddressLineOne] = useState('');
  const [addressLineTwo, setAddressLineTwo] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postcode, setPostcode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const reviewCollectionRef = collection(db, 'review');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const data = await getDocs(reviewCollectionRef);
      setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getReviews();
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

  const handleOrderSubmit = async () => {

  };

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Typography variant="h3">Checkout</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
      >
        <Grid item xs={4}>
          <Grid
            container
            spacing={1}
          >
            <Grid item xs={12} spacing={2}>
              <TextField
                style={{ width: '50%', fontSize: '20px' }}
                label="First Name"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
              <TextField
                style={{ width: '50%', fontSize: '20px' }}
                label="Last Name"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
              <TextField
                style={{ width: '100%', fontSize: '20px' }}
                label="Address Line 1"
                onChange={(event) => {
                  setAddressLineOne(event.target.value);
                }}
              />
              <TextField
                style={{ width: '100%', fontSize: '20px' }}
                label="Address Line 2"
                onChange={(event) => {
                  setAddressLineTwo(event.target.value);
                }}
              />
              <TextField
                style={{ width: '50%', fontSize: '20px' }}
                label="City"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
              <TextField
                style={{ width: '50%', fontSize: '20px' }}
                label="State"
                onChange={(event) => {
                  setState(event.target.value);
                }}
              />
              <TextField
                style={{ width: '50%', fontSize: '20px' }}
                label="Country"
                onChange={(event) => {
                  setCountry(event.target.value);
                }}
              />
              <TextField
                style={{ width: '50%', fontSize: '20px' }}
                label="Postcode"
                onChange={(event) => {
                  setPostcode(event.target.value);
                }}
              />
              <TextField
                style={{ width: '50%', fontSize: '20px' }}
                label="Phone Number"
                onChange={(event) => {
                  setPhoneNumber(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          <br />
          <Grid
            container
            spacing={1}
          >
            <Grid item xs={12} spacing={1}>
              <TextField
                style={{ width: '100%', fontSize: '20px' }}
                label="Delivery Instructions"
                multiline
                rows={5}
                maxRows={20}
                onChange={(event) => {
                  setDeliveryInstructions(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          <br />
          <Grid
            container
            spacing={1}
          >
            <Grid item xs={12} spacing={1}>
              <TextField
                style={{ width: '100%', fontSize: '20px' }}
                label="Special Requests"
                multiline
                rows={5}
                maxRows={20}
                onChange={(event) => {
                  setSpecialRequests(event.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
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
      <br />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Button variant="contained" size="large" onClick={handleOrderSubmit}>Submit</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default CheckoutView;
