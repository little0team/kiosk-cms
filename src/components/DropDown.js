import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';
import PropsType from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200,
  },
}));

function DropDown({ labelText, options, handleChange, value, disabled }) {
  const classes = useStyles();

  const handleChangeValue = (event) => {
    handleChange(event.target.value);
  };

  return (
    <FormControl
      variant="outlined"
      className={clsx(classes.formControl, 'mt-8 mb-16')}
      disabled={disabled}
    >
      <InputLabel id="demo-simple-select-outlined-label">{labelText}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={handleChangeValue}
        label={labelText}
      >
        {options.map(({ id, name }) => (
          <MenuItem value={id}>{name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

DropDown.propsType = {
  labelText: PropsType.string,
  options: PropsType.array.isRequired,
  handleChange: PropsType.func.isRequired,
  value: PropsType.object,
  disabled: PropsType.bool,
};

DropDown.defaultProps = {
  labelText: 'Label',
  value: '',
  disabled: false,
};

export default DropDown;
