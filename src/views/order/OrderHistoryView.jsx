import React from 'react';
import {
  Grid, Table, TableHead, TableContainer, TableRow, TableCell, TableSortLabel,
} from '@mui/material';

function OrderHistoryView() {
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
          <h1>Order History</h1>
        </Grid>

        <Grid item>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel>Order</TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel>Date</TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel>Status</TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel>Total</TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default OrderHistoryView;
