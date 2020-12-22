import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

function UploadButtons({ label, handleUploadFileChange }) {
  const classes = useStyles();

  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsBinaryString(file);

    reader.onload = () => {
      handleUploadFileChange({
        url: `data:${file.type};base64,${btoa(reader.result)}`,
        file,
      });
    };
  };

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />

      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          {label}
        </Button>
      </label>
    </div>
  );
}

UploadButtons.propsType = {
  label: PropTypes.string,
  handleUploadFileChange: PropTypes.func.isRequired,
};

UploadButtons.defaultProps = {
  label: 'Upload',
};

export default UploadButtons;
