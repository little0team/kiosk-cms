import React from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';
import { useStyles } from './TableStyle';
import TableBodyData from './TableBodyData';
import {
  createRequestSort,
  createSelectAllClick,
  createClick,
} from 'utils/tableHelper';

export default function TableMain({ data, filter }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('createdAt');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = createRequestSort(
    order,
    orderBy,
    setOrder,
    setOrderBy
  );

  const handleSelectAllClick = createSelectAllClick(data, setSelected);

  const handleClick = createClick(selected, setSelected);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar numSelected={selected.length} filter={filter} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <TableHeader
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBodyData
              data={data}
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
              isSelected={isSelected}
              handleClick={handleClick}
              emptyRows={emptyRows}
              classes={classes}
            />
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
