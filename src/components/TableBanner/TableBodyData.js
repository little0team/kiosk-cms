import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { stableSort, getComparator } from 'utils/tableHelper';
import { openDialog } from 'features/dialog/alertMessageSlice';
import { AlertType } from 'constants/alertMessageType';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Delete, Edit } from '@material-ui/icons';
import { useHistory } from 'react-router';
import handlePromise from 'utils/handlePromise';
import { useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import apiDeleteBanner from 'apis/banner/apiDeleteBanner';

const MySwal = withReactContent(Swal);

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
  const dispatch = useDispatch();

  const handleDelete = (bannerId) => {
    MySwal.fire({
      title: 'ลบ Banner ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBanner(bannerId);
      }
    });
  };

  const deleteBanner = async (bannerId) => {
    const [error] = await handlePromise(apiDeleteBanner(bannerId));

    if (error) {
      dispatch(
        openDialog({
          message: `เกิดข้อผิดพลาด : ${error}`,
          type: AlertType.ERROR,
        })
      );
    }

    return dispatch(
      openDialog({
        message: 'ทำรายการสำเร็จ',
        type: AlertType.SUCCESS,
      })
    );
  };

  return (
    <TableBody>
      {stableSort(data, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          return (
            <TableRow hover tabIndex={-1} key={row.id}>
              <TableCell component="th">{row.id}</TableCell>

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
                  onClick={() => history.push(`/app/banner/${row.id}`)}
                >
                  <Edit />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(row.id)}
                >
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
