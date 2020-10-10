import apiAxios from 'apis/apiAxios';

export default async function apiGetProductById(productId) {
  return apiAxios
    .get(`/product/${productId}`)
    .then((response) => response.data.data);
}
