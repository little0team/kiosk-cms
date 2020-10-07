import apiAxios from 'apis/apiAxios';

export default function apiGetOrderInfo() {
  return apiAxios
    .get('/dashboard/order-info')
    .then((response) => response.data.data);
}
