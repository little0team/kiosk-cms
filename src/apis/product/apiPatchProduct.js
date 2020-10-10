import apiAxios from 'apis/apiAxios';

export default function apiPatchProduct(productId, data) {
  return apiAxios
    .patch(`/product/${productId}`, data)
    .then((response) => response.data);
}
