import apiAxios from 'apis/apiAxios';
import handlePromise from 'utils/handlePromise';

export default async function apiGetConfigs() {
  const [error, { data }] = await handlePromise(apiAxios.get('/configs'));

  if (error) throw new Error(error);

  return data;
}
