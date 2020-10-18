import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
} from '@material-ui/core';
import UploadButton from 'components/UploadButton';
import { useDispatch } from 'react-redux';
import handlePromise from 'utils/handlePromise';
import apiPostCategory from 'apis/category/apiPostCategory';
import { openDialog } from 'features/dialog/alertMessageSlice';
import { AlertType } from 'constants/alertMessageType';
import { useHistory, useParams } from 'react-router';
import apiGetBannerById from 'apis/banner/apiGetBannerById';
import apiPatchCategory from 'apis/category/apiPatchCategory';

const useStyles = makeStyles((theme) => ({
  root: {},
  bannerImageItem: {
    width: 200,
    marginTop: 10,
    color: 'transparent',
  },
}));

const BannerPage = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { other: bannerId } = useParams();
  const isNewBanner = bannerId === 'new';
  const initValues = {
    name: '',
    media: {},
  };
  const [values, setValues] = useState(initValues);

  useEffect(() => {
    const fetchBanner = async () => {
      const [error, { data }] = await handlePromise(apiGetBannerById(bannerId));

      if (error) history.push('/app/banners');

      return setValues({ name: data.name, media: { url: data.image } });
    };

    if (!isNewBanner) {
      fetchBanner();
    } else {
      setValues(initValues);
    }
    // eslint-disable-next-line
  }, [bannerId]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleUploadImage = (file) => {
    setValues({ ...values, media: file });
  };

  const handleSubmit = async () => {
    const form = new FormData();

    form.append('name', values.name);
    form.append('image', values.media.file);

    if (isNewBanner) {
      var [createError] = await handlePromise(apiPostCategory(form));
    } else {
      var [updateError] = await handlePromise(apiPatchCategory(bannerId, form));
    }

    if (createError || updateError) {
      return dispatch(
        openDialog({
          message: `เกิดข้อผิดพลาด : ${createError}`,
          type: AlertType.ERROR,
        })
      );
    }

    dispatch(
      openDialog({ message: 'ทำรายการสำเร็จ', type: AlertType.SUCCESS })
    );

    return history.push('/app/banners');
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader
          subheader={isNewBanner ? 'Create Banner' : 'Update Banner'}
          title="Banner"
        />

        <Divider />

        <CardContent>
          <TextField
            fullWidth
            label="Type"
            margin="normal"
            name="type"
            onChange={handleChange}
            type="text"
            value={values?.type}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            onChange={handleChange}
            type="text"
            value={values?.name}
            variant="outlined"
          />

          <UploadButton
            label="Banner Image"
            handleUploadFileChange={handleUploadImage}
          />

          <div>
            <img
              className={classes.categoryImageItem}
              src={values.media.url}
              alt="productImage"
            />
          </div>
        </CardContent>

        <Divider />

        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            {!isNewBanner ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default BannerPage;
