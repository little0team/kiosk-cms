import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiGetOrders() {
  const [error, orders] = await handlePromise(apiAxios.get('/pos/order'));

  if (error) throw new Error(error);

  return orders.data;
}