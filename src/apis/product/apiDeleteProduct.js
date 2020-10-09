import apiAxios from 'apis/apiAxios';

export default function apiDeleteProduct(productId) {
  return apiAxios
    .delete(`/product/${productId}`)
    .then((response) => response.data);
}
