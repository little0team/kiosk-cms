import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiGetProducts(categoryId) {
  const [error, products] = await handlePromise(
    apiAxios.get(`/category/${categoryId}/products`)
  );

  if (error) throw Error(error);
  return products.data;
}
