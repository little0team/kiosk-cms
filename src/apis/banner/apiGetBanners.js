import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiGetCategory() {
  const [error, { data }] = await handlePromise(apiAxios.get('banners'));

  if (error) throw new Error(error);

  return data;
}
