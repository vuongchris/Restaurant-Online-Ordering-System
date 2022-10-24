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
import TextField from '@mui/material/TextField';
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

function EditOrderView({
  refs, viewOrderItems, handleEditSubmit, handleCancelOrder,
}) {
  const location = useLocation();

  const navigate = useNavigate();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('item');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - viewOrderItems.length) : 0;

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Typography variant="h3">Edit Order Details</Typography>
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
            <Grid item xs={12}>
              <TextField
                style={{ width: '50%', fontSize: '20px' }}
                label="First Name"
                inputRef={refs.firstNameRef}
                defaultValue={location.state.firstName}
              />
              <TextField
                style={{ width: '50%', fontSize: '20px' }}
                label="Last Name"
                inputRef={refs.lastNameRef}
                defaultValue={location.state.lastName}
              />
              <br />
              <br />
              <TextField
                style={{ width: '100%', fontSize: '20px' }}
                label="Address Line 1"
                inputRef={refs.addressLineOneRef}
                defaultValue={location.state.addressLineOne}
              />
              <br />
              <br />
              <TextField
                style={{ width: '100%', fontSize: '20px' }}
                label="Address Line 2"
                inputRef={refs.addressLineTwoRef}
                defaultValue={location.state.addressLineTwo}
              />
              <br />
              <br />
              <TextField
                style={{ width: '50%', fontSize: '20px' }}
                label="City"
                inputRef={refs.cityRef}
                defaultValue={location.state.city}
              />
              <TextField
                style={{ width: '50%', fontSize: '20px' }}
                label="State"
                inputRef={refs.stateRef}
                defaultValue={location.state.state}
              />
              <br />
              <br />
              <TextField
                style={{ width: '50%', fontSize: '20px' }}
                label="Country"
                inputRef={refs.countryRef}
                defaultValue={location.state.country}
              />
              <TextField
                style={{ width: '50%', fontSize: '20px' }}
                label="Postcode"
                inputRef={refs.postcodeRef}
                defaultValue={location.state.postcode}
              />
              <br />
              <br />
              <TextField
                style={{ width: '50%', fontSize: '20px' }}
                label="Phone Number"
                inputRef={refs.phoneNumberRef}
                defaultValue={location.state.phoneNumber}
              />
            </Grid>
          </Grid>
          <br />
          <Grid
            container
            spacing={1}
          >
            <Grid item xs={12}>
              <TextField
                style={{ width: '100%', fontSize: '20px' }}
                label="Delivery Instructions"
                multiline
                minRows={5}
                maxRows={20}
                inputRef={refs.deliveryInstructionsRef}
                defaultValue={location.state.deliveryInstructions}
              />
            </Grid>
          </Grid>
          <br />
          <Grid
            container
            spacing={1}
          >
            <Grid item xs={12}>
              <TextField
                style={{ width: '100%', fontSize: '20px' }}
                label="Special Requests"
                multiline
                minRows={5}
                maxRows={20}
                inputRef={refs.specialRequestsRef}
                defaultValue={location.state.specialRequests}
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
                  {viewOrderItems.sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
              count={viewOrderItems.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <Typography variant="h6">
            <strong>Total:</strong>
            {' '}
            {viewOrderItems.map((item) => item.total).reduce((a, b) => a + b)}
          </Typography>
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
          <Button variant="contained" size="large" onClick={() => { handleEditSubmit(location.state.id); }}>Submit</Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={() => { handleCancelOrder(location.state.id); }}
          >
            Cancel Order

          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/orderHistory')}
          >
            Return to Order History

          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default EditOrderView;
