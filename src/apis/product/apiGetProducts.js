import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiGetProducts(categoryId) {
  const [error, products] = await handlePromise(
    apiAxios.get(`/pos/category/${categoryId}/product`)
  );

  if (error) throw new Error(error);

  return products.data;
}
