import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UploadButton from 'components/UploadButton';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from 'components/DropDown';
import { useEffect } from 'react';
import handlePromise from 'utils/handlePromise';
import apiPostProduct from 'apis/product/apiPostProduct';
import { openDialog } from 'features/dialog/alertMessageSlice';
import { AlertType } from 'constants/alertMessageType';
import { useHistory, useParams } from 'react-router';
import apiGetProductById from 'apis/product/apiGetProductById';
import apiPatchProduct from 'apis/product/apiPatchProduct';
import {
  selectCategories,
  fetchCategories,
} from 'features/category/categoriesSlice';

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
  const history = useHistory();
  const [categorySelect, setCategorySelect] = useState(1);
  const { other: productId } = useParams();
  const isNewProduct = productId === 'new';
  const initValues = {
    name: '',
    description: '',
    price: 0,
    media: {},
  };
  const [values, setValues] = useState(initValues);

  useEffect(() => {
    if (isNewProduct) {
      dispatch(fetchCategories());
    } else {
      fetchProduct();
    }
    // eslint-disable-next-line
  }, [dispatch]);

  const fetchProduct = async () => {
    const [error, product] = await handlePromise(apiGetProductById(productId));

    if (error) {
      return setValues(initValues);
    }

    return setValues({ ...product, media: { url: product.image } });
  };

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
    form.append('description', values.description);
    form.append('price', values.price);
    form.append('image', values.media.file);

    if (isNewProduct) {
      var [errorCreateProduct] = await handlePromise(
        apiPostProduct(categorySelect, form)
      );
    } else {
      var [errorUpdateProduct] = await handlePromise(
        apiPatchProduct(productId, form)
      );
    }

    if (errorCreateProduct || errorUpdateProduct) {
      return dispatch(
        openDialog({
          message: `เกิดข้อผิดพลาด : ${
            errorCreateProduct || errorUpdateProduct
          }`,
          type: AlertType.ERROR,
        })
      );
    }

    dispatch(
      openDialog({ message: 'ทำรายการสำเร็จ', type: AlertType.SUCCESS })
    );

    return history.push('/app/products');
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader="Create Product" title="Product" />
        <Divider />
        <CardContent>
          {isNewProduct && (
            <DropDown
              labelText="categories"
              options={categories}
              value={categorySelect}
              handleChange={setCategorySelect}
            />
          )}

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
            fullWidth
            label="Description"
            margin="normal"
            name="description"
            onChange={handleChange}
            type="text"
            value={values.description}
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
            {!isNewProduct ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ProductPage;
