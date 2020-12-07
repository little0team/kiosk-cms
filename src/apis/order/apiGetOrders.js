import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiGetOrders(date) {
  const { startDate, endDate } = date;
  const [error, orders] = await handlePromise(
    apiAxios.get('/orders', { params: { startDate, endDate } })
  );

  if (error) throw new Error(error);

  return orders.data;
}
