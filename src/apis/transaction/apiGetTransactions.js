import apiAxios from 'apis/apiAxios';

export default function apiGetTransactions() {
  return apiAxios.get('transaction').then((response) => response.data.data);
}
