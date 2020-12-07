import apiAxios from 'apis/apiAxios';

export default function apiGetTransactions(date) {
  const { startDate, endDate } = date;

  return apiAxios
    .get('/transaction', { params: { startDate, endDate } })
    .then((response) => response.data.data);
}
