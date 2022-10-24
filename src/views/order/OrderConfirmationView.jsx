/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

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

function OrderConfirmationView({ lastOrderItems }) {
  const location = useLocation();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('item');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

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

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Typography variant="h3">Order Confirmation</Typography>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Order has been submitted!
          </Alert>
        </Grid>
      </Grid>
      <br />
      <Grid
        container
        spacing={1}
      >
        <Grid item xs={4}>
          <Typography variant="p">
            <strong>Order Number:</strong>
            {' '}
            {`${location.state.orderid}`}
          </Typography>
          <br />
          <br />
          <Typography variant="p">
            <strong>Name:</strong>
            {' '}
            {`${location.state.firstName} ${location.state.lastName}`}
          </Typography>
          <br />
          <Typography variant="p">
            <strong>Address:</strong>
            {' '}
            {`${location.state.addressLineOne}, ${location.state.city} ${location.state.state} ${location.state.postcode} ${location.state.country}`}
          </Typography>
          <br />
          <Typography variant="p">
            <strong>Phone Number:</strong>
            {' '}
            {`${location.state.phoneNumber}`}
          </Typography>
          <br />
          <br />
          <Typography variant="p">
            <strong>Delivery Instructions:</strong>
            {' '}
            {`${location.state.deliveryInstructions}`}
          </Typography>
          <br />
          <Typography variant="p">
            <strong>Special Requests:</strong>
            {' '}
            {`${location.state.specialRequests}`}
          </Typography>
          <br />
          <br />
          <Typography variant="p"><strong>Payment Details</strong></Typography>
          <br />
          <Typography variant="p">
            <strong>Card Name:</strong>
            {' '}
            {`${location.state.cardName}`}
          </Typography>
          <br />
          <Typography variant="p">
            <strong>Card Number:</strong>
            {' '}
            {`${location.state.cardNumber}`}
          </Typography>
          <br />
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
                  {lastOrderItems.slice().sort(getComparator(order, orderBy)).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        {row.item}
                      </TableCell>
                      <TableCell>
                        {row.quantity}
                      </TableCell>
                      <TableCell>
                        {row.total}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={lastOrderItems.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <Grid item>
            <Typography variant="h6">
              <strong>Total:</strong>
              {' '}
              {`${location.state.total}`}
            </Typography>
          </Grid>
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
          <Button variant="contained" size="large" onClick={() => navigate('/')}>OK</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default OrderConfirmationView;
