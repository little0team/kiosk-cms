import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { DateRangePicker } from 'materialui-daterange-picker';
import { Divider, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { formatDate } from 'utils/formatDate';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    padding: '20px',
  },
  datePicker: {
    position: 'fixed',
    left: '30%',
  },
  datePickerField: {
    width: '30%',
    margin: '10px',
  },
}));

export default function EnhancedTableToolbar(props) {
  const classes = useToolbarStyles();
  const { numSelected, filter } = props;
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  const toggle = () => setOpen(!open);

  const changeDateRange = (date) => {
    const dateRange = {
      startDate: formatDate(date.startDate),
      endDate: formatDate(date.endDate),
    };
    filter(dateRange);

    setDateRange(dateRange);

    return toggle();
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Grid container direction="column">
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          รายการสั่งซื้อทั้งหมด
        </Typography>

        <Divider />

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
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
