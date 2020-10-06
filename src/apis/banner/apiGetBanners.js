import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiGetBanners() {
  const [error, { data }] = await handlePromise(apiAxios.get('banners'));

  if (error) throw new Error(error);

  return data;
}
