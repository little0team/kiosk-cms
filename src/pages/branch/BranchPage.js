import React, { useEffect, useState } from 'react';
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
import { useHistory, useParams } from 'react-router';
import apiPostBranch from 'apis/branch/apiPostBranch';
import apiGetBranch from 'apis/branch/apiGetBranch';
import apiPatchBranch from 'apis/branch/apiPatchBranch';

const useStyles = makeStyles((theme) => ({}));

const BranchPage = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const initValues = {
    name: '',
    branchCode: '',
  };
  const [values, setValues] = useState(initValues);
  const { other: branchId } = useParams();
  const isNewBranch = branchId === 'new';

  useEffect(() => {
    const fetchBranch = async () => {
      if (!isNewBranch) {
        const [error, branch] = await handlePromise(apiGetBranch(branchId));

        if (error) {
          setValues(initValues);
        }

        return setValues(branch);
      } else {
        return setValues(initValues);
      }
    };
    fetchBranch();
    // eslint-disable-next-line
  }, [branchId]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    if (isNewBranch) {
      var [createError] = await handlePromise(apiPostBranch(values));
    } else {
      var [updateError] = await handlePromise(apiPatchBranch(branchId, values));
    }

    if (createError || updateError) {
      return dispatch(
        openDialog({
          message: `เกิดข้อผิดพลาด : ${createError || updateError}`,
          type: AlertType.ERROR,
        })
      );
    }

    dispatch(
      openDialog({ message: 'ทำรายการสำเร็จ', type: AlertType.SUCCESS })
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
            {!isNewBranch ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default BranchPage;
