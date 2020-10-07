import apiAxios from 'apis/apiAxios';

export default function apiGetBestProductSeller() {
  return apiAxios
    .get('/dashboard/best-product')
    .then((response) => response.data.data);
}
