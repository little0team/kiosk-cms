import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DashboardPage() {
  const classes = useStyles();
  const [dataDashboard, setDataDashboard] = useState({});
  const [branches, setBranches] = useState([]);
  const [branchSelected, setBranchSelected] = useState('');

  useEffect(() => {
    const fetchBranches = async () => {
      const [error, { data }] = await handlePromise(apiGetBranchs());

      if (error) return setBranches([]);

      return setBranches([{ id: 2, name: 'eiei' }, ...data]);
    };

    fetchBranches();
  }, []);

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
  }, 3000);

  return (
    <Container maxWidth={false}>
      <Grid container direction="row" spacing={5}>
        <Grid item md={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">สาขา</InputLabel>

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
