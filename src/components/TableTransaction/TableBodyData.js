import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { stableSort, getComparator } from 'utils/tableHelper';
import { formatDate } from 'utils/dateTime';

export default function TableBodyData({
  data,
  order,
  orderBy,
  page,
  rowsPerPage,
  isSelected,
  handleClick,
  emptyRows,
}) {
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
              onClick={(event) => handleClick(event, row.id)}
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
            >
              <TableCell component="th" id={labelId}>
                {row.id}
              </TableCell>

              <TableCell>{row.orderNo}</TableCell>

              <TableCell>{row.pickupType}</TableCell>

              <TableCell>
                {row.status === 'SERVED' ? 'เสร็จสิ้น' : 'อยู่ในรายการ'}
              </TableCell>

              <TableCell>{formatDate(row.updatedAt)}</TableCell>
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