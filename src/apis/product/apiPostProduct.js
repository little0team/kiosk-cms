import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiPostProduct(categoryId, data) {
  const [error, createProduct] = await handlePromise(
    apiAxios.post(`/category/${categoryId}/product`, data)
  );

  if (error) throw new Error(error);

  return createProduct;
}
