import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import capitalize from 'lodash/capitalize';
import { closeDialog } from 'features/dialog/alertMessageSlice';

export default function AlertMassage() {
  const { state, options } = useSelector(({ alertMessage }) => alertMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    const autoHide = setTimeout(() => {
      dispatch(closeDialog());
    }, 2000);

    return () => clearTimeout(autoHide);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function handleClose(event, reason) {
    dispatch(closeDialog());
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={state}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={options.type}>
          <AlertTitle>{capitalize(options.type)}</AlertTitle>
          {options.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
