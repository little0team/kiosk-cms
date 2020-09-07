import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: '40px',
  },
});

const Logo = (props) => {
  const classes = useStyles();

  return (
    <img
      className={classes.root}
      alt="Logo"
      src={`${process.env.PUBLIC_URL}/assets/images/kiosk.png`}
      {...props}
    />
  );
};

export default Logo;
