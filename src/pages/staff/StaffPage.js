import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import DropDown from 'components/DropDown';
import handlePromise from 'utils/handlePromise';
import { openDialog } from 'features/dialog/alertMessageSlice';
import { AlertType } from 'constants/alertMessageType';
import { useHistory } from 'react-router';
import { fetchBranchs, selectBranchs } from 'features/branch/branchsSlice';
import apiPostStaff from 'apis/staff/apiPostStaff';

const useStyles = makeStyles((theme) => ({}));

const StaffPage = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState();
  const [branchSelect, setBranchSelect] = useState();
  const branchs = useSelector(selectBranchs);

  useEffect(() => {
    dispatch(fetchBranchs());
  }, [dispatch]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const [createError] = await handlePromise(
      apiPostStaff(branchSelect, values)
    );

    if (createError) {
      return dispatch(
        openDialog({
          message: `เกิดข้อผิดพลาด : ${createError}`,
          type: AlertType.ERROR,
        })
      );
    }

    dispatch(
      openDialog({ message: 'เพิ่มพนักงานสำเร็จ', type: AlertType.SUCCESS })
    );

    return history.push('/app/branches');
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader="Create Staff" title="Staff" />

        <Divider />

        <CardContent>
          <DropDown
            labelText="Branch Code"
            options={branchs}
            value={branchSelect}
            handleChange={setBranchSelect}
          />

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            name="username"
            onChange={handleChange}
            type="text"
            value={values?.username}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values?.password}
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

export default StaffPage;
