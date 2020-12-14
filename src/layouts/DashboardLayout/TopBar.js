import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from 'components/Logo';

const useStyles = makeStyles(() => ({
  root: {},
  merchantName: {
    color: 'white',
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  const user = {
    name: localStorage.getItem('username'),
  };

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/app/dashboard">
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <Logo onClick={onMobileNavOpen} />
          </IconButton>
        </RouterLink>

        <Typography className={classes.merchantName}>{user.name}</Typography>

        <Box flexGrow={1} />

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
