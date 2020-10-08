import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { stableSort, getComparator } from 'utils/tableHelper';
import { IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { useHistory } from 'react-router';

export default function TableBodyData({
  data,
  order,
  orderBy,
  page,
  rowsPerPage,
  isSelected,
  handleClick,
  emptyRows,
  classes,
}) {
  const history = useHistory();

  return (
    <TableBody>
      {stableSort(data, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
            >
              <TableCell component="th" id={labelId}>
                {row.id}
              </TableCell>

              <TableCell>
                <img
                  className={classes.image}
                  src={row.image}
                  alt="categoryImage"
                />
              </TableCell>

              <TableCell>{row.name}</TableCell>

              <TableCell>
                <IconButton
                  aria-label="edit"
                  onClick={() => history.push(`/app/category/${row.id}`)}
                >
                  <Edit />
                </IconButton>
                <IconButton aria-label="delete">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}

      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}
