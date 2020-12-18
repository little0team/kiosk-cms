import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, TextField, Typography } from '@material-ui/core';
import AllProductWidget from './widgets/AllProductWidget';
import OrderInfoWidget from './widgets/OrderInfoWidget';
import CategoryListWidget from './widgets/CategoryListWidget';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useInterval from 'hooks/useInterval';
import handlePromise from 'utils/handlePromise';
import apiGetDashboard from 'apis/dashboard/apiGetDashboard';
import apiGetBranchs from 'apis/branch/apiGetBranchs';
import { DateRangePicker } from 'materialui-daterange-picker';
import { formatDateTime } from 'utils/formatDateTime';
import { formatDate } from 'utils/formatDate';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  datePicker: {
    position: 'fixed',
    left: '30%',
  },
  datePickerField: {
    width: '30%',
  },
}));

export default function DashboardPage() {
  const classes = useStyles();
  const [dataDashboard, setDataDashboard] = useState({});
  const [branches, setBranches] = useState([]);
  const [branchSelected, setBranchSelected] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const fetchBranches = async () => {
      const [error, { data }] = await handlePromise(apiGetBranchs());

      if (error) return setBranches([]);

      return setBranches(data);
    };

    fetchBranches();
  }, []);

  const toggle = () => setOpen(!open);

  const changeDateRange = (date) => {
    const dateRange = {
      startDate: formatDate(date.startDate),
      endDate: formatDate(date.endDate),
    };

    setDateRange(dateRange);

    return toggle();
  };

  const handleChange = (event) => {
    const branchId = event.target.value;

    fetchDashboardData(branchId);
    setBranchSelected(branchId);
  };

  const fetchDashboardData = async (branchId) => {
    const branch = { branchId };
    const [error, data] = await handlePromise(apiGetDashboard(branch));

    if (error) return setDataDashboard([]);

    return setDataDashboard(data);
  };

  useInterval(() => {
    fetchDashboardData(branchSelected);
    setCurrentDateTime(formatDateTime());
  }, 3000);

  return (
    <Container maxWidth={false}>
      <Grid container direction="row" spacing={5}>
        <Grid item container md={12}>
          <Grid item md={6}>
            <Typography>ข้อมูล ณ วันที่/เวลา {currentDateTime}</Typography>
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              size="small"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                สาขา
              </InputLabel>

              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={branchSelected}
                onChange={handleChange}
                label="Age"
              >
                {branches?.map(({ id, name }) => (
                  <MenuItem value={id}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="date-picker"
              label="วันที่ทำรายการ"
              variant="outlined"
              value={
                dateRange.startDate &&
                `${dateRange?.startDate} - ${dateRange?.endDate}`
              }
              onClick={toggle}
              size="small"
              className={classes.datePickerField}
            />

            <DateRangePicker
              open={open}
              toggle={toggle}
              onChange={changeDateRange}
              wrapperClassName={classes.datePicker}
              initialDateRange={dateRange}
            />
          </Grid>
        </Grid>

        <Grid item md={12}>
          <AllProductWidget
            title="อันดับรายการสินค้าที่มีจำนวนการซื้อสูงสุด 5 อันดับ"
            data={dataDashboard?.product_rank}
          />
        </Grid>

        <Grid item md={6}>
          <OrderInfoWidget data={dataDashboard?.order_info} />
        </Grid>

        <Grid item md={6}>
          <CategoryListWidget data={dataDashboard?.category_info} />
        </Grid>
      </Grid>
    </Container>
  );
}
