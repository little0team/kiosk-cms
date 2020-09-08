import React, { useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import DropDown from 'components/DropDown';
import {
  selectCategories,
  fetchCategories,
} from 'features/category/categoriesSlice';
import { useEffect } from 'react';
import { createProduct } from 'features/product/productSlice';

const useStyles = makeStyles((theme) => ({
  root: {},
  productImageItem: {
    width: 200,
    marginTop: 10,
    color: 'transparent',
  },
}));

const ProductPage = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const classes = useStyles();
  const [categorySelect, setCategorySelect] = useState(1);
  const [values, setValues] = useState({
    name: '',
    price: 0,
    media: {},
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleUploadImage = (file) => {
    setValues({ ...values, media: file });
  };

  const handleSubmit = () => {
    const form = new FormData();

    form.append('categoryId', categorySelect);
    form.append('name', values.name);
    form.append('price', values.price);
    form.append('image', values.media.file);

    dispatch(createProduct(form));
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader="Create Product" title="Product" />
        <Divider />
        <CardContent>
          <DropDown
            labelText="categories"
            options={categories}
            value={categorySelect}
            handleChange={setCategorySelect}
          />
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
          <TextField
            label="Price"
            margin="normal"
            name="price"
            onChange={handleChange}
            type="text"
            value={values.price}
            variant="outlined"
          />
          <UploadButton
            label="Product Image"
            handleUploadFileChange={handleUploadImage}
          />
          <div>
            <img
              className={classes.productImageItem}
              src={values.media.url}
              alt="productImage"
            />
          </div>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ProductPage;
