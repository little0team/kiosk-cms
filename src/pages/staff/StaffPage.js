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
import { useHistory, useParams } from 'react-router';
import { fetchBranchs, selectBranchs } from 'features/branch/branchsSlice';
import apiPostStaff from 'apis/staff/apiPostStaff';
import apiGetStaffById from 'apis/staff/apiGetStaffById';
import apiPatchStaff from 'apis/staff/apiPatchStaff';

const useStyles = makeStyles((theme) => ({}));

const StaffPage = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const initValue = {
    type: 'branch.staff',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: '',
    address: '',
  };
  const [values, setValues] = useState(initValue);
  const [branchSelect, setBranchSelect] = useState();
  const branchs = useSelector(selectBranchs);
  const { other: staffId, other2: branchId } = useParams();
  const isNewStaff = staffId === 'new';

  useEffect(() => {
    const fetchStaff = async () => {
      if (isNewStaff) {
        dispatch(fetchBranchs());
      } else {
        const [error, staff] = await handlePromise(apiGetStaffById(staffId));

        if (error) {
          return setValues(staff);
        }

        return setValues(staff);
      }
    };

    fetchStaff();
    // eslint-disable-next-line
  }, [staffId]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    if (isNewStaff) {
      var [createError] = await handlePromise(
        apiPostStaff(branchSelect, values)
      );
    } else {
      var [updateError] = await handlePromise(
        apiPatchStaff(staffId, branchId, values)
      );
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

    return history.push('/app/staffs');
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader={isNewStaff ? 'เพิ่ม' : 'แก้ไข'} title="รายชื่อพนักงาน" />

        <Divider />

        <CardContent>
          {isNewStaff && (
            <DropDown
              labelText="Branch Code"
              options={branchs}
              value={branchSelect}
              handleChange={setBranchSelect}
            />
          )}

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

          {isNewStaff && (
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
          )}

          <TextField
            fullWidth
            label="ชื่อ"
            margin="normal"
            name="firstname"
            onChange={handleChange}
            type="text"
            value={values?.firstname}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="นามสกุล"
            margin="normal"
            name="lastname"
            onChange={handleChange}
            type="text"
            value={values?.lastname}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="เบอร์โทรติดต่อ"
            margin="normal"
            name="mobile"
            onChange={handleChange}
            type="text"
            value={values?.mobile}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="ที่อยู่"
            margin="normal"
            name="address"
            onChange={handleChange}
            type="text"
            value={values?.address}
            variant="outlined"
          />
        </CardContent>

        <Divider />

        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            {isNewStaff ? 'Create' : 'Update'}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default StaffPage;
