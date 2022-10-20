/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable no-else-return */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router';
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

function CartView({
  items, updateQuantity, deleteItem, toCheckout, addOrder, addItem,
}) {
  const { currentUser } = useAuth();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('item');

  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  if (currentUser != null) {
    if (items.length > 0) {
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
              <Typography variant="h3">Cart</Typography>
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
                      {items.slice().sort(getComparator(order, orderBy)).slice().map((row) => (
                        <TableRow>
                          <TableCell>
                            {row.item}
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              defaultValue={row.quantity}
                              onChange={(event) => {
                                updateQuantity(row.id, event.target.value, row.price);
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            {row.total}
                          </TableCell>
                          <TableCell>
                            <Button
                              color="error"
                              onClick={() => { deleteItem(row.id); }}
                            >
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Grid item>
              <Button variant="contained" size="large" onClick={() => { toCheckout(); }}>Checkout</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => { addItem(); }}>Add Item</Button>
            </Grid>
          </Grid>
        </div>
      );
    } else {
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
              <Typography variant="h3">Cart</Typography>
            </Grid>
            <Grid item>
              <Typography variant="p">Your cart is empty. Please go to menu to add items.</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => navigate('/')}>Menu</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => { addOrder(); }}>Add Order</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => { addItem(); }}>Add Item</Button>
            </Grid>
          </Grid>
        </div>
      );
    }
  } else {
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
            <Typography variant="h3">Cart</Typography>
          </Grid>
          <Grid item>
            <Typography variant="p">You need to login to add items to the cart.</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => navigate('/')}>Login</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CartView;
