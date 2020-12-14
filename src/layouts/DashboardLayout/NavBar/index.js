import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Button,
} from '@material-ui/core';
import {
  Box as BoxIcon,
  List as ListIcon,
  Grid as GridIcon,
  Package,
  PieChart,
  Users,
  Home,
  Flag,
  Settings,
} from 'react-feather';
import NavItem from './NavItem';
import AuthService from 'services/authService';

const items = [
  {
    href: '/app/dashboard',
    icon: PieChart,
    title: 'แดชบอร์ด',
  },
  {
    href: '/app/branches',
    icon: Home,
    title: 'จัดการสาขา',
  },
  {
    href: '/app/staffs',
    icon: Users,
    title: 'จัดการพนักงาน',
  },
  {
    href: '/app/categories',
    icon: GridIcon,
    title: 'หมวดหมู่สินค้า',
  },
  {
    href: '/app/products',
    icon: BoxIcon,
    title: 'สินค้า',
  },
  {
    href: '/app/orders',
    icon: Package,
    title: 'รายการสั่งซื้อ',
  },
  {
    href: '/app/transactions',
    icon: ListIcon,
    title: 'รายการสั่งซื้อที่เสร็จสิ้น',
  },
  {
    href: '/app/banners',
    icon: Flag,
    title: 'แบนเนอร์',
  },
  {
    href: '/app/configs',
    icon: Settings,
    title: 'ตั้งค่า',
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
          ออกจากระบบ
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
