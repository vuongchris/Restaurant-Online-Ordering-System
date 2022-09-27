import React from 'react';
import {
  Grid, Table, TableHead, TableContainer, TableRow, TableCell, TableSortLabel,
} from '@mui/material';

function ReviewHistoryView() {
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
          <h1>Review History</h1>
        </Grid>

        <Grid item>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel>Review</TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel>Date</TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel>Type</TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel>Stars</TableSortLabel>
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

export default ReviewHistoryView;
