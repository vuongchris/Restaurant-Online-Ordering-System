/* eslint-disable no-else-return */
/* eslint-disable react/prop-types */
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
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { TablePagination } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
    numeric: false,
    disablePadding: false,
    label: 'Quantity',
  },
  {
    id: 'total',
    numeric: false,
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
  items, updateQuantity, deleteItem, toCheckout,
}) {
  const { currentUser } = useAuth();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('item');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

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
                      {items.sort(getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                          <TableRow key={row.id}>
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
                      {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={items.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                <strong>Total:</strong>
                {' '}
                {items.map((item) => item.total).reduce((a, b) => a + b)}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" size="large" onClick={() => { toCheckout(); }}>Checkout</Button>
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
              <Button variant="contained" onClick={() => navigate('/restaurantMenu')}>Menu</Button>
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
            <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CartView;
