import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiPostProduct(categoryId, data) {
  const [error, createProduct] = await handlePromise(
    apiAxios.post(`/admin/category/${categoryId}/product`, data)
  );

  if (error) throw new Error(error);

  return createProduct;
}
