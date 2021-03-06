import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
  },
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Link to="/app/config/new">
          <Button color="primary" variant="contained">
            New Configuration
          </Button>
        </Link>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
