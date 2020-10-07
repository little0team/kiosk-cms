import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import handlePromise from 'utils/handlePromise';
import { openDialog } from 'features/dialog/alertMessageSlice';
import { AlertType } from 'constants/alertMessageType';
import { useHistory } from 'react-router';
import apiPostBranch from 'apis/branch/apiPostBranch';

const useStyles = makeStyles((theme) => ({}));

const BranchPage = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const [createError] = await handlePromise(apiPostBranch(values));

    if (createError) {
      return dispatch(
        openDialog({
          message: `เกิดข้อผิดพลาด : ${createError}`,
          type: AlertType.ERROR,
        })
      );
    }

    dispatch(
      openDialog({ message: 'เพิ่มสาขาสำเร็จ', type: AlertType.SUCCESS })
    );

    return history.push('/app/branches');
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader="Create Branch" title="Branch" />

        <Divider />

        <CardContent>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            onChange={handleChange}
            type="text"
            value={values?.name}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Branch Code"
            margin="normal"
            name="branchCode"
            onChange={handleChange}
            type="text"
            value={values?.branchCode}
            variant="outlined"
          />
        </CardContent>

        <Divider />

        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default BranchPage;
