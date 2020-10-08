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
import apiGetCategoryById from 'apis/category/apiGetCategoryById';
import apiPatchCategory from 'apis/category/apiPatchCategory';

const useStyles = makeStyles((theme) => ({
  root: {},
  categoryImageItem: {
    width: 200,
    marginTop: 10,
    color: 'transparent',
  },
}));

const CategoryPage = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { other: categoryId } = useParams();
  const isNewCategory = categoryId === 'new';
  const initValues = {
    name: '',
    media: {},
  };
  const [values, setValues] = useState(initValues);

  useEffect(() => {
    const fetchCategory = async () => {
      const [error, { data }] = await handlePromise(
        apiGetCategoryById(categoryId)
      );

      if (error) history.push('/app/categories');

      return setValues({ name: data.name, media: { url: data.image } });
    };

    if (!isNewCategory) {
      fetchCategory();
    } else {
      setValues(initValues);
    }
    // eslint-disable-next-line
  }, [categoryId]);

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

    if (isNewCategory) {
      var [createError] = await handlePromise(apiPostCategory(form));
    } else {
      var [updateError] = await handlePromise(
        apiPatchCategory(categoryId, form)
      );
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

    return history.push('/app/categories');
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader="Create Category" title="Category" />

        <Divider />

        <CardContent>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            onChange={handleChange}
            type="text"
            value={values.name}
            variant="outlined"
          />

          <UploadButton
            label="Category Image"
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
            {!isNewCategory ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default CategoryPage;
