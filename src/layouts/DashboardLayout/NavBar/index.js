import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Button,
  Typography,
} from '@material-ui/core';
import {
  Box as BoxIcon,
  List as ListIcon,
  Grid as GridIcon,
  PieChart,
  Settings,
  Users,
  Home,
  Flag,
} from 'react-feather';
import NavItem from './NavItem';
import AuthService from 'services/authService';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  name: localStorage.getItem('username'),
};

const items = [
  {
    href: '/app/dashboard',
    icon: PieChart,
    title: 'Dashboard',
  },
  {
    href: '/app/branchs',
    icon: Home,
    title: 'Branch',
  },
  {
    href: '/app/staff',
    icon: Users,
    title: 'Staff',
  },
  {
    href: '/app/categories',
    icon: GridIcon,
    title: 'Categories',
  },
  {
    href: '/app/products',
    icon: BoxIcon,
    title: 'Products',
  },
  {
    href: '/app/transactions',
    icon: ListIcon,
    title: 'Transactions',
  },
  {
    href: '/app/banners',
    icon: Flag,
    title: 'Banner',
  },
  {
    href: '/app/config',
    icon: Settings,
    title: 'Config',
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile, ...rest }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const logout = () => {
    AuthService.signOut();

    history.push('/');
  };

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography variant="h6" gutterBottom>
          {user.name}
        </Typography>
      </Box>

      <Divider />

      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>

      <Divider />

      <Box p={1}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
